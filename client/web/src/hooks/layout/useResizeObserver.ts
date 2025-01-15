import { useEffect, useState } from "react";

function useResizeObserver(ref, currentIndex = 0) {
  const [dimensions, setDimensions] = useState(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (ref && ref.current) {
      const observeTarget = ref.current;
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setDimensions(entry.contentRect);
          setTarget(entry.target);
        });
      });

      resizeObserver.observe(observeTarget);

      return () => {
        resizeObserver.unobserve(observeTarget);
      };
    }
  }, [ref, currentIndex]);

  return { dimensions, target };
}
export default useResizeObserver;
