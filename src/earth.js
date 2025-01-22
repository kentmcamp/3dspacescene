function threejs() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10);
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);

    // Add light
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, -50, -50);
    light.castShadow = true;
    scene.add(light);

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 50;
    light.shadow.darkness = 0.1;

    // Create pivot group for Moon's orbit
    var pivot = new THREE.Group();
    scene.add(pivot);

    getSphere(1, 64, 64, 'src/images/planetTexture2.jpg', function (planet) {
        planet.castShadow = true;
        planet.receiveShadow = true;
        scene.add(planet);

        getSphere(0.1, 32, 32, 'src/images/moonTexture.jpg', function (moon) {
            moon.position.set(1.75, 0, 0);
            pivot.add(moon);

            camera.position.set(1.4, -0.2, 2);

            function animate() {
                requestAnimationFrame(animate);
                planet.rotation.y -= 0.001;
                pivot.rotation.y -= 0.002;
                moon.lookAt(planet.position);
                renderer.render(scene, camera);
            }
            animate();
        });
    });
}

function getSphere(w, h, d, texture, onLoadCallback) {
    var geometry = new THREE.SphereGeometry(w, h, d);
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load(texture, function (texture) {
        var material = new THREE.MeshStandardMaterial({ map: texture });
        var sphere = new THREE.Mesh(geometry, material);
        onLoadCallback(sphere);
    });
}

threejs();
