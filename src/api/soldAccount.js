import service from '@/utils/request'

// 创建卖号管理
export const createSoldAccountInfo = (data) => {
  return service({
    url: `/soldAccountInfo/createSoldAccountInfo`,
    method: 'post',
    data
  })
}

export const exportAccount = (data) => {
  return service({
    url: `/soldAccountInfo/exportAccount`,
    method: 'post',
    data,
    responseType: 'blob', // 接收文件流
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除卖号管理
export const deleteSoldAccountInfo = (id) => {
  return service({
    url: `/soldAccountInfo/deleteSoldAccountInfo/${String(id)}`,
    method: 'delete',
  })
}

// 批量删除卖号管理
export const deleteSoldAccountInfoByIds = (params) => {
  return service({
    url: `/soldAccountInfo/deleteSoldAccountInfoByIds`,
    method: 'delete',
    params
  })
}

// 更新卖号管理
export const updateSoldAccountInfo = (data) => {
  return service({
    url: `/soldAccountInfo/updateSoldAccountInfo`,
    method: 'put',
    data
  })
}

// 根据ID获取卖号管理
export const findSoldAccountInfo = (id) => {
  return service({
    url: `/soldAccountInfo/findSoldAccountInfo/${String(id)}`,
    method: 'get',
  })
}

// 获取卖号管理列表
export const getSoldAccountInfoList = (page, pageSize) => {
  return service({
    url: `/soldAccountInfo/getSoldAccountInfoList?page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}
