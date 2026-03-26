import * as THREE from 'three';
import { camera, cubeGroup } from './main.js';

let isDragging = false;
let startX, startY;

window.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;

    if (Math.abs(diffX) > 20 || Math.abs(diffY) > 20) {
        // Logic for turning layers or rotating camera goes here
        console.log("Swipe detected!");
    }
    isDragging = false;
});
