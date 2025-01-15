import { useEffect, useState } from "react";

function useScrollHeightObserver(ref, currentIndex = 0) {
  const [scrollHeight, setScrollHeight] = useState(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (ref && ref.current) {
      const observeTarget = ref.current;

      const handleScrollHeightChange = () => {
        setScrollHeight(observeTarget.scrollHeight);
        setTarget(observeTarget);
      };

      const resizeObserver = new ResizeObserver(() => {
        handleScrollHeightChange();
      });

      resizeObserver.observe(observeTarget);
      handleScrollHeightChange(); // Initial check

      return () => {
        resizeObserver.unobserve(observeTarget);
      };
    }
  }, [ref, currentIndex]);

  return { scrollHeight, target };
}

export default useScrollHeightObserver;
