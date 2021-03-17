import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Stage} from "./stage";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Clock, Object3D, PMREMGenerator, WebGLCubeRenderTarget} from "three";
import {EXRLoader} from "three/examples/jsm/loaders/EXRLoader";

export class Engine {

    private static instance: Engine;

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    stage: Stage = null;
    clock = new Clock()

    GLTFLoader = new GLTFLoader();
    material = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        wireframe: true,
    });

    constructor() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    public static getInstance(): Engine {
        if (!Engine.instance) {
            Engine.instance = new Engine();
        }
        return Engine.instance;
    }

    async load_gltf(model: string): Promise<GLTF> {
        const result = await this.GLTFLoader.loadAsync(model, undefined);
        return result;
    }

    load_stage(stage: Stage) {
        this.stage = stage;
        this.scene.clear();
        this.scene.add(stage.camera)
        for (const object of stage.objects) {
            this.scene.add(object)
        }
        for (const light of stage.lights) {
            this.scene.add(light)
        }
    }

    async add_sky_dome(): Promise<void> {
        const scope = this;
        new EXRLoader()
            .setDataType(THREE.FloatType)
            .load('resources/textures/background.exr', function (texture) {

                texture.minFilter = THREE.NearestFilter;
                // texture.magFilter = THREE.NearestFilter;
                texture.encoding = THREE.LinearEncoding;


                var cubeMapTexture = new WebGLCubeRenderTarget(256,
                    {
                        format: THREE.RGBFormat,
                        generateMipmaps: true,
                        minFilter: THREE.LinearMipmapLinearFilter,
                        encoding: THREE.sRGBEncoding
                    }
                ).fromEquirectangularTexture(scope.renderer, texture);

                scope.scene.background = cubeMapTexture

            });
    }

    render(): void {
        this.stage.tick();
        this.renderer.render(this.scene, this.stage.camera);
    }

}
