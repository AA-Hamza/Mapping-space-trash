//import {BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, MathUtils, Vector3, Raycaster} from 'three'

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';

export function debris(vertices, texture) {
    //const map = new THREE.TextureLoader().load( '/textures/disc.png' );

    let debris_objects = [];
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
