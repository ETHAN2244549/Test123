import * as THREE from 'three';

// Setup Scene & Camera
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the Cube Group
export const cubeGroup = new THREE.Group();
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
            const material = new THREE.MeshNormalMaterial();
            const cubie = new THREE.Mesh(geometry, material);
            cubie.position.set(x, y, z);
            cubeGroup.add(cubie);
        }
    }
}
scene.add(cubeGroup);

// Default View Function
const homePos = { x: 3, y: 3, z: 5 };
export function resetView() {
    camera.position.set(homePos.x, homePos.y, homePos.z);
    camera.lookAt(0, 0, 0);
}
resetView();
document.getElementById('reset-view').onclick = resetView;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
