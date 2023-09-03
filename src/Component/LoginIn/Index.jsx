import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../dbCollection/FireBaseConfig";
import Loader from "../CssComponent/Loader";
import "./index.css";
import { useDispatch } from "react-redux";
import { userslicereducer } from "../Slice/UserSlice";
import { ToastContainer, toast } from "react-toastify";

export default function LogInFrom() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [FormData, setFormData] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  function handlerChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
        error: "",
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (FormData.email && FormData.password) {
      setFormData((prev) => {
        return {
          ...prev,
          error: "",
        };
      });
      setloading(true);
      signInWithEmailAndPassword(auth, FormData.email, FormData.password)
        .then(({ user }) => {
          if (user.emailVerified === true) {
            setloading(false);
            dispatch(userslicereducer(user));
            localStorage.setItem("userdatafirebase", JSON.stringify(user));
          } else {
            toast.error("Check your email and verify it!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setloading(false);
          }
        })
        .catch(({ code }) => {
          if (code === "auth/user-not-found") {
            setFormData((prev) => {
              return {
                ...prev,
                error: "User not found",
              };
            });
          } else if (code === "auth/wrong-password") {
            setFormData((prev) => {
              return {
                ...prev,
                error: "password is wrong",
              };
            });
          }
          setloading(false);
        });
    }
  }

  return (
    <div className="form-container">
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          className="form--input"
          name="email"
          value={FormData.email}
          onChange={handlerChange}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="form--input"
          name="password"
          value={FormData.password}
          onChange={handlerChange}
          autoComplete="current-password"
        />

        <div className="double--p--css">
          <p className="first--p--css">
            Create A Account <Link to="/register">Sign Up</Link>{" "}
          </p>
          <p className="seconf--p--css">
            <Link to="/forget">Forget Password?</Link>
          </p>
        </div>

        {FormData.error && <p>{FormData.error}</p>}
        {loading ? (
          <button className="form--submit login-button" disabled>
            <Loader />
          </button>
        ) : (
          <button className="form--submit login-button">Sign In</button>
        )}
      </form>
    </div>
  );
}
