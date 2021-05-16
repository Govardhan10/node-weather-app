const request = require('postman-request')

const forecast = ( {latitude, longitude} = {}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d148bc1408d4951313f037250346bf7a&query='+latitude+','+longitude
    // console.log(url)
    request(
        {
            url, 
            json: true
        }, 
        (error, { body } = {}) => {
            if(error) {
                callback('Unable to access to weather service', undefined)
            } else if(body.error) {
                callback('Not a valid request', undefined)
            } else {
                callback(undefined, body.current)
            }
        }
    )
}

module.exports = {
    forecast : forecast
}