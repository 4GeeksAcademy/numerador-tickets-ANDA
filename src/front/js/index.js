const originalWarn = console.warn;
console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("React Router Future Flag Warning")) {
        return;
    }
    originalWarn(...args);
};


import React from "react";
import { createRoot } from "react-dom/client"; 


import "../styles/index.css"; 


import Layout from "./layout";


const rootElement = document.querySelector("#app");


const root = createRoot(rootElement);
root.render(<Layout />);

