
import request from 'superagent';

/**
 * findGeocoordinates
 *
 * @name findGeocoordinates
 * @function
 * @param {String} address The textual address to get the coordinates for
 * @return {String} The position object containing lat and lng keys as numbers
 */
export default function findGeocoordinates(address, callback) {
  var API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s';
  var API_KEY = 'AIzaSyBEwzAmJk2iKrC-kS_xkFfaw7YbFYdeg2A';
  var url = API_URL.replace('%s', address).replace('%s', API_KEY);
  request.get(url).end(function (err, response) {
    let {body} = response;
    
    if (err || response.status != 200) {
      return callback('Error while trying to geocode address: ' + address);
    }

    if (!body || !body.results[0]) {
      return callback('Failed to geocode address: ' + address);
    }

    return callback(null, body.results[0].geometry.location);
  });
}
