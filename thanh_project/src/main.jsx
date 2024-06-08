import ReactDOM from "react-dom/client";
import DemoReact from "./App.jsx";
import "./index.css";

// Single Page application
// Client side rendering

//document.getElementById("root"): tìm 1 cái thẻ có ID là "root"

ReactDOM.createRoot(document.getElementById("root")).render(<DemoReact />);
