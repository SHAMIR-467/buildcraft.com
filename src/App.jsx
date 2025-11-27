import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ConstructionTracker from "./components/ConstructionTracker";
import Testimonials from "./components/Testimonials";
import FloorPlanGenerator from "./components/FloorPlanGenerator";
function Home() {
  return (
    <>
      <Hero3D />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<ConstructionTracker />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/floorplan" element={<FloorPlanGenerator />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 text-gray-500 py-8 text-center border-t border-gray-800">
          <p>
            &copy; {new Date().getFullYear()} BuildCraft Construction. All
            rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
