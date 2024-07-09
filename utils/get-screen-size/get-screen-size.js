import { useEffect, useState } from "react";

function useWindowWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial window width on mount
    setScreenWidth(window.innerWidth);

    // Add event listener to update screen width on resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  return screenWidth; // Return the current screen width to be used in components
}

export default useWindowWidth;
