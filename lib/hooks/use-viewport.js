import { useState, useEffect, createContext, useContext } from "react";
import { debounce } from "underscore";

// helper function for getting viewport size (with fallbacks)
const getViewportSize = (dimension = "Width") =>
  window[`inner${dimension}`] ||
  document.documentElement[`client${dimension}`] ||
  document.body[`client${dimension}`];

// defining the context
const viewportContext = createContext({});

/* provider - add this at the _app.js level
To use, import from here, then wrap everything with: <ViewportProvider> */
const ViewportProvider = ({ children }) => {
  const [vWidth, setVw] = useState(-1);
  const [vHeight, setVh] = useState(-1);

  const handleResize = () => {
    setVw(getViewportSize("Width"));
    setVh(getViewportSize("Height"));
  };
  const dbHandleResize = debounce(() => handleResize(), 40);

  useEffect(() => {
    handleResize();

    const resizeListener = () => dbHandleResize();
    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <viewportContext.Provider value={{ vWidth, vHeight }}>
      {children}
    </viewportContext.Provider>
  );
};

/* This hook is imported and used on a per-component basis as needed
Instead of generating its own state, pulls from the context
To use in function component: const { vWidth, vHeight } = useViewport();
Note: must use same names as above. */
const useViewport = () => {
  const { vWidth, vHeight } = useContext(viewportContext);
  return { vWidth, vHeight };
};

export { ViewportProvider, useViewport };