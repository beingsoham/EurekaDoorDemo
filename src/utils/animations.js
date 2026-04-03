import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';

export function useScrollAnimation(targets, animation = {}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  useEffect(() => {
    if (inView) {
      const defaultAnimation = {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(100),
      };

      anime({
        targets,
        ...defaultAnimation,
        ...animation,
      });
    }
  }, [inView, targets, animation]);

  return ref;
}

export function createPulseEffect(target, intensity = 1) {
  anime({
    targets: target,
    scale: [1, 1 + 0.05 * intensity],
    duration: 1000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutQuad',
  });
}

export function createFloatEffect(target, distance = 10) {
  anime({
    targets: target,
    translateY: [-distance, distance],
    duration: 3000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
  });
}

export function createGlowEffect(target, color = 'rgba(200, 155, 79, 0.5)') {
  anime({
    targets: target,
    boxShadow: [
      `0 0 0 0 ${color}`,
      `0 0 0 20px rgba(200, 155, 79, 0)`,
    ],
    duration: 1500,
    loop: true,
    easing: 'easeOutQuad',
  });
}

export function createRevealEffect(target, direction = 'up') {
  const translation = {
    up: { translateY: [100, 0] },
    down: { translateY: [-100, 0] },
    left: { translateX: [100, 0] },
    right: { translateX: [-100, 0] },
  };

  return anime({
    targets: target,
    ...translation[direction],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo',
  });
}
