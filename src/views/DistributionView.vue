<template>
  <div>
    <NavBar />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-gray-900">分发记录</h1>
        </div>

        <!-- Filter Section -->
        <div class="mt-4 bg-white shadow rounded-lg p-4">
          <div class="flex flex-wrap gap-4">
            <div class="w-full md:w-auto">
              <label for="filter-type" class="form-label">设备类型</label>
              <select
                id="filter-type"
                v-model="filters.type"
                class="form-input"
              >
                <option value="">全部类型</option>
                <option v-for="type in equipmentTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-auto">
              <label for="filter-status" class="form-label">状态</label>
              <select
                id="filter-status"
                v-model="filters.status"
                class="form-input"
              >
                <option value="">全部状态</option>
                <option value="active">使用中</option>
                <option value="returned">已归还</option>
              </select>
            </div>
            <div class="w-full md:w-auto">
              <label for="filter-start-date" class="form-label">开始日期</label>
              <input
                id="filter-start-date"
                type="date"
                v-model="filters.startDate"
                class="form-input"
              />
            </div>
            <div class="w-full md:w-auto">
              <label for="filter-end-date" class="form-label">结束日期</label>
              <input
                id="filter-end-date"
                type="date"
                v-model="filters.endDate"
                class="form-input"
              />
            </div>
            <div class="w-full md:w-auto">
              <label for="search" class="form-label">搜索</label>
              <input
                id="search"
                type="text"
                v-model="filters.search"
                placeholder="搜索设备名称或接收人"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- Distribution Table -->
        <div class="mt-6 flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        设备信息
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        接收人
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        分发日期
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        预计归还日期
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        实际归还日期
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="distribution in filteredDistributions" :key="distribution.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">
                          {{ getEquipmentName(distribution.equipmentId) }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ getEquipmentType(distribution.equipmentId) }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ distribution.recipientName }}</div>
                        <div class="text-sm text-gray-500">{{ distribution.recipientDepartment }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ formatDate(distribution.distributionDate) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ distribution.expectedReturnDate ? formatDate(distribution.expectedReturnDate) : '-' }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ distribution.actualReturnDate ? formatDate(distribution.actualReturnDate) : '-' }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                          <button 
                            v-if="!distribution.actualReturnDate"
                            @click="showReturnModal(distribution)" 
                            class="text-green-600 hover:text-green-900"
                          >
                            归还
                          </button>
                          <button 
                            v-else
                            disabled
                            class="text-gray-400 cursor-not-allowed"
                          >
                            已归还
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredDistributions.length === 0">
                      <td colspan="6" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        暂无分发记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Export Button -->
        <div class="mt-4 flex justify-end">
          <button @click="exportToCSV" class="btn btn-secondary flex items-center">
            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            导出CSV
          </button>
        </div>
      </div>
    </main>

    <!-- Return Equipment Modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="returnEquipment">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    归还设备
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="return-date" class="form-label">归还日期</label>
                      <input type="date" id="return-date" v-model="returnForm.returnDate" required class="form-input" />
                    </div>
                    <div>
                      <label for="return-notes" class="form-label">备注</label>
                      <textarea id="return-notes" v-model="returnForm.notes" rows="3" class="form-input"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" class="btn btn-primary sm:ml-3">
                确认归还
              </button>
              <button type="button" class="btn btn-secondary" @click="showModal = false">
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useEquipmentStore, Distribution } from '@/stores/equipment'
import { exportDistributionsToCSV } from '@/utils/exportUtils'
import NavBar from '@/components/NavBar.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'DistributionView',
  components: {
    NavBar
  },
  setup() {
    const equipmentStore = useEquipmentStore()
    
    // Load data
    onMounted(() => {
      equipmentStore.loadData()
    })
    
    // Filters
    const filters = ref({
      type: '',
      status: '',
      startDate: '',
      endDate: '',
      search: ''
    })
    
    // Equipment types for filter dropdown
    const equipmentTypes = computed(() => {
      const types = new Set<string>()
      equipmentStore.equipment.forEach(e => types.add(e.type))
      return Array.from(types)
    })
    
    // Create equipment map for quick lookups
    const equipmentMap = computed(() => {
      const map: Record<string, any> = {}
      equipmentStore.equipment.forEach(e => {
        map[e.id] = e
      })
      return map
    })
    
    // Filtered distributions
    const filteredDistributions = computed(() => {
      return equipmentStore.distributions.filter(d => {
        // Type filter
        if (filters.value.type) {
          const equipment = equipmentMap.value[d.equipmentId]
          if (!equipment || equipment.type !== filters.value.type) {
            return false
          }
        }
        
        // Status filter
        if (filters.value.status === 'active' && d.actualReturnDate) {
          return false
        }
        if (filters.value.status === 'returned' && !d.actualReturnDate) {
          return false
        }
        
        // Date range filter
        if (filters.value.startDate && filters.value.endDate) {
          const distDate = dayjs(d.distributionDate)
          const startDate = dayjs(filters.value.startDate)
          const endDate = dayjs(filters.value.endDate)
          
          if (distDate.isBefore(startDate) || distDate.isAfter(endDate)) {
            return false
          }
        }
        
        // Search filter
        if (filters.value.search) {
          const searchTerm = filters.value.search.toLowerCase()
          const equipment = equipmentMap.value[d.equipmentId]
          
          return (equipment && equipment.name.toLowerCase().includes(searchTerm)) || 
                 d.recipientName.toLowerCase().includes(searchTerm) ||
                 d.recipientDepartment.toLowerCase().includes(searchTerm)
        }
        
        return true
      })
    })
    
    // Return equipment modal
    const showModal = ref(false)
    const selectedDistribution = ref<Distribution | null>(null)
    const returnForm = ref({
      returnDate: dayjs().format('YYYY-MM-DD'),
      notes: ''
    })
    
    const showReturnModal = (distribution: Distribution) => {
      selectedDistribution.value = distribution
      showModal.value = true
    }
    
    const returnEquipment = () => {
      if (selectedDistribution.value) {
        equipmentStore.returnEquipment(
          selectedDistribution.value.id,
          returnForm.value.returnDate,
          returnForm.value.notes
        )
        
        // Reset form and close modal
        returnForm.value = {
          returnDate: dayjs().format('YYYY-MM-DD'),
          notes: ''
        }
        showModal.value = false
      }
    }
    
    // Export to CSV
    const exportToCSV = () => {
      exportDistributionsToCSV(filteredDistributions.value, equipmentMap.value)
    }
    
    // Helper functions
    const getEquipmentName = (id: string) => {
      const equipment = equipmentStore.getEquipmentById(id)
      return equipment ? equipment.name : '未知设备'
    }
    
    const getEquipmentType = (id: string) => {
      const equipment = equipmentStore.getEquipmentById(id)
      return equipment ? equipment.type : '未知类型'
    }
    
    const formatDate = (dateString: string) => {
      return dayjs(dateString).format('YYYY-MM-DD')
    }
    
    return {
      equipmentStore,
      filters,
      equipmentTypes,
      filteredDistributions,
      showModal,
      selectedDistribution,
      returnForm,
      showReturnModal,
      returnEquipment,
      exportToCSV,
      getEquipmentName,
      getEquipmentType,
      formatDate
    }
  }
})
</script>
