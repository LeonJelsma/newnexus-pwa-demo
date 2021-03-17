import {Camera, Light, Object3D, PerspectiveCamera} from "three";

export interface Stage{
    camera: PerspectiveCamera;
    lights: Light[];
    objects: Object3D[];
    tick(): void;
}


