import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

export interface Equipment {
  id: string
  name: string
  type: string
  serialNumber: string
  purchaseDate: string
  status: 'available' | 'distributed' | 'maintenance' | 'retired'
  notes?: string
}

export interface Distribution {
  id: string
  equipmentId: string
  recipientName: string
  recipientDepartment: string
  distributionDate: string
  expectedReturnDate?: string
  actualReturnDate?: string
  notes?: string
}

export const useEquipmentStore = defineStore('equipment', () => {
  const equipment = ref<Equipment[]>([])
  const distributions = ref<Distribution[]>([])

  // Load data from localStorage on initialization
  const loadData = () => {
    const savedEquipment = localStorage.getItem('equipment')
    if (savedEquipment) {
      equipment.value = JSON.parse(savedEquipment)
    }

    const savedDistributions = localStorage.getItem('distributions')
    if (savedDistributions) {
      distributions.value = JSON.parse(savedDistributions)
    }
  }

  // Save data to localStorage
  const saveEquipment = () => {
    localStorage.setItem('equipment', JSON.stringify(equipment.value))
  }

  const saveDistributions = () => {
    localStorage.setItem('distributions', JSON.stringify(distributions.value))
  }

  // Equipment CRUD operations
  const addEquipment = (newEquipment: Omit<Equipment, 'id'>) => {
    const id = crypto.randomUUID()
    equipment.value.push({ ...newEquipment, id })
    saveEquipment()
    return id
  }

  const updateEquipment = (updatedEquipment: Equipment) => {
    const index = equipment.value.findIndex(e => e.id === updatedEquipment.id)
    if (index !== -1) {
      equipment.value[index] = updatedEquipment
      saveEquipment()
      return true
    }
    return false
  }

  const deleteEquipment = (id: string) => {
    equipment.value = equipment.value.filter(e => e.id !== id)
    saveEquipment()
  }

  const getEquipmentById = (id: string) => {
    return equipment.value.find(e => e.id === id)
  }

  // Distribution operations
  const addDistribution = (newDistribution: Omit<Distribution, 'id'>) => {
    const id = crypto.randomUUID()
    distributions.value.push({ ...newDistribution, id })
    
    // Update equipment status
    const equipmentItem = equipment.value.find(e => e.id === newDistribution.equipmentId)
    if (equipmentItem) {
      equipmentItem.status = 'distributed'
      saveEquipment()
    }
    
    saveDistributions()
    return id
  }

  const updateDistribution = (updatedDistribution: Distribution) => {
    const index = distributions.value.findIndex(d => d.id === updatedDistribution.id)
    if (index !== -1) {
      distributions.value[index] = updatedDistribution
      saveDistributions()
      return true
    }
    return false
  }

  const returnEquipment = (distributionId: string, returnDate: string, notes?: string) => {
    const distribution = distributions.value.find(d => d.id === distributionId)
    if (distribution) {
      distribution.actualReturnDate = returnDate
      if (notes) distribution.notes = (distribution.notes ? distribution.notes + '; ' : '') + notes
      
      // Update equipment status
      const equipmentItem = equipment.value.find(e => e.id === distribution.equipmentId)
      if (equipmentItem) {
        equipmentItem.status = 'available'
        saveEquipment()
      }
      
      saveDistributions()
      return true
    }
    return false
  }

  const getDistributionsByEquipmentId = (equipmentId: string) => {
    return distributions.value.filter(d => d.equipmentId === equipmentId)
  }

  const getActiveDistributions = computed(() => {
    return distributions.value.filter(d => !d.actualReturnDate)
  })

  const getDistributionsByDateRange = (startDate: string, endDate: string) => {
    return distributions.value.filter(d => {
      const distDate = dayjs(d.distributionDate)
      return distDate.isAfter(dayjs(startDate)) && distDate.isBefore(dayjs(endDate))
    })
  }

  const getDistributionsByEquipmentType = (type: string) => {
    return distributions.value.filter(d => {
      const equipmentItem = equipment.value.find(e => e.id === d.equipmentId)
      return equipmentItem?.type === type
    })
  }

  // Statistics and reports
  const getEquipmentTypeStats = computed(() => {
    const stats: Record<string, number> = {}
    equipment.value.forEach(e => {
      stats[e.type] = (stats[e.type] || 0) + 1
    })
    return stats
  })

  const getDistributionStats = computed(() => {
    const monthlyStats: Record<string, number> = {}
    
    distributions.value.forEach(d => {
      const month = dayjs(d.distributionDate).format('YYYY-MM')
      monthlyStats[month] = (monthlyStats[month] || 0) + 1
    })
    
    return monthlyStats
  })

  const getEquipmentStatusStats = computed(() => {
    const stats: Record<string, number> = {
      available: 0,
      distributed: 0,
      maintenance: 0,
      retired: 0
    }
    
    equipment.value.forEach(e => {
      stats[e.status] = (stats[e.status] || 0) + 1
    })
    
    return stats
  })

  return {
    equipment,
    distributions,
    loadData,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    getEquipmentById,
    addDistribution,
    updateDistribution,
    returnEquipment,
    getDistributionsByEquipmentId,
    getActiveDistributions,
    getDistributionsByDateRange,
    getDistributionsByEquipmentType,
    getEquipmentTypeStats,
    getDistributionStats,
    getEquipmentStatusStats
  }
})
