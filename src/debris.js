import * as THREE from 'three';

export function draw(vertices, texture, scale) {
    let debris_objects = [];
    // I am making them all the same material and when clicked I will just create a new one, that should quite a space
    const material = new THREE.SpriteMaterial( { map: texture} );
    material.needsUpdate = false;
    for (let i = 0; i < vertices.length; ++i) {
        const sprite = new THREE.Sprite( material );
        sprite.scale.set(scale, scale, scale);
        sprite.position.set(vertices[i][1], vertices[i][2], vertices[i][3]);
        sprite["debris_id"] = vertices[i][0];
        debris_objects.push(sprite);
    }
    return debris_objects;
}
