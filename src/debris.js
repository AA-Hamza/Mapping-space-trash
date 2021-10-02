import * as THREE from 'three';

export function draw(vertices, texture, scale) {
    let debris_objects = [];
    // I am making them all the same material and when clicked I will just create a new one, that should quite a space
    const material = new THREE.SpriteMaterial( { map: texture} );
    for (let i = 0; i < vertices.length; ++i) {
        const sprite = new THREE.Sprite( material );
        sprite.scale.set(scale, scale, scale);
        sprite.position.set(vertices[i][1], vertices[i][2], vertices[i][3]);
        sprite["debris_id"] = vertices[i][0];
        debris_objects.push(sprite);
    }
    return debris_objects;
}

export function drawPath(scene, xRadius, yRadius, rotationAngle = 0, startAngle = 0, endAngle = 2 * Math.PI, color = 0xff0000) {
    var curve = new THREE.EllipseCurve(
        0, 0,             
        xRadius, yRadius,
        startAngle, endAngle,
        false,
        0         
    );
    var points = curve.getSpacedPoints( 100 );
    var line = new THREE.Line(new THREE.BufferGeometry().setFromPoints( points ), new THREE.LineBasicMaterial({ color: color }));
    line.rotation.y += rotationAngle
    scene.add(line);
}
