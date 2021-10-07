import {SphereGeometry, MeshPhongMaterial, Mesh, ShaderMaterial, AdditiveBlending, BackSide} from 'three'
/*
function atom_fragment() {
    return `
    varying vec3 vertexNormal;
    void main() {
        float intensity = pow(0.1 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
        gl_FragColor = vec4(0.3, 0.6, 1.0, 0.5) * intensity;
    }`;
}

function atom_shader() {
    return `
    varying vec3 vertexNormal;
    void main() {
        vertexNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;
}
*/

export function globe(radius, earthTexture, earthNormalMap) {
    const geometry = new SphereGeometry(radius, 32, 32);
    geometry.rotateY(-Math.PI/2);
    const material = new MeshPhongMaterial();
    material.map = earthTexture;
    material.bumpMap = earthNormalMap;
    material.bumpScale = 0.005;
    const sphere = new Mesh(geometry,material);
    return sphere;
}


/*
export function atmosphere(radius) {
    const atmosphere_geo = new SphereGeometry(radius+2, 32, 32);
    const atmosphere_mat = new ShaderMaterial({
        vertexShader: atom_shader(),
        fragmentShader: atom_fragment(),
        blending: AdditiveBlending,
        side: BackSide,
    });
    const atmosphere_ = new Mesh(atmosphere_geo, atmosphere_mat);
    return atmosphere_;
}
*/
