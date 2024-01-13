import service from '@/utils/request'

// 创建账号分组
export const createAccountGroupInfo = (data) => {
  return service({
    url: `/accountGroupInfo/createAccountGroupInfo`,
    method: 'post',
    data
  })
}

// 删除账号分组
export const deleteAccountGroupInfo = (id) => {
  return service({
    url: `/accountGroupInfo/deleteAccountGroupInfo/${String(id)}`,
    method: 'delete',
  })
}

// 批量删除账号分组
export const deleteAccountGroupInfoByIds = (params) => {
  return service({
    url: `/accountGroupInfo/deleteAccountGroupInfoByIds`,
    method: 'delete',
    params
  })
}

// 更新账号分组
export const updateAccountGroupInfo = (data) => {
  return service({
    url: `/accountGroupInfo/updateAccountGroupInfo`,
    method: 'put',
    data
  })
}

// 根据ID获取账号分组
export const findAccountGroupInfo = (id) => {
  return service({
    url: `/accountGroupInfo/findAccountGroupInfo/${String(id)}`,
    method: 'get',
  })
}

// 获取账号分组列表
export const getAccountGroupInfoList = (page, pageSize) => {
  return service({
    url: `/accountGroupInfo/getAccountGroupInfoList?page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}
