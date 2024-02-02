import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

var modelCache = {};

export default function Avatar({ bend, setBend }) {

   const [degrees, setDegrees] = useState(0);

   function scaleDegrees(degrees) {
      let newDegrees = degrees + 4;
      setDegrees(newDegrees-4);
      return newDegrees;
   }


   let scene, camera, renderer, orbit, lights, loader, mesh;

   const state = { animateBones: false };

   const mountRef = useRef(null);

   console.log(degrees)

   function initScene() {
      // Initialize scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x444444);

      // Initialize camera
      camera = new THREE.PerspectiveCamera(
         45,
         window.innerWidth / 3.3 / (window.innerHeight / 2),
         0.1,
         200
      );
      camera.position.z = 3;

      // Initialize renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth / 3.3, window.innerHeight / 2);
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
               gltf.scene.position.y = -0.9;
               let returnedMesh =
                  gltf.scene.children[0].children[0].children[0].children[1];
               for (let i = 15; i < 18; i++) {
                  returnedMesh.skeleton.bones[i].rotation.x =
                     bend / returnedMesh.skeleton.bones.length;
               }
               // Left arm
               returnedMesh.skeleton.bones[19].rotation.z = 5.1;
               returnedMesh.skeleton.bones[20].rotation.x = 0;

               // Right arm
               returnedMesh.skeleton.bones[44].rotation.z = -5.1;
               returnedMesh.skeleton.bones[45].rotation.x = 0;
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

      let factor = Math.sin(Date.now() * 0.001);

      if (state.animateBones) {
         if (factor < 0) {
            setBend(30 * factor);
         } else {
            setBend(41 * factor);
         }
      }

      for (let i = 15; i < 18; i++) {
         mesh.skeleton.bones[i].rotation.x = bend / mesh.skeleton.bones.length; // -30 < x < 41
      }

      mesh.skeleton.update();

      mesh.updateMatrixWorld(true);

      renderer.render(scene, camera);
   }

   function flexion() {
      if(degrees < 180){
         setBend((prevBend) => prevBend + 0.43);
         setDegrees(degrees => degrees + 1);
      }
   }

   function extension() {
      if(degrees > -90){
         setBend((prevBend) => prevBend - 0.43);
         setDegrees(degrees => degrees - 1);
      }
   }

   function resetModel() {
      setBend(scaleDegrees(0));
   }

   function resetCamera() {
      camera.position.set(0, 0, 3);
      camera.rotation.set(0, 0, 0);
   }

   function onWindowResize() {
      var new_width = window.innerWidth / 3.3;
      var new_height = window.innerHeight / 2;
      camera.aspect = new_width / new_height;
      renderer.setSize(new_width, new_height);
      camera.updateProjectionMatrix();
   }

   useEffect(() => {
      window.addEventListener("resize", onWindowResize, false);
      (async () => {
         initScene();

         if (modelCache["model"]) {
            mesh =
               modelCache["model"].children[0].children[0].children[0]
                  .children[1];
            scene.add(modelCache["model"]);
         } else {
            await loadModel()
               .then((loadedModel) => {
                  mesh =
                     loadedModel.children[0].children[0].children[0]
                        .children[1];
               })
               .catch((error) => {
                  console.error("Error occurred loading mesh", error);
               });
         }

         render();
      })();

      // Clean up on component unmount
      return () => {
         renderer.dispose();
         if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
         }
         window.removeEventListener("resize", onWindowResize, false);
      };
   }, [bend]);

   return (
      <div className="avatar-container">
         <h1>{degrees} degrees</h1>
         <div className="avatar-control-panel">
            <button onClick={flexion}>Flex</button>
            <button onClick={extension}>Extend</button>
            <button onClick={resetModel}>Reset Model</button>
            <button onClick={resetCamera}>Reset Camera</button>
         </div>
         <div ref={mountRef}></div>
      </div>
   );
}
