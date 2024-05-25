import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Metadata from "../../Metadata";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../actions/User";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const handleRemoveImage = () => {
    setAvatar(null);
    const inputElement = document.getElementById("profile-picture");
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formattedDob = new Date(dob).toISOString();
    await dispatch(
      RegisterUser(firstName, lastName, formattedDob, avatar, email, password)
    );
  };

  useEffect(() => {
    window.scroll(0, 0);
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container my-4">
      <Metadata title="Sign up" />
      <div className="row justify-content-center pb-5">
        <div className="col-lg-6">
          <Form onSubmit={handleSignup}>
            <h2 className="text-center fw-bold">Create Your Quantum ID</h2>
            <p className="text-center">
              One Quantum ID is all you need to access all Quantum Services.
            </p>
            <div className="d-flex gap-3 mb-3">
              <FloatingLabel label="First Name">
                <Form.Control
                  type="text"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </FloatingLabel>
              <FloatingLabel label="Last Name">
                <Form.Control
                  type="text"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </FloatingLabel>
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="form-label text-secondary">
                Date of Birth
              </label>
              <div>
                <input
                  type="date"
                  className="form-control p-3 border border-secondary-subtle text-secondary rounded-1"
                  onChange={(e) => setDob(e.target.value)}
                  value={dob}
                />
              </div>
            </div>
            <hr className="text-secondary" />
            <div className="mb-3">
              <label
                htmlFor="profile-picture"
                className="form-label text-secondary"
              >
                Profile Picture
              </label>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="w-100">
                  <input
                    id="profile-picture"
                    type="file"
                    className="form-control"
                    placeholder="Profile Picture"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <Avatar
                    src={avatar}
                    sx={{ width: "35px", height: "35px" }}
                  ></Avatar>
                  {avatar && (
                    <button
                      className="btn btn-sm p-1"
                      onClick={handleRemoveImage}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <FloatingLabel label="Email address">
                <Form.Control
                  type="email"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FloatingLabel>
              <div className="form-text">This will be your new Quantum ID.</div>
            </div>
            <div className="mb-3">
              <FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FloatingLabel>
            </div>
            <div className="d-grid mb-3">
              <button disabled={isLoading} className="btn btn-dark rounded-1">
                Create Account
              </button>
            </div>
            <div>
              <span>Already have an account? </span>
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
