//import {BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, MathUtils, Vector3, Raycaster} from 'three'

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import {camera} from './script.js';


let debris_objects = [];
export function debris(vertices, texture) {
    for (let i = 0; i < vertices.length; ++i) {
        const material = new THREE.SpriteMaterial( { map: texture} );
        material.sizeAttenuation = true;
        const sprite = new THREE.Sprite( material );
        sprite.scale.set( 0.2, 0.2, 0.2 );
        sprite.position.set(...vertices[i]);
        debris_objects.push(sprite);
    }


    return debris_objects;
}

//MouseMove hightlight object
var mouse = new THREE.Vector2(0,0);
var raygun = new THREE.Raycaster();
var raygun2 = new THREE.Raycaster();
var useRaycast = true;
var INTERSECTED;
var prev_color;

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
            if (INTERSECTED != null) {
                INTERSECTED.material.color.set(prev_color) 
            }
            INTERSECTED = hits[0].object;
            //move_camera_to_debri(camera, INTERSECTED);
            prev_color = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setHex( 0xff0000 );
        }
    } 
    else {
        if (INTERSECTED) 
            INTERSECTED.material.color.set(prev_color) 
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
