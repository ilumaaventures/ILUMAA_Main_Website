import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const isTouch = window.matchMedia("(hover:none)").matches || window.innerWidth < 900;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Setup scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 9);

    // Parallax mouse movements
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Core group container
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Wireframe 1
    const icoGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x8b6bff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Wireframe 2
    const icoGeo2 = new THREE.IcosahedronGeometry(1.2, 0);
    const icoMat2 = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icoMesh2 = new THREE.Mesh(icoGeo2, icoMat2);
    coreGroup.add(icoMesh2);

    // Fibonacci Sphere Generator
    function fibonacciSphere(count, radius) {
      const pts = [];
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        pts.push(new THREE.Vector3(x * radius, y * radius, z * radius));
      }
      return pts;
    }

    const particleCount = window.innerWidth < 768 ? 1400 : 3200;
    const basePts = fibonacciSphere(particleCount, 2.0);
    const explodedPts = basePts.map((p) => {
      const v = p.clone().normalize();
      const dist = 5 + Math.random() * 16;
      return v
        .multiplyScalar(dist)
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          )
        );
    });

    // Particle buffers
    const posArr = new Float32Array(particleCount * 3);
    const colArr = new Float32Array(particleCount * 3);
    const cA = new THREE.Color(0x3b82f6);
    const cB = new THREE.Color(0x8b5cf6);
    const cC = new THREE.Color(0x22d3ee);

    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3] = basePts[i].x;
      posArr[i * 3 + 1] = basePts[i].y;
      posArr[i * 3 + 2] = basePts[i].z;

      const mixed = cA
        .clone()
        .lerp(cB, Math.random())
        .lerp(cC, Math.random() * 0.6);
      colArr[i * 3] = mixed.r;
      colArr[i * 3 + 1] = mixed.g;
      colArr[i * 3 + 2] = mixed.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArr, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colArr, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particlePoints);

    // Network lines
    const linePositions = [];
    const netCount = Math.min(particleCount, 260);
    for (let a = 0; a < netCount; a++) {
      const p1 = basePts[a];
      let nearest = null;
      let nd = Infinity;
      for (let b = 0; b < netCount; b++) {
        if (a === b) continue;
        const p2 = basePts[b];
        const d = p1.distanceToSquared(p2);
        if (d < nd) {
          nd = d;
          nearest = p2;
        }
      }
      if (nearest) {
        linePositions.push(p1.x, p1.y, p1.z, nearest.x, nearest.y, nearest.z);
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7cf1ff,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    coreGroup.add(networkLines);

    // Ambient starfield
    const starCount = window.innerWidth < 768 ? 900 : 2200;
    const starPos = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      starPos[s * 3] = (Math.random() - 0.5) * 90;
      starPos[s * 3 + 1] = (Math.random() - 0.5) * 90;
      starPos[s * 3 + 2] = (Math.random() - 0.5) * 90 - 10;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation frames loop
    let clock = new THREE.Clock();
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      targetRotX += (mouseY * 0.4 - targetRotX) * 0.04;
      targetRotY += (mouseX * 0.5 - targetRotY) * 0.04;

      coreGroup.rotation.y = t * 0.06 + targetRotY;
      coreGroup.rotation.x = targetRotX * 0.6;
      icoMesh.rotation.y += 0.0018;
      icoMesh2.rotation.y -= 0.0026;
      starField.rotation.y = t * 0.004;

      renderer.render(scene, camera);
    };
    animate();

    // GSAP ScrollTrigger timeline for particle morphing
    const explodeState = { p: 0 };
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    timeline
      .to(camera.position, { z: 4.0, duration: 0.32, ease: "power1.inOut" }, 0)
      .to(
        explodeState,
        {
          p: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onUpdate: () => {
            const pos = particleGeo.attributes.position;
            for (let i = 0; i < particleCount; i++) {
              const bx = basePts[i].x, by = basePts[i].y, bz = basePts[i].z;
              const ex = explodedPts[i].x, ey = explodedPts[i].y, ez = explodedPts[i].z;
              pos.array[i * 3] = bx + (ex - bx) * explodeState.p;
              pos.array[i * 3 + 1] = by + (ey - by) * explodeState.p;
              pos.array[i * 3 + 2] = bz + (ez - bz) * explodeState.p;
            }
            pos.needsUpdate = true;
            icoMat.opacity = 0.55 * (1 - explodeState.p);
            icoMat2.opacity = 0.35 * (1 - explodeState.p);
          },
        },
        0.18
      )
      .to(lineMat, { opacity: 0.5, duration: 0.18 }, 0.42)
      .to(camera.position, { z: 12, duration: 0.35, ease: "power1.inOut" }, 0.55)
      .to(lineMat, { opacity: 0, duration: 0.15 }, 0.75);

    // Scaling entry play-in
    gsap.from(coreGroup.scale, {
      x: 0.2,
      y: 0.2,
      z: 0.2,
      duration: 1.6,
      delay: 0.1,
      ease: "power3.out",
    });

    // Cleanup WebGL and ScrollTriggers on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      timeline.scrollTrigger?.kill();
      timeline.kill();

      // Dispose elements
      icoGeo.dispose();
      icoMat.dispose();
      icoGeo2.dispose();
      icoMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="webgl" ref={canvasRef} />;
}

export default WebGLBackground;
