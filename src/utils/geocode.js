const request = require('postman-request')

const geocode = (location, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoiZ292YW1lMTAiLCJhIjoiY2tvbGM0cXJlMGU2ZzJwcGU2eHdiM3hkdCJ9.ysa86DEP-VzM_wPZZgOAoA&limit=1'
    // console.log(url)
    request(
        {
            url,
            json : true
        },
        (error, { body }= {}) => {
            if(error) {
                callback('Unable to access to weather service', undefined)
            } else if(body.error) {
                callback('Not a valid request', undefined)
            } else if(body.features.length === 0) {
                callback('Not a valid location', undefined)
            } else {
                const data = body.features[0]
                callback(undefined, {
                    latitude : data.center[1],
                    longitude : data.center[0],
                    location : data.place_name
                })
            }
        }
    )
}

module.exports = {
    geocode : geocode
}