// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./styles/index.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import { CalendarProvider } from "./context/CalendarContext";

ReactDOM.render(
  <CalendarProvider>
    <App />
  </CalendarProvider>,
  document.getElementById("root")
);
