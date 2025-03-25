import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BlogCard from "./components/BlogCard";
import { TextField } from "@mui/material";
import Form from "./components/Form";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import PrivateRoute from "./components/PrivateRoute";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import CustomErrorBoundary from "./components/ErrorBoundary";



function App() {
  return (
    <CustomErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<PrivateRoute><Form/></PrivateRoute>} />
        <Route path=":id/edit" element={<PrivateRoute><Form/></PrivateRoute>} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path=":id/details" element={<BlogDetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CustomErrorBoundary>
  );
}

export default App;
