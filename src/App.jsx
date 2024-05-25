import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { UserProfile } from "./actions/User";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserProfile());
  }, []);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;
