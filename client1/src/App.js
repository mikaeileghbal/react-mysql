import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Context, Home, Query, Redux, Zustand } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="/context" element={<Context />} />
          <Route exact path="/redux" element={<Redux />} />
          <Route exact path="/reactquery" element={<Query />} />
          <Route exact path="/zustand" element={<Zustand />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
