import * as THREE from 'three';
import { camera, cubeGroup, scene } from './main.js';

let isDragging = false;
let startPos = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let selectedCubie = null;

// Handle Touch for iPad
window.addEventListener('touchstart', (e) => handleStart(e.touches[0]));
window.addEventListener('mousedown', (e) => handleStart(e));

function handleStart(e) {
    let mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubeGroup.children);
    if (intersects.length > 0) {
        isDragging = true;
        selectedCubie = intersects[0].object;
        startPos.set(e.clientX, e.clientY);
    }
}

window.addEventListener('touchend', (e) => handleEnd(e.changedTouches[0]));
window.addEventListener('mouseup', (e) => handleEnd(e));

function handleEnd(e) {
    if (!isDragging || !selectedCubie) return;
    const diffX = e.clientX - startPos.x;
    const diffY = e.clientY - startPos.y;

    if (Math.abs(diffX) > 30) {
        rotateLayer('y', Math.round(selectedCubie.position.y));
    } else if (Math.abs(diffY) > 30) {
        rotateLayer('x', Math.round(selectedCubie.position.x));
    }
    isDragging = false;
    selectedCubie = null;
}

function rotateLayer(axis, pos) {
    const group = new THREE.Group();
    scene.add(group);
    const pieces = cubeGroup.children.filter(c => Math.round(c.position[axis]) === pos);
    pieces.forEach(p => group.attach(p));
    group.rotation[axis] += Math.PI / 2;
    group.updateMatrixWorld();
    pieces.forEach(p => cubeGroup.attach(p));
    scene.remove(group);
}
