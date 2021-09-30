import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as globe from './globe.js'

//Basic stuff
const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const earthTexture = textureLoader.load('textures/EarthTexture.jpg')
const earthNormalMap = textureLoader.load('textures/NormalMap.jpg')
const starsTexture = textureLoader.load('textures/8k_stars_milky_way.jpg'    )

// sky
const sky = new THREE.SphereGeometry(90, 64, 64)
const stars = new THREE.MeshBasicMaterial();
stars.map = starsTexture
stars.side = THREE.BackSide
scene.add(new THREE.Mesh(sky, stars))

// globe
const sphere = globe.globe(1, earthTexture, earthNormalMap);
scene.add(sphere)

// Lights
scene.add(new THREE.AmbientLight(0x333333, 5));
const light = new THREE.DirectionalLight(0xffffff, 0.15)
light.position.set(5, 3, 5);
gui.add(light, 'intensity').min(0).max(8).step(0.01)
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1.5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.rotateSpeed = 0.6;
controls.minDistance = 1.4;
controls.maxDistance = 7;


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
