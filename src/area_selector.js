import * as THREE from 'three';

import {add_to_scene, remove_from_scene, EARTH_RADIUS, SCALE_RATIO} from './script.js'

const submit_button = document.getElementById('area-selector-submit');
const test_button   = document.getElementById('area-selector-test');
const latitude_btn  = document.getElementById('latitude-btn');
const longitude_btn = document.getElementById('longitude-btn');
const altitude_btn  = document.getElementById('altitude-btn');
const radius_btn    = document.getElementById('radius-btn');

let prev_obj = undefined;

function get_values() {
    let data = {
        latitude: parseInt(latitude_btn.value),
        longitude: parseInt(longitude_btn.value),
        altitude: parseInt(altitude_btn.value),
        radius: parseInt(radius_btn.value),
    };
    return data;
}

function test_area() {
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
    const cylinderMat   = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.4});
    const my_cyli = new THREE.Mesh(cylinderGeo, cylinderMat);
    my_cyli.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), ((data.latitude-90)*Math.PI)/180);
    my_cyli.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), ((data.longitude)*Math.PI)/180);

    //my_cyli.rotation.set(-1*((data.latitude+180)*Math.PI/180), 0, -1*((data.longitude+90)*Math.PI/180));
    //my_cyli.rotateX(-1*((data.latitude+91)*Math.PI)/180);
    //my_cyli.rotateY(-1*((data.longitude+91)*Math.PI)/180);
    //my_cyli.rotation.set(-1*((data.latitude+180)*Math.PI/180), 0, -1*((data.longitude+90)*Math.PI/180));
    prev_obj = my_cyli
    add_to_scene(my_cyli);
    //my_cyli.rotation.set(data.latitude+90, data.longitude+90, 0)
    //console.log(my_cyli)
}

function sumbit_onclick() {
    console.log(latitude_btn.value)
    console.log(longitude_btn.value)
    console.log(altitude_btn.value)
    console.log(radius_btn.value)
}
submit_button.onclick = sumbit_onclick;
test_button.onclick = test_area;
//submit_button.onclick = function() { alert('blah fuck'); };