import { useEffect, useRef, useState } from "react";

const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsInView(entries[0].isIntersecting);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref]);

  return { ref, isInView };
};

export default useInView;
