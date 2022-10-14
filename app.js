let container;
let camera;
let renderer;
let scene;
let astro;

function init() {
    container = document.querySelector('.scene');

    // Create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 5000;


    // Camera Setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 200, 4000);

    const ambient = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambient)

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-0.5, 1, 0.5);
    scene.add(light);

    // REnderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);


    // Load model
    let loader = new THREE.GLTFLoader();
    loader.load('./astro/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        astro = gltf.scene.children[0];
        animate();
    });
}

function animate() {
    requestAnimationFrame(animate)
    astro.rotation.z += 0.005;
    renderer.render(scene, camera);
}

init();

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);

// Background
const white = '#ffffff';
const root = document.documentElement;

root.style.setProperty("--small", boxShadows(600, 2, white));
root.style.setProperty("--medium", boxShadows(300, 2, white));
root.style.setProperty("--large", boxShadows(100, 2, white));

function boxShadows(number, blur, color) {
    let value = '';
    const size = Math.max(window.innerHeight, window.innerWidth);
    for (let i = 0; i < number; i++) {
        let a = Math.floor(Math.random() * size);
        let b = Math.floor(Math.random() * size);
        value += `${a}px ${b}px ${blur}px ${color}, `;
    }
    return value.slice(0, value.length - 2);
}