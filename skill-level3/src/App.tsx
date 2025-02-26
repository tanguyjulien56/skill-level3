import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import InformationPage from "./pages/InformationPage";
import ThemeToggle from "./services/theme/ThemeToogle";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/informations" element={<InformationPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
