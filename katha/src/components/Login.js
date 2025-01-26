import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";
import { useEffect } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.user.isLoading);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (isLogin) {
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data && res.data.success) {
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
          navigate("/browse");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        });

        if (res.data && res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true);
          console.log("login successful");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    }

    setFullName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const lastPage = sessionStorage.getItem("lastPage");
    if (lastPage && lastPage !== "/") {
      navigate(lastPage);
      sessionStorage.removeItem("lastPage");
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header />
      <img
        src="https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQaBdZybtRb9fNSEGZ5lElsCckJ5DGUB6S80K4cHqBqU-vxaK3lPky4JyE9h36BTfnJZB0nwG_5Srka8HSbHX1uDPlnWoq5BSb-gNHRkJmyf_kTe4TM8bV-p7ejqP-i1dUMg6LMSp48Hmrx6l6SFEeoZFIGA.jpg?r=1e0"
        alt="banner"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={getInputData}
          className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-white text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <div className="space-y-4">
            {!isLogin && (
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded-md text-black bg-gray-400 placeholder-gray-200"
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md text-black bg-gray-400 placeholder-gray-200"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-md text-black bg-gray-400 placeholder-gray-200"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-white font-quicksand font-medium rounded-md hover:from-[#03ecfc] hover:to-[#0086c0]"
            >
              {`${isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}`}
            </button>
            <p className="text-white text-center font-medium text-lg">
              {isLogin ? "New to KathaStream?" : "Already have an account?"}
              <span
                onClick={toggleMode}
                className="ml-2 text-blue-400 cursor-pointer"
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
  // ... rest of the component (JSX) remains the same
};

export default Login;
