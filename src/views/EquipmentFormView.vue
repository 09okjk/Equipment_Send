<template>
  <div>
    <NavBar />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ isEditing ? '编辑设备' : '添加设备' }}
          </h1>
          <router-link to="/equipment" class="btn btn-secondary">
            返回设备列表
          </router-link>
        </div>

        <div class="mt-6 bg-white shadow rounded-lg p-6">
          <form @submit.prevent="saveEquipment">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="name" class="form-label">设备名称</label>
                <input
                  id="name"
                  type="text"
                  v-model="form.name"
                  required
                  class="form-input"
                />
              </div>

              <div>
                <label for="type" class="form-label">设备类型</label>
                <input
                  id="type"
                  type="text"
                  v-model="form.type"
                  required
                  class="form-input"
                  list="equipment-types"
                />
                <datalist id="equipment-types">
                  <option v-for="type in equipmentTypes" :key="type" :value="type"></option>
                </datalist>
              </div>

              <div>
                <label for="serialNumber" class="form-label">序列号</label>
                <input
                  id="serialNumber"
                  type="text"
                  v-model="form.serialNumber"
                  required
                  class="form-input"
                />
              </div>

              <div>
                <label for="purchaseDate" class="form-label">购买日期</label>
                <input
                  id="purchaseDate"
                  type="date"
                  v-model="form.purchaseDate"
                  required
                  class="form-input"
                />
              </div>

              <div>
                <label for="status" class="form-label">状态</label>
                <select
                  id="status"
                  v-model="form.status"
                  required
                  class="form-input"
                >
                  <option value="available">可用</option>
                  <option value="maintenance">维护中</option>
                  <option value="retired">已报废</option>
                </select>
              </div>
            </div>

            <div class="mt-6">
              <label for="notes" class="form-label">备注</label>
              <textarea
                id="notes"
                v-model="form.notes"
                rows="3"
                class="form-input"
              ></textarea>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <router-link to="/equipment" class="btn btn-secondary">
                取消
              </router-link>
              <button type="submit" class="btn btn-primary">
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEquipmentStore, Equipment } from '@/stores/equipment'
import NavBar from '@/components/NavBar.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'EquipmentFormView',
  components: {
    NavBar
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const equipmentStore = useEquipmentStore()
    
    // Load data
    onMounted(() => {
      equipmentStore.loadData()
      
      // If editing, load equipment data
      if (isEditing.value && equipmentId.value) {
        const equipment = equipmentStore.getEquipmentById(equipmentId.value)
        if (equipment) {
          form.value = { ...equipment }
        } else {
          // Equipment not found, redirect to list
          router.push('/equipment')
        }
      }
    })
    
    // Check if editing or adding
    const equipmentId = computed(() => route.params.id as string)
    const isEditing = computed(() => !!equipmentId.value)
    
    // Form data
    const form = ref<Equipment>({
      id: '',
      name: '',
      type: '',
      serialNumber: '',
      purchaseDate: dayjs().format('YYYY-MM-DD'),
      status: 'available',
      notes: ''
    })
    
    // Get unique equipment types for datalist
    const equipmentTypes = computed(() => {
      const types = new Set<string>()
      equipmentStore.equipment.forEach(e => types.add(e.type))
      return Array.from(types)
    })
    
    // Save equipment
    const saveEquipment = () => {
      if (isEditing.value) {
        // Update existing equipment
        equipmentStore.updateEquipment(form.value)
      } else {
        // Add new equipment
        const { id, ...newEquipment } = form.value
        equipmentStore.addEquipment(newEquipment)
      }
      
      // Redirect to equipment list
      router.push('/equipment')
    }
    
    return {
      isEditing,
      form,
      equipmentTypes,
      saveEquipment
    }
  }
})
</script>
