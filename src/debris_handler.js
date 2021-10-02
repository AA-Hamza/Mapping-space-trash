import * as THREE from 'three';
import {camera} from './script.js';
import {draw} from './debris.js';
import * as TWEEN from "@tweenjs/tween.js";

const debris_size = 0.2;

// I am assuming I will have a point (vec3) and some kind of identifier, they should be one to one
// Each would be in this order debris = [ [debris_id, x, y, z] ]

let debris_texture;
let material;
let debris_objects = [];

export function draw_debris(debris, texture) {
    debris_texture = texture;
    material = new THREE.SpriteMaterial( { map: debris_texture} );
    material.color.set(0xff0000);
    return debris_objects = draw(debris, texture, debris_size);
}

let tmp_info_object = {
    name: 'FENGYUN 1C DEB',
    type: 'DEBRIS',
    apogee: '891 Km',
    perigee: '841 Km',
    inclination: '99.05 deg',
    altitude: '874.59 km',
    velocity: '7.41 Km/s',
    period: '102.12 min',
}
function get_name(id) {
    let to_text = `${tmp_info_object.name}`
    return to_text;
}

function print_info(id) {
    //There should be a function exposed in script that gives this info based on the id of the debris
    let to_text = `name: ${tmp_info_object.name}
    <br>Type: ${tmp_info_object.type}
    <br>Apogee: ${tmp_info_object.apogee}
    <br>Perigee: ${tmp_info_object.perigee}
    <br>Inclination: ${tmp_info_object.inclination}
    <br>Altitude: ${tmp_info_object.altitude}
    <br>Velocity: ${tmp_info_object.velocity}
    <br>Period: ${tmp_info_object.period}
        `;
    document.getElementById('debris-info').innerHTML = to_text;
}

//MouseMove hightlight object
var mouse = new THREE.Vector2(0,0);
var raygun = new THREE.Raycaster();
var raygun2 = new THREE.Raycaster();
var useRaycast = true;
var INTERSECTED;
var prev_material;

// Raycast when we click the mouse
function MouseMove() {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var hits;
    if (useRaycast) {
        raygun.setFromCamera(mouse, camera);
        hits = raygun.intersectObjects(debris_objects, false);
    }
    const debris_name_card = document.getElementById("debris-name");
    const debris_name_container = document.getElementById("debris-mouseover-name");
    if (hits.length > 0) {
        if (INTERSECTED != hits[0].object) {
            if (INTERSECTED == null) {
                INTERSECTED = hits[0].object;
                prev_material = INTERSECTED.material;
                INTERSECTED.material = material;
                debris_name_container.style.display = "block";
                debris_name_card.innerHTML = get_name();
            }
        }
    } 
    else {
        if (INTERSECTED) {
            INTERSECTED.material = prev_material;
            debris_name_container.style.display = "none";
        }
        INTERSECTED = null;
    }
}
function onClick() {
    var hits;
    if (useRaycast) {
        raygun.setFromCamera(mouse, camera);
        hits = raygun.intersectObjects(debris_objects, false);
    }
    if (hits.length > 0) {
        move_camera_to_debri(camera, hits[0].object);
        print_info(hits[0].object.debris_id);
    }
}
function move_camera_to_debri(camera, debris) {
    const factor = 0.3;
    const targetCoordinates = {
        x: debris.position.x + factor * debris.position.x,
        y: debris.position.y + factor * debris.position.y,
        z: debris.position.z + factor * debris.position.z
    };
    const cameraCoordinates = { 
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };
    new TWEEN.Tween(cameraCoordinates)
    .to(targetCoordinates)
    .onUpdate(() => {
      camera.position.set(cameraCoordinates.x, cameraCoordinates.y, cameraCoordinates.z);
      camera.lookAt(0, 0, 0);
    })
    .start();
}

window.addEventListener('mousemove', MouseMove, false);
window.addEventListener('click', onClick, false);