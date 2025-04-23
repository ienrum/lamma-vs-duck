import { useEffect, useRef, useState } from 'react';
import { PowerGlitch } from 'powerglitch';

const useGlitch = (dependencies: any[]) => {
  const glitchRef = useRef<HTMLDivElement>(null);
  const [glitch, setGlitch] = useState<ReturnType<typeof PowerGlitch.glitch>>();

  useEffect(() => {
    if (glitchRef.current) {
      setGlitch(
        PowerGlitch.glitch(glitchRef.current, {
          timing: {
            duration: 300,
            iterations: 1,
          },
          glitchTimeSpan: {
            start: 0,
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    glitch?.startGlitch();

    return () => {
      glitch?.stopGlitch();
    };
  }, dependencies);

  return { glitchRef };
};

export default useGlitch;
