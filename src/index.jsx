import { createRoot } from "react-dom/client";

// import statement indicating that './index.scss' needs to be bundled
import "./index.scss";

// main component
const MySciFiApp = () => {
  return (
    <div className="my-scifi">
      <div>Good morning</div>
    </div>
  );
};

// finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// tells react to render the app in the root DOM element
root.render(<MySciFiApp />);
