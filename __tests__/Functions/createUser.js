import generateUserAndDoRequest from './generateUserAndDoRequest.js'

generateUserAndDoRequest()
  .then(response => {
    console.log(response.statusCode)
    console.log(response.body)
  })
  .catch(error => {
    console.error(error)
  })
