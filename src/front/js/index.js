const originalWarn = console.warn;
console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("React Router Future Flag Warning")) {
        return;
    }
    originalWarn(...args);
};

//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";
// import "bootstrap/dist/css/bootstrap.min.css";  Agus: Este cambio me rompe la interface, no encuentra el módulo. El bootstrap está importado como script en el tempolate.


//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
