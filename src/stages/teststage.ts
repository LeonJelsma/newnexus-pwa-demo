import {Stage} from "../stage";
import {Light, Object3D, PerspectiveCamera} from "three";
import * as THREE from "three";
import {TestShader} from "../shaders";
import {Engine} from "../engine";
import isMobile from "is-mobile";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

export class TestStage implements Stage{
    camera: PerspectiveCamera;
    lights: Light[];
    objects: Object3D[];
    controls: any;
    box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), TestShader);
    logo: GLTF;
    yModifier = 0.01;
    xModifier = 0.01;

    constructor() {
        const scope = this;
        const engine = Engine.getInstance()
        this.objects = [];
        this.lights = [];
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        if (isMobile()){
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera.position.z = 45;
        } else {
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera.position.z = 15;
        }

        const light = new THREE.DirectionalLight(0xffffff, 1.0);
        const light2 = new THREE.DirectionalLight(0xffffff, 1.0);

        light.position.set(100, 100, 100);
        this.lights.push(light);

        light2.position.set(-100, 100, -100);
        this.lights.push(light2);

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 15;

        window.addEventListener( 'resize',() => this.onWindowResize(this.camera), false );


        engine.load_gltf("resources/models/new_nexus.glb").then(function (model: GLTF) {
            engine.scene.add(model.scene)
            model.scene.position.x = 0;
            model.scene.position.y = 0;
            model.scene.position.z = 0;
            scope.logo = model;
        });

        this.camera.lookAt(0,0,0);

        const horizontalSpinButton = document.getElementById("horizontal-spin")
        horizontalSpinButton.addEventListener("click", (e:Event) => {
            if (this.yModifier != 0) {
                this.yModifier = 0;
            } else {
                this.yModifier = 0.01;
            }
        });


        const verticalSpinButton = document.getElementById("vertical-spin")
        verticalSpinButton.addEventListener("click", (e:Event) => {
            if (this.xModifier != 0) {
                this.xModifier = 0;
            } else {
                this.xModifier = 0.01;
            }
        });

        const resetButton = document.getElementById("reset-model")
        resetButton.addEventListener("click", (e:Event) => {
            this.logo.scene.rotation.x = 0;
            this.logo.scene.rotation.y = 0;
        });


        document.addEventListener("keydown", this.move_box);
        window.addEventListener("deviceorientation", this.handle_orientation, true);
    }

    onWindowResize(camera: PerspectiveCamera) {
        const engine = Engine.getInstance();
        engine.renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    handle_orientation(event: DeviceOrientationEvent) {
        //console.log(event)
    }


    private move_box = (event: KeyboardEvent) => {
        switch (event.code) {
            case "KeyA":
                this.box.position.x += 1;
                this.camera.position.x += 1;
                break;
            case "KeyD":
                this.box.position.x -= 1;
                this.camera.position.x -= 1;
                break;
            case "KeyW":
                this.box.position.y += 1;
                this.camera.position.y += 1;
                break;
            case "KeyS":
                this.box.position.y -= 1;
                this.camera.position.y -= 1;
                break;
        }
    }

    tick(): void {
        if (this.logo) {
            this.logo.scene.rotation.x += this.xModifier;
            this.logo.scene.rotation.y += this.yModifier;
        }
        TestShader.uniforms.u_time.value += 0.008;
        this.camera.lookAt(Engine.getInstance().scene.position);
        //this.camera.lookAt(this.box.position);
    }
}
