import * as satellite from 'satellite.js/lib/index';
import { SCALE_RATIO } from './script';

export const parseStationsFromFile = (url) => {
    var request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.send(null);
    const stations = [];
    if (request.status === 200) {
        var fileContent = request.responseText;
        const lines = fileContent.split("\n");
        let station = null;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.length === 0) continue;
            if (line[0] === '1') {
                station.tleLine1 = line;
            } else if (line[0] === '2') {
                station.tleLine2 = line;
            } else {
                if (station) stations.push(station);
                station = { 
                    name: line
                };
            }
        }
        stations.push(station);
    }
    return stations;
}

const getScaledCoordinates = (v) => {
    let coords = [v.y, v.z, v.x];
    for (let i = 0; i < coords.length; i++) {
        coords[i] *= SCALE_RATIO;
    } 
    return coords;
}

export const getStationPosition = (station, date) => {
    if (!station.satrec) station.satrec = satellite.twoline2satrec(station.tleLine1, station.tleLine2);
    const positionAndVelocity = satellite.propagate(station.satrec, date);
    var gmst = satellite.gstime(new Date());
    const geodeticProperties = satellite.eciToGeodetic(positionAndVelocity.position, gmst);
    station.geodeticProperties = geodeticProperties;
    station.velocity = Math.sqrt(Math.pow(positionAndVelocity.velocity.x, 2) + Math.pow(positionAndVelocity.velocity.y, 2) + Math.pow(positionAndVelocity.velocity.z, 2));
    return getScaledCoordinates(satellite.eciToEcf(positionAndVelocity.position, gmst));
    //return getScaledCoordinates(positionAndVelocity.position, gmst);
}
