import { Scene, WebGLRenderer, PerspectiveCamera, AmbientLight, PlaneGeometry, ShaderMaterial, Mesh, SRGBColorSpace } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import vertexShader from './shaders/vertex.vert';
import fragmentShader from './shaders/fragment.frag';

export class Experience {

    /**
     * 
     * @param { HTMLCanvasElement } canvasEl 
     */
    constructor(canvasEl) {
        this.container = canvasEl;
        this.width = canvasEl.clientWidth;
        this.height = canvasEl.clientHeight;
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({
            canvas: canvasEl
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000, 1.0);
        
        // Camera
        this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 100);
        this.camera.position.set(0, 0, 2);
        this.scene.add(this.camera);

        this.controls = new OrbitControls(this.camera, this.container);
        
        this.isRunning = false;

        const ambientLight = new AmbientLight();
        this.scene.add(ambientLight);

        this.setupResize();
        this.addObjects();
    }

    _tick() {
        this.controls.update();

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this._tick.bind(this));
    }

    resize() {
        this.container.width = window.innerWidth;
        this.container.height = window.innerHeight;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(this.width / this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    addObjects() {
        const planeGeometry = new PlaneGeometry(1, 1, 32, 32);
        const material = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        const mesh = new Mesh(planeGeometry, material);
        this.scene.add(mesh);
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this._tick();
    }
}