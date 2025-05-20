import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Navbar from "./components/layout/Navbar";

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Router />
  </BrowserRouter>
);

export default App;
