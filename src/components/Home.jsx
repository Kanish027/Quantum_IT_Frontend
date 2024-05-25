import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { GetAllUsers, LogoutUser } from "../actions/User";

const Home = () => {
  const { isAuthenticated, user, allusers } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container-fluid px-5">
      <div className="d-flex my-3 align-items-center justify-content-between">
        <div>
          <Avatar src={user && user.avatar && user.avatar.avatar_url} />
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-outline-primary btn-sm"
        >
          Sign Out
        </button>
      </div>
      <div className="mx-5">
        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Avatar</th>
            </tr>
          </thead>
          <tbody>
            {allusers && allusers.length > 0 ? (
              allusers.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.avatar && user.avatar.avatar_url ? (
                      <Avatar src={user.avatar.avatar_url} />
                    ) : (
                      "No Avatar"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
