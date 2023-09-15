import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
const Home = lazy(() => import("./pages/Home"));
const DashBoard = lazy(() => import("./pages/DashBoard"));

function App() {
  return (
    <div>
      <Header />
      <main className="px-8 pb-14">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<DashBoard />} path="/dashboard" />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
