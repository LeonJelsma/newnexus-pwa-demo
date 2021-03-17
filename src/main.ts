import {Engine} from "./engine"
import {TestStage} from "./stages/teststage";
import './style.css';

const engine = Engine.getInstance()

function animate(): void {
    requestAnimationFrame(animate);
    engine.render();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(reg => {
            reg.onupdatefound = () => {
                const installingWorker = reg.installing;
                installingWorker.onstatechange = () => {
                    switch (installingWorker.state) {
                        case 'installed':
                            if (navigator.serviceWorker.controller) {
                                // update available
                            } else {
                                // no update available
                            }
                            break;
                    }
                };
            };
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
engine.load_stage(new TestStage())
animate()

