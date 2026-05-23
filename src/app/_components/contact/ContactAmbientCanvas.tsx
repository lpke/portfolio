'use client';

import { useEffect, useRef } from 'react';

const FRAME_INTERVAL_MS = 1000 / 30;
const MAX_DEVICE_PIXEL_RATIO = 1.5;
const PARTICLE_BASE_SEED = 82491;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
  wavePhase: number;
  waveSpeed: number;
  waveStrength: number;
};

function createRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;

    return value / 4294967296;
  };
}

function createParticles(width: number, height: number): Particle[] {
  const random = createRandom(
    PARTICLE_BASE_SEED + Math.round(width) * 3 + Math.round(height) * 7,
  );
  const count = width < 640 ? 18 : width < 1024 ? 26 : 34;
  const huePalette = [196, 180, 206, 42, 162];

  return Array.from({ length: count }, (_, index) => {
    const angle = random() * Math.PI * 2;
    const speed = 24 + random() * 34;
    const hue =
      (huePalette[index % huePalette.length] ?? 196) + random() * 8 - 4;

    return {
      x: random() * width,
      y: random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.min(width, height) * (0.1 + random() * 0.16),
      hue,
      saturation: 58 + random() * 22,
      lightness: 50 + random() * 16,
      alpha: 0.06 + random() * 0.055,
      phase: random() * Math.PI * 2,
      phaseSpeed: 0.65 + random() * 0.85,
      wavePhase: random() * Math.PI * 2,
      waveSpeed: 0.75 + random() * 0.9,
      waveStrength: 18 + random() * 34,
    };
  });
}

function wrapParticle(particle: Particle, width: number, height: number) {
  const margin = particle.radius;

  if (particle.x < -margin) particle.x = width + margin;
  if (particle.x > width + margin) particle.x = -margin;
  if (particle.y < -margin) particle.y = height + margin;
  if (particle.y > height + margin) particle.y = -margin;
}

function updateParticles(
  particles: Particle[],
  width: number,
  height: number,
  deltaSeconds: number,
) {
  particles.forEach((particle) => {
    particle.x +=
      (particle.vx + Math.cos(particle.wavePhase) * particle.waveStrength) *
      deltaSeconds;
    particle.y +=
      (particle.vy +
        Math.sin(particle.wavePhase * 0.85) * particle.waveStrength) *
      deltaSeconds;
    particle.phase += particle.phaseSpeed * deltaSeconds;
    particle.wavePhase += particle.waveSpeed * deltaSeconds;
    wrapParticle(particle, width, height);
  });
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
) {
  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = 'lighter';

  particles.forEach((particle) => {
    const pulse = 0.72 + Math.sin(particle.phase) * 0.28;
    const alphaPulse = 0.72 + Math.sin(particle.phase + 1.7) * 0.28;
    const radius = particle.radius * pulse;
    const alpha = particle.alpha * alphaPulse;
    const hue = particle.hue + Math.sin(particle.phase * 0.7) * 14;
    const gradient = context.createRadialGradient(
      particle.x,
      particle.y,
      0,
      particle.x,
      particle.y,
      radius,
    );

    gradient.addColorStop(
      0,
      `hsla(${hue}, ${particle.saturation}%, ${particle.lightness}%, ${alpha})`,
    );
    gradient.addColorStop(
      0.52,
      `hsla(${hue}, ${particle.saturation}%, ${particle.lightness}%, ${alpha * 0.32})`,
    );
    gradient.addColorStop(
      1,
      `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0)`,
    );

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
    context.fill();
  });

  context.globalCompositeOperation = 'source-over';
}

export function ContactAmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    const section = canvas?.closest('section');

    if (!canvas || !context || !section) {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let isActive = false;
    let isSectionVisible = false;
    let animationFrame = 0;
    let visibilityFrame = 0;
    let lastDrawTime = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO,
      );
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticles(width, height);
      drawParticles(context, particles, width, height);
    };

    const stopAnimation = () => {
      if (!animationFrame) {
        return;
      }

      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const draw = (time: number) => {
      if (!isActive || document.hidden) {
        animationFrame = 0;
        return;
      }

      animationFrame = window.requestAnimationFrame(draw);

      if (time - lastDrawTime < FRAME_INTERVAL_MS) {
        return;
      }

      const deltaSeconds = Math.min(0.05, (time - lastDrawTime) / 1000);
      lastDrawTime = time;
      updateParticles(particles, width, height, deltaSeconds);
      drawParticles(context, particles, width, height);
    };

    const startAnimation = () => {
      if (animationFrame || motionQuery.matches || document.hidden) {
        return;
      }

      lastDrawTime = performance.now();
      animationFrame = window.requestAnimationFrame(draw);
    };

    const updateActivation = () => {
      const shouldAnimate =
        !motionQuery.matches && !document.hidden && isSectionVisible;

      if (shouldAnimate === isActive) {
        return;
      }

      isActive = shouldAnimate;

      if (isActive) {
        startAnimation();
        return;
      }

      stopAnimation();
    };

    const requestActivationUpdate = () => {
      if (visibilityFrame) {
        return;
      }

      visibilityFrame = window.requestAnimationFrame(() => {
        visibilityFrame = 0;
        updateActivation();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      requestActivationUpdate();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isSectionVisible = Boolean(entry?.isIntersecting);
      requestActivationUpdate();
    });

    resize();
    resizeObserver.observe(section);
    intersectionObserver.observe(section);
    window.addEventListener('resize', requestActivationUpdate);
    document.addEventListener('visibilitychange', requestActivationUpdate);
    motionQuery.addEventListener('change', requestActivationUpdate);

    return () => {
      stopAnimation();
      if (visibilityFrame) {
        window.cancelAnimationFrame(visibilityFrame);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', requestActivationUpdate);
      document.removeEventListener('visibilitychange', requestActivationUpdate);
      motionQuery.removeEventListener('change', requestActivationUpdate);
    };
  }, []);

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_22%,rgba(123,208,255,0.13),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(60,221,199,0.095),transparent_32%),linear-gradient(180deg,rgba(6,14,32,0.08),rgba(6,14,32,0.58))]"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent_0%,#000_14%,#000_88%,transparent_100%)] opacity-95"
      />
    </>
  );
}
