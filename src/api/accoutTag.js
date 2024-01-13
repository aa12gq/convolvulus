import service from '@/utils/request'

// 创建账号标签
export const createAccountTagInfo = (data) => {
  return service({
    url: `/accountTagInfo/createAccountTagInfo`,
    method: 'post',
    data
  })
}

// 删除账号标签
export const deleteAccountTagInfo = (id) => {
  return service({
    url: `/accountTagInfo/deleteAccountTagInfo/${String(id)}`,
    method: 'delete',
  })
}

// 批量删除账号标签
export const deleteAccountTagInfoByIds = (params) => {
  return service({
    url: `/accountTagInfo/deleteAccountTagInfoByIds`,
    method: 'delete',
    params
  })
}

// 更新账号标签
export const updateAccountTagInfo = (data) => {
  return service({
    url: `/accountTagInfo/updateAccountTagInfo`,
    method: 'put',
    data
  })
}

// 根据ID获取账号标签
export const findAccountTagInfo = (id) => {
  return service({
    url: `/accountTagInfo/findAccountTagInfo/${String(id)}`,
    method: 'get',
  })
}

// 获取账号标签列表
export const getAccountTagInfoList = (page, pageSize) => {
  return service({
    url: `/accountTagInfo/getAccountTagInfoList?page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}
