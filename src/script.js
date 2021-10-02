import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as globe from './globe.js'
import * as debris from './debris.js'


//CONSTANTS
const EARTH_RADIUS = 10;

//Basic stuff
const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const earthTexture = textureLoader.load('textures/EarthTexture.jpg')
const earthNormalMap = textureLoader.load('textures/NormalMap.jpg')
const starsTexture = textureLoader.load('textures/8k_stars_milky_way.jpg')
const debrisTexture = textureLoader.load('textures/shiphull.jpg')

// sky
const sky = new THREE.SphereGeometry(90, 64, 64)
const stars = new THREE.MeshBasicMaterial();
stars.map = starsTexture
stars.side = THREE.BackSide
scene.add(new THREE.Mesh(sky, stars))

// globe
const sphere = globe.globe(EARTH_RADIUS, earthTexture, earthNormalMap);
scene.add(sphere)

// Lights
scene.add(new THREE.AmbientLight(0x333333, 5));
const light = new THREE.DirectionalLight(0xffffff, 0.15)
light.castShadow = true;

light.position.set(100, 100, 0).normalize();
gui.add(light, 'intensity').min(0).max(8).step(0.01)
gui.add(light.position, 'x')
gui.add(light.position, 'y')
gui.add(light.position, 'z')
scene.add(light)

//Canvas Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.01, 1000)
const debris_camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.01, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1.5
scene.add(camera)
function move_camera_to_debri(camera, debrie) {
    const x = debrie.position.x;
    const y = debrie.position.y;
    const z = debrie.position.z;
    camera.position.x = x+(0.2)*x;
    camera.position.y = y+(0.2)*y;
    camera.position.z = z+(0.2)*z;
    camera.lookAt(0, 0, 0);
}


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.rotateSpeed = 0.6;
controls.minDistance = EARTH_RADIUS+1;
controls.maxDistance = 10*EARTH_RADIUS;

//debris
let random_debris = []
for (let i = 0; i < 400; ++i) {
    let x = 40*Math.random()-20;
    let y = 40*Math.random()-20;
    let z = 40*Math.random()-20;
    random_debris.push([x, y, z])
}
const debris_objects = debris.debris(random_debris, debrisTexture);
scene.add(...debris_objects);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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

window.addEventListener('mousemove', MouseMove, false);
window.addEventListener('click', onClick, false);

//Animation
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
