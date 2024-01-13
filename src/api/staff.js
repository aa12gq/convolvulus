import service from '@/utils/request'

export const getStaffInfoList = (page, pageSize) => {
  return service({
    url: `/staff_info/getStaffInfoList?page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}
