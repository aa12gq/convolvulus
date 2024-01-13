import service from '@/utils/request'

// 获取国家信息列表
export const getCountryInfoList = (page, pageSize) => {
  return service({
    url: `/countryInfo/getCountryInfoList?page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}
