import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

var modelCache = {};

export default function Avatar({ bend, setBend }) {
  let scene, camera, renderer, orbit, lights, loader, mesh;

  const mountRef = useRef(null);

  function initScene() {
    // Initialize scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x444444);

    // Initialize camera
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 5;

    // Initialize renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Set up orbit controls
    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    // Add lights to scene (still need to play around with these)
    lights = [];
    lights[0] = new THREE.DirectionalLight(0xffffff, 3);
    lights[1] = new THREE.DirectionalLight(0xffffff, 3);
    lights[2] = new THREE.DirectionalLight(0xffffff, 3);

    lights[0].position.set(0, 10, 0);
    lights[1].position.set(10, 20, 10);
    lights[2].position.set(-10, -20, -10);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    window.addEventListener("resize", () => onWindowResize(), false);
  }

  // Loading in character model
  async function loadModel() {
    loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        "/src/assets/avatar.glb",
        (gltf) => {
          scene.add(gltf.scene);
          gltf.scene.rotation.y = (3 * Math.PI) / 2;
          gltf.scene.position.y = -0.7;
          let returnedMesh =
            gltf.scene.children[0].children[0].children[0].children[1];
          for (let i = 15; i < 18; i++) {
            returnedMesh.skeleton.bones[i].rotation.x =
              bend / returnedMesh.skeleton.bones.length;
          }
          modelCache["model"] = gltf.scene;
          resolve(modelCache["model"]);
        },
        (xhr) => {},
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  function render() {
    requestAnimationFrame(render);

    for (let i = 15; i < 18; i++) {
      mesh.skeleton.bones[i].rotation.x = bend / mesh.skeleton.bones.length; // -49 < x < 41
    }

    mesh.skeleton.update();

    mesh.updateMatrixWorld(true);

    renderer.render(scene, camera);
  }

  // Window resize listener
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function flexion() {
    setBend((prevBend) => prevBend + 1);
  }

  function extension() {
    setBend((prevBend) => prevBend - 1);
  }

  function resetModel() {
    setBend(4);
  }

  function resetCamera() {
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);
  }

  useEffect(() => {
    (async () => {
      initScene();

      if (modelCache["model"]) {
        mesh =
          modelCache["model"].children[0].children[0].children[0].children[1];
        scene.add(modelCache["model"]);
      } else {
        await loadModel()
          .then((loadedModel) => {
            mesh = loadedModel.children[0].children[0].children[0].children[1];
          })
          .catch((error) => {
            console.error("Error occurred loading mesh", error);
          });
      }

      render();
    })();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [bend]);

  return (
    <div>
      <div className="avatar-control-panel">
        <button onClick={flexion}>Flex</button>
        <button onClick={extension}>Extend</button>
        <button onClick={resetModel}>Reset Model</button>
        <button onClick={resetCamera}>Reset Camera</button>
      </div>
      <div ref={mountRef}></div>;
    </div>
  );
}
