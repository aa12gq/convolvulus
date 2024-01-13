import service from '@/utils/request'
// @Router /register/getRegisterTaskList [get]
export const getSieveTaskList = (params) => {
  // params 包含 page, pageSize, taskName, sort, order 等
  const { page, pageSize, taskName, sort, order } = params
  let url = `/sieveTask/getSieveTaskList?page=${page}&pageSize=${pageSize}`
  if (taskName) url += `&taskName=${taskName}`
  if (sort) url += `&sort=${sort}&order=${order}` // 添加排序参数

  return service({
    url: url,
    method: 'get',
  })
}

export const createSieveTask = (data) => {
  return service({
    url: `/sieveTask/createSieveTask`,
    method: 'post',
    data
  })
}

export const findSieveTask = (id) => {
  console.log(id)
  return service({
    url: `/sieveTask/findSieveTask/${id}`,
    method: 'get',
  })
}

export const recoverTask = (id) => {
  return service({
    url: `/sieveTask/recoverTask/${id}`,
    method: 'post',
  })
}
export const pauseTask = (id) => {
  return service({
    url: `/sieveTask/pauseTask/${id}`,
    method: 'post',
  })
}

export const deleteSieveTask = (data) => {
  return service({
    url: `/sieveTask/deleteSieveTask`,
    method: 'delete',
    data
  })
}

export const getSievenNumberList = (page, pageSize, taskId, phone) => {
  return service({
    url: `/sievenNumber/getSievenNumberList?page=${page}&pageSize=${pageSize}&task_id=${taskId}&phone_number=${phone}`,
    method: 'get',
  })
}

export const deleteByTaskId = (taskId) => {
  return service({
    url: `/sievenNumber/deleteByTaskId/${String(taskId)}`,
    method: 'delete',
  })
}

export const downloadDisableAccounts = (taskId) => {
  return service({
    url: `/sievenNumber/downloadDisableAccounts/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const downloadNormalAccounts = (taskId) => {
  return service({
    url: `/sievenNumber/downloadNormalAccounts/${String(taskId)}`,
    method: 'get',
    responseType: 'blob', // 确保响应类型为 blob，这样才能处理文件流
  })
}


export const downloadInvalidAccounts = (taskId) => {
  return service({
    url: `/sievenNumber/downloadInvalidAccounts/${String(taskId)}`,
    method: 'get',
    responseType: 'blob', // 确保响应类型为 blob，这样才能处理文件流
  })
}


export const downloadAllAccounts = (taskId) => {
  return service({
    url: `/sievenNumber/downloadAllAccounts/${String(taskId)}`,
    method: 'get',
    responseType: 'blob', // 确保响应类型为 blob，这样才能处理文件流
  })
}