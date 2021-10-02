import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as globe from './globe.js'
import * as debris_handler from './debris_handler.js'
import {get_slider_value} from './slider'
import * as TWEEN from "@tweenjs/tween.js";

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
const debrisTexture = textureLoader.load('textures/circle.png')

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
export const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.01, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1.5
scene.add(camera)


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
    random_debris.push([i, x, y, z])
}
// Debris should be passed with ([ [debris_id, x, y, z], ...], Texture to draw)
const debris_objects = debris_handler.draw_debris(random_debris, debrisTexture);
scene.add(...debris_objects);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//Animation
function tick (time) {
    controls.update()
    renderer.render(scene, camera)
    TWEEN.update(time);
    requestAnimationFrame(tick);
}

tick(0);