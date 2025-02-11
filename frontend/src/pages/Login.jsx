// import React, { useState } from "react";
// import { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";

// const Login = () => {
//   const [currentState, setCurrentState] = useState("Sign Up");
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//     } catch (error) {
//       if (currentState === "Sign Up") {
//         const response = await axios.post(backendUrl + "/api/user/register", {
//           name,
//           email,
//           password,
//         });
//         console.log(response.data);
//       } else {
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler} // Prevent default form submission behavior
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="prata-regular text-3xl">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>
//       {currentState === "Login" ? (
//         ""
//       ) : (
//         <input
//           onChange={(e) => setName(e.target.value)}
//           name="username"
//           value={name}
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Name"
//         />
//       )}

//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         name="email"
//         value={email}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//       />
//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         name="password"
//         value={password}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//       />
//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login Here
//           </p>
//         )}
//       </div>
//       <button
//         onClick={() => {
//           currentState === "Login" ? login() : signup();
//         }}
//         className="bg-black text-white font-light px-8 py-2 mt-4"
//       >
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;
import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify"; // Підключення для сповіщень

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Обробка реєстрації та входу
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registration successful!");
          navigate("/"); // Перенаправлення після реєстрації
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful!");
          navigate("/"); // Перенаправлення після логіну
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Автоматична перевірка токена при завантаженні сторінки
  useEffect(() => {
    if (token) {
      navigate("/"); // Якщо є токен, перенаправляємо на головну
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          name="username"
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
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
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
