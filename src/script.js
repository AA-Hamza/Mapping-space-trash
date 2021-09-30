import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// loading
const textureLoader = new THREE.TextureLoader()
const earthTexture = textureLoader.load('textures/EarthTexture.jpg')
const earthNormalMap = textureLoader.load('textures/NormalMap.jpg')
const starsTexture = textureLoader.load('textures/8k_stars_milky_way.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(.5, 32, 32)
const sky = new THREE.SphereGeometry(90, 64, 64)

// Materials
const material = new THREE.MeshPhongMaterial()
material.map = earthTexture
material.bumpMap = earthNormalMap
material.bumpScale = 0.005
const stars = new THREE.MeshBasicMaterial()
stars.map = starsTexture
stars.side = THREE.BackSide

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)
scene.add(new THREE.Mesh(sky, stars))

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
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
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
controls.enableDamping = true

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

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()