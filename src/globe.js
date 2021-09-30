import {SphereGeometry, MeshPhongMaterial, Mesh} from 'three'

export function globe(radius, earthTexture, earthNormalMap) {
    const geometry = new SphereGeometry(radius, 32, 32);
    const material = new MeshPhongMaterial();
    material.map = earthTexture;
    material.bumpMap = earthNormalMap;
    material.bumpScale = 0.005;
    const sphere = new Mesh(geometry,material);
    return sphere;
}
