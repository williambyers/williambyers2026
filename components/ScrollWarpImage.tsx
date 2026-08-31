'use client';

import { useEffect, useRef, useState } from 'react';

// Canvas overflows the container so displaced vertices stay visible.
// Larger BLEED = more room for upward curl to extend above the image bounds.
const BLEED = 1.8; // canvas = 180% × container → 40% bleed on every side

// Vertex shader: pulls vertices toward the nearest LEFT or RIGHT screen edge.
// The inner 90 % of the screen is completely unaffected; the effect ramps in
// cubically over the outer ~10 % so it only fires when the image is about to
// leave the viewport.
const vert = /* glsl */ `
attribute vec2 uv;
attribute vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float uImgLeft;
uniform float uImgTop;
uniform float uImgW;
uniform float uImgH;
uniform float uVpW;
uniform float uVpH;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Normalised screen-X of this vertex (0 = left edge, 1 = right edge)
  float sx = (uImgLeft + (pos.x * 0.5 + 0.5) * uImgW) / uVpW;

  // Distance from the nearest horizontal edge (0 at edge, 0.5 at centre)
  float edgeDist = min(sx, 1.0 - sx);

  // Quartic ramp: stays near-zero until the last ~5 %, then spikes hard
  float t   = 1.0 - clamp(edgeDist / 0.10, 0.0, 1.0);
  float mag = t * t * t * t;

  // Direction: negative sx = pull left, positive = pull right
  float dirX = sign(sx - 0.5 + 0.0001);

  // Horizontal pull toward the screen edge
  pos.x += dirX * mag * 0.65;
  // Upward curl — "coming out of screen" as the image exits
  pos.y += mag * 0.90;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Fragment shader: horizontal UV smear + RGB split, only near left/right edges.
const frag = /* glsl */ `
precision highp float;
uniform sampler2D tMap;
uniform float uImageAspect;
uniform float uContainerAspect;
uniform float uImgLeft;
uniform float uImgTop;
uniform float uImgW;
uniform float uImgH;
uniform float uVpW;
uniform float uVpH;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Object-cover UV adjustment
  if (uContainerAspect > uImageAspect) {
    float scale = uImageAspect / uContainerAspect;
    uv.y = uv.y * scale + (1.0 - scale) * 0.5;
  } else {
    float scale = uContainerAspect / uImageAspect;
    uv.x = uv.x * scale + (1.0 - scale) * 0.5;
  }

  // Normalised screen-X of this pixel
  float sx = (uImgLeft + vUv.x * uImgW) / uVpW;

  float edgeDist = min(sx, 1.0 - sx);
  float t   = 1.0 - clamp(edgeDist / 0.10, 0.0, 1.0);
  float mag = t * t * t * t;

  // Pull direction: left edge pulls left (−1), right edge pulls right (+1)
  float dirX = sign(sx - 0.5 + 0.0001);

  // UV smear: horizontal pull + upward curl (UV.y decreases = content rises)
  uv.x -= dirX * mag * 0.35;
  uv.y -= mag * 0.55;

  // Chromatic aberration — diagonal split following outward + upward direction
  float ab = mag * 0.06;
  float r = texture2D(tMap, uv + vec2(-dirX * ab,  ab * 0.5)).r;
  float g = texture2D(tMap, uv).g;
  float b = texture2D(tMap, uv + vec2( dirX * ab, -ab * 0.5)).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function ScrollWarpImage({ src, alt, className }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const [naturalAspect, setNaturalAspect] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    let rafId: number;
    const cleanupFns: (() => void)[] = [];

    (async () => {
      const { Renderer, Camera, Program, Mesh, Plane, Texture } = await import('ogl');

      const renderer = new Renderer({ canvas, alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 2) });
      const gl = renderer.gl;

      const camera = new Camera(gl);
      // Frustum ±BLEED so world ±1 (the plane) fills the container,
      // and vertices can push out to ±BLEED before being clipped.
      camera.orthographic({ left: -BLEED, right: BLEED, bottom: -BLEED, top: BLEED, near: 0.1, far: 10 });
      camera.position.z = 1;

      const geometry = new Plane(gl, { width: 2, height: 2, widthSegments: 64, heightSegments: 64 });
      const texture  = new Texture(gl, { generateMipmaps: false });

      let imageAspect = 1;
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        texture.image = img;
        imageAspect = img.naturalWidth / img.naturalHeight;
        setNaturalAspect(imageAspect);
      };
      img.src = src;

      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms: {
          tMap:             { value: texture },
          uImageAspect:     { value: 1 },
          uContainerAspect: { value: 1 },
          uImgLeft: { value: 0 },
          uImgTop:  { value: 0 },
          uImgW:    { value: 1 },
          uImgH:    { value: 1 },
          uVpW:     { value: window.innerWidth },
          uVpH:     { value: window.innerHeight },
        },
        depthTest: false, depthWrite: false,
      });

      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setSize(width * BLEED, height * BLEED);
        program.uniforms.uContainerAspect.value = width / height;
      };
      resize();

      const ro = new ResizeObserver(resize);
      ro.observe(container);
      cleanupFns.push(() => ro.disconnect());

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const rect = container.getBoundingClientRect();
        const vw = window.innerWidth, vh = window.innerHeight;
        if (rect.bottom < -500 || rect.top > vh + 500 || rect.right < -500 || rect.left > vw + 500) return;

        program.uniforms.uImgLeft.value = rect.left;
        program.uniforms.uImgTop.value  = rect.top;
        program.uniforms.uImgW.value    = rect.width;
        program.uniforms.uImgH.value    = rect.height;
        program.uniforms.uVpW.value     = vw;
        program.uniforms.uVpH.value     = vh;
        program.uniforms.uImageAspect.value = imageAspect;

        renderer.render({ scene: mesh, camera });
      };
      rafId = requestAnimationFrame(animate);
      cleanupFns.push(() => cancelAnimationFrame(rafId));
      cleanupFns.push(() => gl.getExtension('WEBGL_lose_context')?.loseContext());
    })();

    return () => cleanupFns.forEach(fn => fn());
  }, [src]);

  const overhang = ((BLEED - 1) / 2) * 100;

  return (
    <div
      ref={containerRef}
      className={`relative ${className ?? ''}`}
      style={naturalAspect ? { aspectRatio: String(naturalAspect) } : undefined}
    >
      <span className="sr-only">{alt}</span>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          width: `${BLEED * 100}%`, height: `${BLEED * 100}%`,
          left: `-${overhang}%`,    top:  `-${overhang}%`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
