const API_ROOT = 'http://localhost:5555/' 

const createRequest = (options) => {
  let params = (options.activeTime === 'hourly') ? (options.activeDuration*24) + 1 : options.activeDuration + 1
  return API_ROOT + options.prop + '/' + options.activeTime + '?limit=' + params
}

export const callApi = (options) => {
  let fullUrl = createRequest(options)

  return fetch(fullUrl).then((response) => { 
    if(response.status === 200) {
      return response.json().then(json => json)
    } else {
      return []
    }
  }).catch(error => {
    return []
  })

}
