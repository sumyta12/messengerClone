import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "./SignuoForm.css";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../dbCollection/FireBaseConfig";
import { ref, set } from "firebase/database";

export default function SignUpFrom() {
  const navigation = useNavigate();
  const [FormData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordError: "",
    checkbox: false,
  });

  function handlerChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        passwordError: "",
        [name]:
          name === "checkbox" ? (value === "false" ? true : false) : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    FormData.password !== FormData.confirmPassword
      ? setFormData((prev) => {
          return {
            ...prev,
            passwordError: "Your password is incorrect",
          };
        })
      : setFormData((prev) => {
          return {
            ...prev,
            passwordError: "",
          };
        });

    // now everything come in form data
    // and firebase take email and password
    if (
      FormData.name &&
      FormData.email &&
      FormData.password &&
      FormData.password === FormData.confirmPassword
    ) {
      createUserWithEmailAndPassword(auth, FormData.email, FormData.password)
        .then(({ user }) => {
          updateProfile(auth.currentUser, {
            displayName: FormData.name,
            photoURL: user.photoURL,
          });

          sendEmailVerification(auth.currentUser).then(() => {
            //  write realtime firebase data
            const { displayName, email, uid } = user;
            
            set(ref(database, "users/" + user.uid), {
              displayName,
              email,
              uid,
            });
          });

          toast("Your are Succesfully Register & Check your mail!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(function () {
            navigation("/login");
          }, 1000);
        })

        .catch(({ code }) => {
          if (code === "auth/email-already-in-use") {
            toast.error("This Email already Use Add Another email!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (code === "auth/weak-password") {
            setFormData((prev) => {
              return {
                ...prev,
                passwordError: "password Must be  8 characters long",
              };
            });
          }
        });
    }
  }

  return (
    <div className="form-container">
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Give A Username"
          className="form--input"
          name="name"
          value={FormData.name}
          onChange={handlerChange}
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="Email address"
          className="form--input"
          name="email"
          value={FormData.email}
          onChange={handlerChange}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="form--input"
          name="password"
          value={FormData.password}
          onChange={handlerChange}
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="form--input"
          name="confirmPassword"
          value={FormData.confirmPassword}
          onChange={handlerChange}
          autoComplete="new-password"
        />

        <div className="form--marketing">
          <input
            id="okayToEmail"
            type="checkbox"
            name="checkbox"
            value={FormData.checkbox}
            onChange={handlerChange}
          />

          <label htmlFor="okayToEmail">I want to join the newsletter</label>
        </div>

        {FormData.passwordError && (
          <p className="p-error-tag">{FormData.passwordError}</p>
        )}

        <p>
          Already Has An Account <Link to="/login">Login</Link>{" "}
        </p>

        <button className="form--submit">Sign up</button>
      </form>
    </div>
  );
}
