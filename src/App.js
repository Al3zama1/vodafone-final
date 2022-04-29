import "./App.css";

import Header from "./components/general/Header";

import { Routes, Route } from "react-router-dom";

import GlobalDashboard from "./components/global/GlobalDashboard";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/global" element={<GlobalDashboard data="lol" />} />
      </Routes>
    </div>
  );
}

export default App;
