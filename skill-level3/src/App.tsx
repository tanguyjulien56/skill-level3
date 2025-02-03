import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InformationPage from "./pages/InformationPage";
import ThemeToggle from "./services/theme/ThemeToogle";

function App() {
  return (
    <>
      <ThemeToggle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/information" element={<InformationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
