<template>
  <div>
    <NavBar />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-gray-900">设备管理</h1>
          <router-link to="/equipment/add" class="btn btn-primary">
            添加设备
          </router-link>
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
              <label for="filter-status" class="form-label">设备状态</label>
              <select
                id="filter-status"
                v-model="filters.status"
                class="form-input"
              >
                <option value="">全部状态</option>
                <option value="available">可用</option>
                <option value="distributed">已分发</option>
                <option value="maintenance">维护中</option>
                <option value="retired">已报废</option>
              </select>
            </div>
            <div class="w-full md:w-auto">
              <label for="search" class="form-label">搜索</label>
              <input
                id="search"
                type="text"
                v-model="filters.search"
                placeholder="搜索设备名称或序列号"
                class="form-input"
              />
            </div>
          </div>
        </div>

        <!-- Equipment Table -->
        <div class="mt-6 flex flex-col">
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
                        类型
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        序列号
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        购买日期
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="equipment in filteredEquipment" :key="equipment.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ equipment.name }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ equipment.type }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ equipment.serialNumber }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ formatDate(equipment.purchaseDate) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                              :class="getStatusClass(equipment.status)">
                          {{ translateStatus(equipment.status) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                          <router-link :to="`/equipment/edit/${equipment.id}`" class="text-blue-600 hover:text-blue-900">
                            编辑
                          </router-link>
                          <button @click="showDistributeModal(equipment)" 
                                  :disabled="equipment.status !== 'available'"
                                  :class="equipment.status === 'available' ? 'text-green-600 hover:text-green-900' : 'text-gray-400 cursor-not-allowed'">
                            分发
                          </button>
                          <button @click="confirmDelete(equipment)" class="text-red-600 hover:text-red-900">
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredEquipment.length === 0">
                      <td colspan="6" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        暂无设备数据
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

    <!-- Distribution Modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="distributeEquipment">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    分发设备
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="recipient-name" class="form-label">接收人姓名</label>
                      <input type="text" id="recipient-name" v-model="distributionForm.recipientName" required class="form-input" />
                    </div>
                    <div>
                      <label for="recipient-department" class="form-label">接收人部门</label>
                      <input type="text" id="recipient-department" v-model="distributionForm.recipientDepartment" required class="form-input" />
                    </div>
                    <div>
                      <label for="distribution-date" class="form-label">分发日期</label>
                      <input type="date" id="distribution-date" v-model="distributionForm.distributionDate" required class="form-input" />
                    </div>
                    <div>
                      <label for="expected-return-date" class="form-label">预计归还日期</label>
                      <input type="date" id="expected-return-date" v-model="distributionForm.expectedReturnDate" class="form-input" />
                    </div>
                    <div>
                      <label for="notes" class="form-label">备注</label>
                      <textarea id="notes" v-model="distributionForm.notes" rows="3" class="form-input"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" class="btn btn-primary sm:ml-3">
                确认分发
              </button>
              <button type="button" class="btn btn-secondary" @click="showModal = false">
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDeleteModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  删除设备
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    您确定要删除设备 "{{ equipmentToDelete?.name }}" 吗？此操作无法撤销。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="btn btn-danger sm:ml-3" @click="deleteEquipment">
              删除
            </button>
            <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEquipmentStore, Equipment, Distribution } from '@/stores/equipment'
import { exportEquipmentToCSV } from '@/utils/exportUtils'
import NavBar from '@/components/NavBar.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'EquipmentView',
  components: {
    NavBar
  },
  setup() {
    const router = useRouter()
    const equipmentStore = useEquipmentStore()
    
    // Load data
    onMounted(() => {
      equipmentStore.loadData()
    })
    
    // Filters
    const filters = ref({
      type: '',
      status: '',
      search: ''
    })
    
    // Equipment types for filter dropdown
    const equipmentTypes = computed(() => {
      const types = new Set<string>()
      equipmentStore.equipment.forEach(e => types.add(e.type))
      return Array.from(types)
    })
    
    // Filtered equipment list
    const filteredEquipment = computed(() => {
      return equipmentStore.equipment.filter(e => {
        // Type filter
        if (filters.value.type && e.type !== filters.value.type) {
          return false
        }
        
        // Status filter
        if (filters.value.status && e.status !== filters.value.status) {
          return false
        }
        
        // Search filter
        if (filters.value.search) {
          const searchTerm = filters.value.search.toLowerCase()
          return e.name.toLowerCase().includes(searchTerm) || 
                 e.serialNumber.toLowerCase().includes(searchTerm)
        }
        
        return true
      })
    })
    
    // Distribution modal
    const showModal = ref(false)
    const selectedEquipment = ref<Equipment | null>(null)
    const distributionForm = ref<Omit<Distribution, 'id' | 'equipmentId'>>({
      recipientName: '',
      recipientDepartment: '',
      distributionDate: dayjs().format('YYYY-MM-DD'),
      expectedReturnDate: '',
      notes: ''
    })
    
    const showDistributeModal = (equipment: Equipment) => {
      if (equipment.status === 'available') {
        selectedEquipment.value = equipment
        showModal.value = true
      }
    }
    
    const distributeEquipment = () => {
      if (selectedEquipment.value) {
        equipmentStore.addDistribution({
          equipmentId: selectedEquipment.value.id,
          recipientName: distributionForm.value.recipientName,
          recipientDepartment: distributionForm.value.recipientDepartment,
          distributionDate: distributionForm.value.distributionDate,
          expectedReturnDate: distributionForm.value.expectedReturnDate,
          notes: distributionForm.value.notes
        })
        
        // Reset form and close modal
        distributionForm.value = {
          recipientName: '',
          recipientDepartment: '',
          distributionDate: dayjs().format('YYYY-MM-DD'),
          expectedReturnDate: '',
          notes: ''
        }
        showModal.value = false
      }
    }
    
    // Delete equipment
    const showDeleteModal = ref(false)
    const equipmentToDelete = ref<Equipment | null>(null)
    
    const confirmDelete = (equipment: Equipment) => {
      equipmentToDelete.value = equipment
      showDeleteModal.value = true
    }
    
    const deleteEquipment = () => {
      if (equipmentToDelete.value) {
        equipmentStore.deleteEquipment(equipmentToDelete.value.id)
        showDeleteModal.value = false
      }
    }
    
    // Export to CSV
    const exportToCSV = () => {
      exportEquipmentToCSV(filteredEquipment.value)
    }
    
    // Helper functions
    const formatDate = (dateString: string) => {
      return dayjs(dateString).format('YYYY-MM-DD')
    }
    
    const translateStatus = (status: string) => {
      const statusMap: Record<string, string> = {
        'available': '可用',
        'distributed': '已分发',
        'maintenance': '维护中',
        'retired': '已报废'
      }
      return statusMap[status] || status
    }
    
    const getStatusClass = (status: string) => {
      const statusClassMap: Record<string, string> = {
        'available': 'bg-green-100 text-green-800',
        'distributed': 'bg-yellow-100 text-yellow-800',
        'maintenance': 'bg-blue-100 text-blue-800',
        'retired': 'bg-red-100 text-red-800'
      }
      return statusClassMap[status] || 'bg-gray-100 text-gray-800'
    }
    
    return {
      equipmentStore,
      filters,
      equipmentTypes,
      filteredEquipment,
      showModal,
      selectedEquipment,
      distributionForm,
      showDistributeModal,
      distributeEquipment,
      showDeleteModal,
      equipmentToDelete,
      confirmDelete,
      deleteEquipment,
      exportToCSV,
      formatDate,
      translateStatus,
      getStatusClass
    }
  }
})
</script>
