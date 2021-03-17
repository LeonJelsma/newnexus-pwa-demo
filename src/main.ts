
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(reg => {
            reg.onupdatefound = () => {
                const installingWorker = reg.installing;
                installingWorker.onstatechange = () => {
                    switch (installingWorker.state) {
                        case 'installed':
                            if (navigator.serviceWorker.controller) {
                                // new update available
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

