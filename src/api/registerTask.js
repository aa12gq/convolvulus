import service from '@/utils/request'
export const getRegisterTaskList = (params) => {
  // params 包含 page, pageSize, taskName, sort, order 等
  const { page, pageSize, taskName, sort, order } = params
  let url = `/registerTask/getRegisterTaskList?page=${page}&pageSize=${pageSize}`
  if (taskName) url += `&taskName=${taskName}`
  if (sort) url += `&sort=${sort}&order=${order}` // 添加排序参数

  return service({
    url: url,
    method: 'get',
  })
}

export const createRegisterTask = (data) => {
  return service({
    url: `/registerTask/createRegisterTask`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateAccountGroupInfo = (data) => {
  return service({
    url: `/registerTask/updateAccountGroupInfo`,
    method: 'put',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getSubTaskList = (page, pageSize, taskId, phone) => {
  return service({
    url: `/registerSubTask/getRegisterSubTaskList?page=${page}&pageSize=${pageSize}&main_task_id=${taskId}&phone=${phone}`,
    method: 'get',
  })
}

export const DownloadBlockedAccountsAsTxt = (taskId) => {
  return service({
    url: `/registerSubTask/download/blocked/txt/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const DownloadBlockedAccountsAsExcel = (taskId) => {
  return service({
    url: `/registerSubTask/download/blocked/excel/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const DownloadRiskControlAccountsAsTxt = (taskId) => {
  return service({
    url: `/registerSubTask/download/riskcontrol/txt/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const DownloadRiskControlAccountsAsExcel = (taskId) => {
  return service({
    url: `/registerSubTask/download/riskcontrol/excel/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const DownloadSuccessAccountsAsTxt = (taskId) => {
  return service({
    url: `/registerSubTask/download/success/txt/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const DownloadSuccessAccountsAsExcel = (taskId) => {
  return service({
    url: `/registerSubTask/download/success/excel/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const DownloadNonExecutionAccountsAsTxt = (taskId) => {
  return service({
    url: `/registerSubTask/download/non_execution/txt/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const DownloadNonExecutionAccountsAsExcel = (taskId) => {
  return service({
    url: `/registerSubTask/download/non_execution/excel/${String(taskId)}`,
    method: 'get',
    responseType: 'blob',
  })
}

export const deleteRegisterTask = (data) => {
  return service({
    url: `/registerTask/deleteRegisterTask`,
    method: 'delete',
    data
  })
}

export const PauseTask = (id) => {
  return service({
    url: `/registerTask/pauseTask/${id}`,
    method: 'post',
  })
}

export const ResumeTask = (id) => {
  return service({
    url: `/registerTask/resumeTask/${id}`,
    method: 'post',
  })
}

