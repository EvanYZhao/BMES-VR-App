import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Avatar() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Initialize scene
    var scene = new THREE.Scene();

    // Initialize camera
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Initialize renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add lights to scene (still need to play around with these)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 32, 0);
    scene.add(directionalLight);
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Set up orbit controls
    var controls = new OrbitControls(camera, renderer.domElement);

    // Load model
    let mixer;
    const loader = new GLTFLoader();
    loader.load(
      "/src/assets/animals.glb",
      (gltf) => {
        scene.add(gltf.scene);

        mixer = new THREE.AnimationMixer(gltf.scene);
        const clips = gltf.animations;
        clips.forEach(function (clip) {
          const action = mixer.clipAction(clip);
          action.play();
        });

        camera.position.z = 4;
      },
      (xhr) => {
        // Log progress while loading
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        // If there is error, log it into console
        console.error(error);
      }
    );

    // Animate function
    const clock = new THREE.Clock();
    var animate = function () {
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // Window resize listener
    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", () => onWindowResize(), false);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
}
