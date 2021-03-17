import * as THREE from "three";


export const TestShader = new THREE.ShaderMaterial({
        vertexShader: `
  varying vec2 v_uv;
  void main() {
     v_uv = uv;
     gl_Position = projectionMatrix * modelViewMatrix *    vec4(position, 1.0);
}`,
        fragmentShader: `
  varying vec2 v_uv;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_time;
void main() {
    vec2 v = u_mouse / u_resolution;
    vec2 uv = gl_FragCoord.xy / u_resolution;
    gl_FragColor = vec4(1.0, 0.0, sin(u_time * 5.0) + 0.5, 1.0).rgba;
}
`,
        uniforms: {
            u_mouse: {value: {x: window.innerWidth / 2, y: window.innerHeight / 2}},
            u_resolution: {value: {x: window.innerWidth, y: window.innerHeight}},
            u_time: {value: 0.0},
            u_color: {value: new THREE.Color(0xFF0000)}
        }
    }
);
