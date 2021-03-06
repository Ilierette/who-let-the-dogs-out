import { MainPage } from "./pages/main";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'style/app.scss'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:breed" element={<MainPage />} />
      <Route path="/:breed/:sub" element={<MainPage />} />

      {/* wcześniej opcjonalne parametry działały tak /:breed?/:sub?, ale zauważyłam, że już tego nie wspierają */}
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);