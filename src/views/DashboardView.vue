<template>
  <div>
    <NavBar />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-2xl font-semibold text-gray-900">仪表盘</h1>
        
        <!-- Stats Cards -->
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
                      总设备数量
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ equipmentStore.equipment.length }}
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
                      可用设备
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ equipmentStatusStats.available }}
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
                      已分发设备
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ equipmentStatusStats.distributed }}
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      维护中设备
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ equipmentStatusStats.maintenance }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Distributions -->
        <h2 class="mt-8 text-lg font-medium text-gray-900">最近分发记录</h2>
        <div class="mt-2 flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        设备名称
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        接收人
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        部门
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        分发日期
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="distribution in recentDistributions" :key="distribution.id">
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
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ distribution.recipientDepartment }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ formatDate(distribution.distributionDate) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                              :class="distribution.actualReturnDate ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                          {{ distribution.actualReturnDate ? '已归还' : '使用中' }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="recentDistributions.length === 0">
                      <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        暂无分发记录
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Equipment Type Chart -->
        <div class="mt-8 bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-900">设备类型分布</h2>
          <div class="mt-4 h-64">
            <EquipmentTypeChart :chart-data="equipmentTypeChartData" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import NavBar from '@/components/NavBar.vue'
import EquipmentTypeChart from '@/components/EquipmentTypeChart.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'DashboardView',
  components: {
    NavBar,
    EquipmentTypeChart
  },
  setup() {
    const equipmentStore = useEquipmentStore()
    
    onMounted(() => {
      equipmentStore.loadData()
    })

    const equipmentStatusStats = computed(() => {
      return equipmentStore.getEquipmentStatusStats
    })
    
    const recentDistributions = computed(() => {
      return [...equipmentStore.distributions]
        .sort((a, b) => new Date(b.distributionDate).getTime() - new Date(a.distributionDate).getTime())
        .slice(0, 5)
    })
    
    const equipmentTypeChartData = computed(() => {
      const stats = equipmentStore.getEquipmentTypeStats
      return {
        labels: Object.keys(stats),
        datasets: [
          {
            label: '设备数量',
            backgroundColor: [
              '#3B82F6', // blue-500
              '#10B981', // green-500
              '#F59E0B', // amber-500
              '#EF4444', // red-500
              '#8B5CF6', // violet-500
              '#EC4899', // pink-500
              '#6366F1'  // indigo-500
            ],
            data: Object.values(stats)
          }
        ]
      }
    })

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
      equipmentStatusStats,
      recentDistributions,
      equipmentTypeChartData,
      getEquipmentName,
      getEquipmentType,
      formatDate
    }
  }
})
</script>
