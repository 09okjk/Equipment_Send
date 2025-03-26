import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import { Equipment, Distribution } from '@/stores/equipment'
import dayjs from 'dayjs'

export function exportEquipmentToCSV(equipment: Equipment[]): void {
  const csvData = Papa.unparse({
    fields: ['ID', '设备名称', '设备类型', '序列号', '购买日期', '状态', '备注'],
    data: equipment.map(item => [
      item.id,
      item.name,
      item.type,
      item.serialNumber,
      item.purchaseDate,
      translateStatus(item.status),
      item.notes || ''
    ])
  })
  
  // 添加 BOM 以解决中文乱码问题
  const BOM = '\uFEFF'
  const csvContent = BOM + csvData
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
  saveAs(blob, `设备列表_${dayjs().format('YYYY-MM-DD')}.csv`)
}

export function exportDistributionsToCSV(
  distributions: Distribution[], 
  equipmentMap: Record<string, Equipment>
): void {
  const csvData = Papa.unparse({
    fields: ['ID', '设备名称', '设备类型', '接收人', '部门', '分发日期', '预计归还日期', '实际归还日期', '备注'],
    data: distributions.map(item => [
      item.id,
      equipmentMap[item.equipmentId]?.name || '未知设备',
      equipmentMap[item.equipmentId]?.type || '未知类型',
      item.recipientName,
      item.recipientDepartment,
      item.distributionDate,
      item.expectedReturnDate || '',
      item.actualReturnDate || '',
      item.notes || ''
    ])
  })
  
  // 添加 BOM 以解决中文乱码问题
  const BOM = '\uFEFF'
  const csvContent = BOM + csvData
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
  saveAs(blob, `设备分发记录_${dayjs().format('YYYY-MM-DD')}.csv`)
}

function translateStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'available': '可用',
    'distributed': '已分发',
    'maintenance': '维护中',
    'retired': '已报废'
  }
  return statusMap[status] || status
}
