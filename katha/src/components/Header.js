import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { API_END_POINT } from "../utils/constant";
import axios from "axios";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navigateHandler = (path) => {
    if (path === "/") {
      navigate("/browse");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="absolute z-10 flex items-center justify-between w-full p-4 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center space-x-4">
        <img
          className="w-20"
          src="data:image/png;base64,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"
          alt="logo"
        />
        <h1 className="text-4xl font-bold font-space-grotesk text-transparent bg-clip-text bg-gradient-to-r from-[#03ecfc] to-[#0086c0] transition duration-300 ease-in-out hover:from-[#03ecfc] hover:to-[#0086c0] hover:scale-105 hover:shadow-md">
          KathaStream
        </h1>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              navigateHandler(location.pathname === "/mylist" ? "/" : "/mylist")
            }
            className="px-4 py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-black font-quicksand rounded-md hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc]"
          >
            {location.pathname === "/mylist" ? "Home" : "My List"}
          </button>
          <button
            onClick={() =>
              navigateHandler(location.pathname === "/search" ? "/" : "/search")
            }
            className="px-4 py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-black font-quicksand rounded-md hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc]"
          >
            {location.pathname === "/search" ? "Home" : "Search"}
          </button>
          <button
            onClick={() => {
              window.location.replace(
                "https://ask-ai-kathastream.netlify.app/"
              );
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-black font-quicksand rounded-md hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc]"
          >
            Ask AI
          </button>

          <button
            onClick={() => {
              window.location.replace(
                "https://movierecommendationsystem-aisha-sinha.streamlit.app/"
              );
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-black font-quicksand rounded-md hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc]"
          >
            Recommendations
          </button>

          <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-black font-quicksand rounded-md hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc]"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
