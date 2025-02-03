import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import InformationPage from "./pages/InformationPage";
import ThemeToggle from "./services/theme/ThemeToogle";

function App() {
  return (
    <Router>
      <NavBar />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/informations" element={<InformationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
