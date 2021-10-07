import * as THREE from 'three';

import {debris_objects, add_to_scene, remove_from_scene, EARTH_RADIUS, SCALE_RATIO} from './script.js'
import {get_info, updateDebrisPositions} from './debris_handler'

const submit_button = document.getElementById('area-selector-submit');
const test_button   = document.getElementById('area-selector-test');
const latitude_btn  = document.getElementById('latitude-btn');
const longitude_btn = document.getElementById('longitude-btn');
const altitude_btn  = document.getElementById('altitude-btn');
const radius_btn    = document.getElementById('radius-btn');
const period_btn      = document.getElementById('period-btn');
const num_of_debris = document.getElementById('number-of-debris-area');

let prev_obj = undefined;

function get_values() {
    let data = {
        latitude: parseInt(latitude_btn.value),
        longitude: parseInt(longitude_btn.value),
        altitude: parseInt(altitude_btn.value),
        radius: parseInt(radius_btn.value),
        period: parseInt(period_btn.value),
    };
    if (data.period > 100) {
        alert("Time Period for area selector is too high, changed to 100 mins");
        data.period = 100;
    }
    return data;
}

function test_area(event) {
    event.cancelBubble = true;
    let data = get_values();
    console.log(data)
    if (prev_obj) {
        remove_from_scene(prev_obj);
    }
    if (Math.abs(data.latitude) > 180) {
        alert("Invalid Latitude")
        return
    }
    if (Math.abs(data.longitude) > 180) {
        alert("Invalid longitude")
        return
    }
    if (data.altitude <= 0) {
        alert("Invalid altitude")
        return
    }
    const height = data.altitude*SCALE_RATIO+EARTH_RADIUS
    const cylinderGeo   = new THREE.CylinderGeometry(data.radius*SCALE_RATIO, data.radius*SCALE_RATIO, height, 32);
    cylinderGeo.applyMatrix4( new THREE.Matrix4().makeTranslation(0, height/2, 0) );
    const cylinderMat   = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.4});
    cylinderMat.wireframe = true;
    console.log(cylinderMat)
    const my_cyli = new THREE.Mesh(cylinderGeo, cylinderMat);
    my_cyli.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), ((data.latitude-90)*Math.PI)/180);
    my_cyli.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), ((data.longitude)*Math.PI)/180);
    prev_obj = my_cyli
    add_to_scene(my_cyli);
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}


export function show_number_of_debris_in_area() {         //Period will be in mins
    let data = get_values();
    let period = data.period;
    let num = 0;
    if (period == 0) {
        for (let i = 0; i < debris_objects.length; ++i) {
            let info = get_info(i);
            if (info != undefined) {
                if (info.height <= data.altitude && getDistanceFromLatLonInKm(info.latitude, info.longitude, data.latitude*(180/(2*Math.PI)), data.longitude * (180/(2*Math.PI))) <= data.radius ) {
                    num += 1
                }
            }
        }
    }
    else {
        for (let time = 0; time < period*60; time += 20) {
            for (let i = 0; i < debris_objects.length; ++i) {
                let info = get_info(i);
                if (info != undefined) {
                    if (info.height <= data.altitude && getDistanceFromLatLonInKm(info.latitude, info.longitude, data.latitude*(180/(2*Math.PI)), data.longitude * (180/(2*Math.PI))) <= data.radius ) {
                        num += 1
                    }
                }
            }
            let area_date = new Date();
            area_date.setSeconds(area_date.getSeconds()+time)
            updateDebrisPositions(area_date)
        }
    }
    return num
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function sumbit_onclick(event) {
    event.cancelBubble = true;
    //console.log(latitude_btn.value)
    //console.log(longitude_btn.value)
    //console.log(altitude_btn.value)
    //console.log(radius_btn.value)
    //console.log("debris in area", show_number_of_debris_in_area())
    
    const area_debris = show_number_of_debris_in_area()
    if (area_debris) {
        console.log("debris in area", area_debris)
        num_of_debris.innerText = area_debris;
    }
}
submit_button.onclick = sumbit_onclick;
test_button.onclick = test_area;
