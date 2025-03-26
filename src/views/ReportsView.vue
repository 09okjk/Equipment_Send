<template>
  <div>
    <NavBar />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-gray-900">统计报表</h1>
        </div>

        <!-- Filter Section -->
        <div class="mt-4 bg-white shadow rounded-lg p-4">
          <div class="flex flex-wrap gap-4">
            <div class="w-full md:w-auto">
              <label for="report-start-date" class="form-label">开始日期</label>
              <input
                id="report-start-date"
                type="date"
                v-model="filters.startDate"
                class="form-input"
              />
            </div>
            <div class="w-full md:w-auto">
              <label for="report-end-date" class="form-label">结束日期</label>
              <input
                id="report-end-date"
                type="date"
                v-model="filters.endDate"
                class="form-input"
              />
            </div>
            <div class="w-full md:w-auto">
              <label for="report-type" class="form-label">设备类型</label>
              <select
                id="report-type"
                v-model="filters.type"
                class="form-input"
              >
                <option value="">全部类型</option>
                <option v-for="type in equipmentTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-auto flex items-end">
              <button @click="applyFilters" class="btn btn-primary">
                应用筛选
              </button>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      总分发次数
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ stats.totalDistributions }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      已归还设备
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ stats.returnedCount }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      使用中设备
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ stats.activeCount }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      平均使用天数
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ stats.averageUsageDays }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Distribution by Month Chart -->
        <div class="mt-8 bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-900">月度分发统计</h2>
          <div class="mt-4 h-64">
            <MonthlyDistributionChart :chart-data="monthlyChartData" />
          </div>
        </div>

        <!-- Distribution by Department Chart -->
        <div class="mt-8 bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-900">部门分发统计</h2>
          <div class="mt-4 h-64">
            <DepartmentDistributionChart :chart-data="departmentChartData" />
          </div>
        </div>

        <!-- Top Equipment Table -->
        <div class="mt-8 bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-900">最常分发设备</h2>
          <div class="mt-4 flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        设备名称
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        设备类型
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        分发次数
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in topEquipment" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ item.type }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ item.count }}</div>
                      </td>
                    </tr>
                    <tr v-if="topEquipment.length === 0">
                      <td colspan="3" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        暂无数据
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
            导出报表
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import { exportDistributionsToCSV } from '@/utils/exportUtils'
import NavBar from '@/components/NavBar.vue'
import MonthlyDistributionChart from '@/components/MonthlyDistributionChart.vue'
import DepartmentDistributionChart from '@/components/DepartmentDistributionChart.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'ReportsView',
  components: {
    NavBar,
    MonthlyDistributionChart,
    DepartmentDistributionChart
  },
  setup() {
    const equipmentStore = useEquipmentStore()
    
    // Load data
    onMounted(() => {
      equipmentStore.loadData()
      applyFilters()
    })
    
    // Filters
    const filters = ref({
      startDate: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      type: ''
    })
    
    // Filtered distributions
    const filteredDistributions = ref<any[]>([])
    
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
    
    // Apply filters
    const applyFilters = () => {
      filteredDistributions.value = equipmentStore.distributions.filter(d => {
        // Date range filter
        if (filters.value.startDate && filters.value.endDate) {
          const distDate = dayjs(d.distributionDate)
          const startDate = dayjs(filters.value.startDate)
          const endDate = dayjs(filters.value.endDate)
          
          if (distDate.isBefore(startDate) || distDate.isAfter(endDate)) {
            return false
          }
        }
        
        // Type filter
        if (filters.value.type) {
          const equipment = equipmentMap.value[d.equipmentId]
          if (!equipment || equipment.type !== filters.value.type) {
            return false
          }
        }
        
        return true
      })
      
      calculateStats()
    }
    
    // Statistics
    const stats = ref({
      totalDistributions: 0,
      returnedCount: 0,
      activeCount: 0,
      averageUsageDays: 0
    })
    
    const calculateStats = () => {
      stats.value.totalDistributions = filteredDistributions.value.length
      
      // Count returned and active distributions
      stats.value.returnedCount = filteredDistributions.value.filter(d => d.actualReturnDate).length
      stats.value.activeCount = filteredDistributions.value.filter(d => !d.actualReturnDate).length
      
      // Calculate average usage days for returned equipment
      const returnedDistributions = filteredDistributions.value.filter(d => d.actualReturnDate)
      if (returnedDistributions.length > 0) {
        const totalDays = returnedDistributions.reduce((sum, d) => {
          const start = dayjs(d.distributionDate)
          const end = dayjs(d.actualReturnDate)
          return sum + end.diff(start, 'day')
        }, 0)
        stats.value.averageUsageDays = Math.round(totalDays / returnedDistributions.length)
      } else {
        stats.value.averageUsageDays = 0
      }
    }
    
    // Monthly distribution chart data
    const monthlyChartData = computed(() => {
      const monthlyData: Record<string, number> = {}
      
      // Initialize months in range
      let currentDate = dayjs(filters.value.startDate)
      const endDate = dayjs(filters.value.endDate)
      
      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'month')) {
        const monthKey = currentDate.format('YYYY-MM')
        monthlyData[monthKey] = 0
        currentDate = currentDate.add(1, 'month')
      }
      
      // Count distributions by month
      filteredDistributions.value.forEach(d => {
        const month = dayjs(d.distributionDate).format('YYYY-MM')
        if (monthlyData[month] !== undefined) {
          monthlyData[month]++
        }
      })
      
      return {
        labels: Object.keys(monthlyData).map(month => {
          return dayjs(month).format('YYYY年MM月')
        }),
        datasets: [
          {
            label: '分发次数',
            backgroundColor: '#3B82F6',
            data: Object.values(monthlyData)
          }
        ]
      }
    })
    
    // Department distribution chart data
    const departmentChartData = computed(() => {
      const departmentData: Record<string, number> = {}
      
      // Count distributions by department
      filteredDistributions.value.forEach(d => {
        const dept = d.recipientDepartment
        departmentData[dept] = (departmentData[dept] || 0) + 1
      })
      
      // Sort by count and take top 5
      const sortedDepts = Object.entries(departmentData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
      
      return {
        labels: sortedDepts.map(([dept]) => dept),
        datasets: [
          {
            label: '分发次数',
            backgroundColor: [
              '#3B82F6', // blue-500
              '#10B981', // green-500
              '#F59E0B', // amber-500
              '#EF4444', // red-500
              '#8B5CF6'  // violet-500
            ],
            data: sortedDepts.map(([, count]) => count)
          }
        ]
      }
    })
    
    // Top equipment by distribution count
    const topEquipment = computed(() => {
      const equipmentCounts: Record<string, number> = {}
      
      // Count distributions by equipment
      filteredDistributions.value.forEach(d => {
        equipmentCounts[d.equipmentId] = (equipmentCounts[d.equipmentId] || 0) + 1
      })
      
      // Sort by count and take top 5
      return Object.entries(equipmentCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([equipmentId, count]) => {
          const equipment = equipmentMap.value[equipmentId]
          return {
            id: equipmentId,
            name: equipment ? equipment.name : '未知设备',
            type: equipment ? equipment.type : '未知类型',
            count
          }
        })
    })
    
    // Export to CSV
    const exportToCSV = () => {
      exportDistributionsToCSV(filteredDistributions.value, equipmentMap.value)
    }
    
    return {
      equipmentStore,
      filters,
      equipmentTypes,
      stats,
      monthlyChartData,
      departmentChartData,
      topEquipment,
      applyFilters,
      exportToCSV
    }
  }
})
</script>
