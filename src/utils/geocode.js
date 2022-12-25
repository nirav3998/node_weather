const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(address) +
    ".json?access_token=pk.eyJ1Ijoic2hhZG93LTM5OTgiLCJhIjoiY2xiaHBpdWI1MHFqbjNybXV6dWdlZHdyZyJ9.bqzvkHhGqcGhLtyP0tGNbg";

    request({url : url, json:true},(error,{body}={}) => {
        if(error){
            callback("Unable to connect with Map box!!",undefined)
        }else if(body.features.length === 0){
            callback("No results found for the address provided!!",undefined)
        }else{
            const place_name = body.features[0].place_name
            const data = {
                place_name,
                longitude : body.features[0].center[1],
                latitude : body.features[0].center[0]
                
            }
            callback(undefined,data)
        }
    })
};

module.exports = geoCode