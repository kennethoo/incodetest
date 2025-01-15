import { useEffect, useRef, useState } from "react";

function LandingPageTextAnimation() {
  const container: any = useRef();
  const [islastClass, setIslastClass] = useState("");
  const scrooBottom = () => {
    if (container.current.scrollTop >= 300) {
      setIslastClass("active");
      container.current.scrollTop = 0;
    } else {
      container.current.scrollTop += 50;
      setIslastClass("");
    }
  };
  useEffect(() => {
    const timeer = setInterval(() => {
      scrooBottom();
    }, 1000);
    return () => {
      clearInterval(timeer);
    };
  }, []);

  return (
    <div className="container-anime-test">
      <div ref={container} className="text-about-meettum">
        <p className={`text-to-animatte`}>Create</p>
        <p className={`text-to-animatte ${islastClass}`}>Mannage Meetings</p>
        <p className={`text-to-animatte ${islastClass}`}>Schedule Meeting</p>
        <p className={`text-to-animatte ${islastClass}`}>Join Meeting</p>
        <p className={`text-to-animatte ${islastClass}`}>UserPresentInRoom</p>
        <p className={`text-to-animatte ${islastClass}`}>Meet On INCODE</p>
        <p className={`text-to-animatte ${islastClass}`}>INCODE</p>
      </div>
    </div>
  );
}

export default LandingPageTextAnimation;
