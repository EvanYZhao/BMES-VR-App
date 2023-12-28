import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function Cylinder() {
  let scene, camera, renderer, orbit, lights, mesh, bones, skeletonHelper;

  const cylRef = useRef(null);

  const [bend, setBend] = useState(0);

  function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x444444);

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 90;
    camera.position.y = 0;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    cylRef.current.appendChild(renderer.domElement);

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    lights = [];
    lights[0] = new THREE.DirectionalLight(0xffffff, 3);
    lights[1] = new THREE.DirectionalLight(0xffffff, 3);
    lights[2] = new THREE.DirectionalLight(0xffffff, 3);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    window.addEventListener("resize", () => onWindowResize(), false);

    initBones();
  }

  function initBones() {
    const segmentHeight = 8;
    const segmentCount = 4;
    const height = segmentHeight * segmentCount;
    const halfHeight = height * 0.5;

    const sizing = {
      segmentHeight: segmentHeight,
      segmentCount: segmentCount,
      height: height,
      halfHeight: halfHeight,
    };

    const geometry = createGeometry(sizing);
    const bones = createBones(sizing);
    mesh = createMesh(geometry, bones);

    mesh.scale.multiplyScalar(1);
    scene.add(mesh);
  }

  function createGeometry(sizing) {
    const geometry = new THREE.CylinderGeometry(
      5, // radiusTop
      5, // radiusBottom
      sizing.height, // height
      8, // radiusSegments
      sizing.segmentCount * 3, // heightSegments
      true // openEnded
    );

    const position = geometry.attributes.position;

    const vertex = new THREE.Vector3();

    const skinIndices = [];
    const skinWeights = [];

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);

      const y = vertex.y + sizing.halfHeight;

      const skinIndex = Math.floor(y / sizing.segmentHeight);
      const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

      skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
      skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
    }

    geometry.setAttribute(
      "skinIndex",
      new THREE.Uint16BufferAttribute(skinIndices, 4)
    );
    geometry.setAttribute(
      "skinWeight",
      new THREE.Float32BufferAttribute(skinWeights, 4)
    );

    return geometry;
  }

  function createBones(sizing) {
    bones = [];

    let prevBone = new THREE.Bone();
    bones.push(prevBone);
    prevBone.position.y = -sizing.halfHeight;

    for (let i = 0; i < sizing.segmentCount; i++) {
      const bone = new THREE.Bone();
      bone.position.y = sizing.segmentHeight;
      bones.push(bone);
      prevBone.add(bone);
      prevBone = bone;
    }

    return bones;
  }

  function createMesh(geometry, bones) {
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });

    const mesh = new THREE.SkinnedMesh(geometry, material);
    const skeleton = new THREE.Skeleton(bones);

    mesh.add(bones[0]);

    mesh.bind(skeleton);

    skeletonHelper = new THREE.SkeletonHelper(mesh);
    skeletonHelper.material.linewidth = 2;
    scene.add(skeletonHelper);

    return mesh;
  }

  function render() {
    requestAnimationFrame(render);

    for (let i = 0; i < mesh.skeleton.bones.length; i++) {
      mesh.skeleton.bones[i].rotation.z = bend / mesh.skeleton.bones.length; // -2 <= x <= 2
    }

    mesh.skeleton.update();

    mesh.updateWorldMatrix(true);

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function flexion() {
    setBend((prevBend) => prevBend + 0.1);
  }

  function extension() {
    setBend((prevBend) => prevBend - 0.1);
  }

  function resetModel() {
    setBend(0);
  }

  function resetCamera() {
    camera.position.set(0, 0, 90);
    camera.rotation.set(0, 0, 0);
  }

  useEffect(() => {
    initScene();
    render();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      cylRef.current.removeChild(renderer.domElement);
    };
  }, [bend]);

  return (
    <div>
      <div className="cylinder-control-panel">
        <button onClick={flexion}>Flex</button>
        <button onClick={extension}>Extend</button>
        <button onClick={resetModel}>Reset Model</button>
        <button onClick={resetCamera}>Reset Camera</button>
      </div>
      <div ref={cylRef}></div>
    </div>
  );
}
