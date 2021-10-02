import * as THREE from 'three';
import {camera} from './script.js';
import {draw} from './debris.js';

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
    if (hits.length > 0) {
        if (INTERSECTED != hits[0].object) {
            if (INTERSECTED == null) {
                INTERSECTED = hits[0].object;
                prev_material = INTERSECTED.material;
                INTERSECTED.material = material;
            }
            //prev_color = INTERSECTED.material.color.getHex();
            //INTERSECTED.material.color.setHex( 0xff0000 );
        }
    } 
    else {
        if (INTERSECTED) 
            INTERSECTED.material = prev_material;
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
    }
}
function move_camera_to_debri(camera, debrie) {
    const x = debrie.position.x;
    const y = debrie.position.y;
    const z = debrie.position.z;
    //const new_position = new THREE.Vector3(x, y, z);
    //camera.position.lerp(new_position, 0.2);
    camera.position.x = x+(0.3)*x;
    camera.position.y = y+(0.3)*y;
    camera.position.z = z+(0.3)*z;
    camera.lookAt(0, 0, 0);
}

window.addEventListener('mousemove', MouseMove, false);
window.addEventListener('click', onClick, false);
