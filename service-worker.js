/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-4b5c23d1'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/android-chrome-144x144.png",
    "revision": "b7bbbeb0f69cb7150da5c44a861b94a2"
  }, {
    "url": "assets/android-chrome-192x192.png",
    "revision": "8fbc92b4fa4411379208dba9bb4ba609"
  }, {
    "url": "assets/android-chrome-256x256.png",
    "revision": "25f3efdb32afa6591f9829e7add24248"
  }, {
    "url": "assets/android-chrome-36x36.png",
    "revision": "b44df432d4d6bc14f4ddbb8d77108ce7"
  }, {
    "url": "assets/android-chrome-384x384.png",
    "revision": "879df34302df84ce222fcc547f07b651"
  }, {
    "url": "assets/android-chrome-48x48.png",
    "revision": "0d117c7a6b076af28f5247de7525d7ad"
  }, {
    "url": "assets/android-chrome-512x512.png",
    "revision": "4f5199aa041abfbe311623b26a2b6fdc"
  }, {
    "url": "assets/android-chrome-72x72.png",
    "revision": "38303aef7405c955a5d720800d0baa56"
  }, {
    "url": "assets/android-chrome-96x96.png",
    "revision": "1963b7900607b42a92b369e175f9ab7f"
  }, {
    "url": "assets/apple-touch-icon-1024x1024.png",
    "revision": "38aad067feb0bc9735a6bb82d25d79f4"
  }, {
    "url": "assets/apple-touch-icon-114x114.png",
    "revision": "d710cec4d32eaabebbdc1dbcd49a84d1"
  }, {
    "url": "assets/apple-touch-icon-120x120.png",
    "revision": "fa8a639bd6575a6e5fbbae8fc11f16df"
  }, {
    "url": "assets/apple-touch-icon-144x144.png",
    "revision": "466147c3d98a12966c44029cbcd0e531"
  }, {
    "url": "assets/apple-touch-icon-152x152.png",
    "revision": "b948dea7eba1f1187c452bb35d2c0150"
  }, {
    "url": "assets/apple-touch-icon-167x167.png",
    "revision": "1af9ab1208360b42ed3404a5f5c2cd0f"
  }, {
    "url": "assets/apple-touch-icon-180x180.png",
    "revision": "83873422c4a0b902991e383e25b369fd"
  }, {
    "url": "assets/apple-touch-icon-57x57.png",
    "revision": "a71d0a6de8470a591823938c7b296573"
  }, {
    "url": "assets/apple-touch-icon-60x60.png",
    "revision": "f272ba3227aa2fecaac8cc8537244333"
  }, {
    "url": "assets/apple-touch-icon-72x72.png",
    "revision": "5a4a353f624457cd7dadec9cc552a550"
  }, {
    "url": "assets/apple-touch-icon-76x76.png",
    "revision": "f2bd10bec80b065b5f0a7a6f87cb8bf7"
  }, {
    "url": "assets/apple-touch-icon-precomposed.png",
    "revision": "83873422c4a0b902991e383e25b369fd"
  }, {
    "url": "assets/apple-touch-icon.png",
    "revision": "83873422c4a0b902991e383e25b369fd"
  }, {
    "url": "assets/apple-touch-startup-image-1125x2436.png",
    "revision": "d522aa6fc0411169e61b5ca40bb7bce5"
  }, {
    "url": "assets/apple-touch-startup-image-1136x640.png",
    "revision": "e544f18970d8dfaf389c955fad52bb75"
  }, {
    "url": "assets/apple-touch-startup-image-1242x2208.png",
    "revision": "41143ea325e2e7d561e879e0d960b8ca"
  }, {
    "url": "assets/apple-touch-startup-image-1242x2688.png",
    "revision": "723a3b446a689ef8fa356f1eeabb4ea6"
  }, {
    "url": "assets/apple-touch-startup-image-1334x750.png",
    "revision": "35738c99cc962cfdc4476436e495dd86"
  }, {
    "url": "assets/apple-touch-startup-image-1536x2048.png",
    "revision": "9f8f3955f10f179fab7b9c42f288b5df"
  }, {
    "url": "assets/apple-touch-startup-image-1620x2160.png",
    "revision": "00082bc3a6bcc7cc73290d07996e68a8"
  }, {
    "url": "assets/apple-touch-startup-image-1668x2224.png",
    "revision": "565a6abd447369809339fdf53c0b9f16"
  }, {
    "url": "assets/apple-touch-startup-image-1668x2388.png",
    "revision": "418437447e33f7721a51b954ce5b7e69"
  }, {
    "url": "assets/apple-touch-startup-image-1792x828.png",
    "revision": "f085e5dbf8f55bc069605e1bb52c8184"
  }, {
    "url": "assets/apple-touch-startup-image-2048x1536.png",
    "revision": "c390b8d9b8b5c2a5cf650df5659003e0"
  }, {
    "url": "assets/apple-touch-startup-image-2048x2732.png",
    "revision": "d7f2c4eef27d2d0c4a347e697d2639c7"
  }, {
    "url": "assets/apple-touch-startup-image-2160x1620.png",
    "revision": "e9a84e77bd97135cb0501f9f2c46eb82"
  }, {
    "url": "assets/apple-touch-startup-image-2208x1242.png",
    "revision": "3a794088163478304620f5b76a54bb22"
  }, {
    "url": "assets/apple-touch-startup-image-2224x1668.png",
    "revision": "9705e9d00ad4dd9329f548146178a526"
  }, {
    "url": "assets/apple-touch-startup-image-2388x1668.png",
    "revision": "fcbdd1cc10b69b102bcf50a1afe4dd66"
  }, {
    "url": "assets/apple-touch-startup-image-2436x1125.png",
    "revision": "bb15bf6fee8d9ec107ee047fe3d2cefd"
  }, {
    "url": "assets/apple-touch-startup-image-2688x1242.png",
    "revision": "7cf3586537c573c98ac7910b6d3f134e"
  }, {
    "url": "assets/apple-touch-startup-image-2732x2048.png",
    "revision": "c93d4c25213c07ca5945dd720f8f86e4"
  }, {
    "url": "assets/apple-touch-startup-image-640x1136.png",
    "revision": "375a43c489c2118db183e577d927238c"
  }, {
    "url": "assets/apple-touch-startup-image-750x1334.png",
    "revision": "16aeb746fc1d334ab92531f1f9d32881"
  }, {
    "url": "assets/apple-touch-startup-image-828x1792.png",
    "revision": "e7c07475f605ca510a252c0789e1f4c0"
  }, {
    "url": "assets/browserconfig.xml",
    "revision": "6b9febff1eb49f1662476afc3e8c6d77"
  }, {
    "url": "assets/coast-228x228.png",
    "revision": "c0036c60071fc900fdf02af5e68d55c5"
  }, {
    "url": "assets/favicon-16x16.png",
    "revision": "7348a312ee2d7ca886465f50e0ab424c"
  }, {
    "url": "assets/favicon-32x32.png",
    "revision": "a64f0432402a45a7288a341a38507147"
  }, {
    "url": "assets/favicon-48x48.png",
    "revision": "0d117c7a6b076af28f5247de7525d7ad"
  }, {
    "url": "assets/favicon.ico",
    "revision": "9d8c7635f2da9a5c769364adcc9c5e5c"
  }, {
    "url": "assets/firefox_app_128x128.png",
    "revision": "b7edb83bf285682fdbccc8a20df2d2e3"
  }, {
    "url": "assets/firefox_app_512x512.png",
    "revision": "578a452317774504bc730e668bf94405"
  }, {
    "url": "assets/firefox_app_60x60.png",
    "revision": "e117cc51f4b4d9c87983c11a7c8a782c"
  }, {
    "url": "assets/manifest.json",
    "revision": "3002d7611e8ff777001e6f7062063811"
  }, {
    "url": "assets/manifest.webapp",
    "revision": "93856abaf64ec33af23fc8623395c305"
  }, {
    "url": "assets/mstile-144x144.png",
    "revision": "b7bbbeb0f69cb7150da5c44a861b94a2"
  }, {
    "url": "assets/mstile-150x150.png",
    "revision": "614a4bbd0926bab4781a2ea3f63f280b"
  }, {
    "url": "assets/mstile-310x150.png",
    "revision": "59f8bf160e92dc2a6e508e3ad027fe4b"
  }, {
    "url": "assets/mstile-310x310.png",
    "revision": "d990772e76d36d37efc5dbf6bf25464c"
  }, {
    "url": "assets/mstile-70x70.png",
    "revision": "3f0e2f4478bb0f2847fa14e8a78a6156"
  }, {
    "url": "assets/yandex-browser-50x50.png",
    "revision": "f75b3cbe450784ecc426c0a1cd07d1b7"
  }, {
    "url": "assets/yandex-browser-manifest.json",
    "revision": "1fa786b96e710d40404b454e3f54141c"
  }, {
    "url": "bundle.js",
    "revision": "7dc5fcd64057c3bebd583980294f5644"
  }, {
    "url": "index.html",
    "revision": "a4fc9a3e15f55012a421265ddb617358"
  }, {
    "url": "resources/models/new_nexus.glb",
    "revision": "20b7b20e26dc0314c9c8296fa2b85643"
  }, {
    "url": "resources/models/nn2.glb",
    "revision": "1f4c49480aec19fd459d52008df86a84"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
