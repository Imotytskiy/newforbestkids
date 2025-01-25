import React, { useState } from "react";

const Login = () => {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  // });

  // const changeHandler = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const [currentState, setCurrentState] = useState("Sign Up");

  // const login = async () => {
  //   console.log("Login Function Executed", formData);
  //   try {
  //     const response = await fetch("http://localhost:4000/login", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const responseData = await response.json();

  //     if (responseData.success) {
  //       localStorage.setItem("auth-token", responseData.token);
  //       window.location.replace("/");
  //     } else {
  //       alert(responseData.errors);
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     alert("An error occurred during signup.");
  //   }
  // };

  // const signup = async () => {
  //   console.log("Signup Function Executed", formData);

  //   try {
  //     const response = await fetch("http://localhost:4000/signup", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const responseData = await response.json();

  //     if (responseData.success) {
  //       localStorage.setItem("auth-token", responseData.token);
  //       window.location.replace("/");
  //     } else {
  //       alert(responseData.errors);
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     alert("An error occurred during signup.");
  //   }
  // };

  return (
    <form
      onSubmit={(e) => e.preventDefault()} // Prevent default form submission behavior
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          name="username"
          // value={formData.username}
          // onChange={changeHandler}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}
      <input
        name="email"
        // value={formData.email}
        // onChange={changeHandler}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />
      <input
        name="password"
        // value={formData.password}
        // onChange={changeHandler}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        onClick={() => {
          currentState === "Login" ? login() : signup();
        }}
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
