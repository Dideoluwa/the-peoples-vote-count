import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import ResultByLga from "./pages/ResultByLga";
import ResultByPollingUnit from "./pages/ResultByPollingUnit";
import Incident from "./pages/Incident";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<ResultByLga />} />
          <Route path="polling-unit" element={<ResultByPollingUnit />} />
          <Route path="incident-report" element={<Incident />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
