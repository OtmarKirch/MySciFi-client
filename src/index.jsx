import { createRoot } from "react-dom/client";
import MainView from "./components/main-view/main-view";
import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

// import statement indicating that './index.scss' needs to be bundled
import "./index.scss";

// main component
const MySciFiApp = () => {
  return (
    <Container style={{border: "1px solid red"}}>
      <MainView />
    </Container>
  );
};

// finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// tells react to render the app in the root DOM element
root.render(<MySciFiApp />);
