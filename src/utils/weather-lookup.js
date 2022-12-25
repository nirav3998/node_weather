const request = require("request")

const weatherLookup = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=074f44a6e734bc580787dfab2a448ba8&query=" +
    encodeURI(longitude) +
    "," +
    encodeURI(latitude);
  request({ url: url, json: true }, (error, {body}={}) => {
    if (error) {
      callback("unable to connect with weatherstack!!", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const data = {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        country: body.location.country,
      };
      callback(undefined,data)
    }
  });
};

module.exports = weatherLookup;
