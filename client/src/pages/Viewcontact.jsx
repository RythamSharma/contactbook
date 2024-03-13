import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Viewcontact() {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber1: "",
    phoneNumber2: "",
    address: "",
  });
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const getdetails = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/contacts/getcontact/${id}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data.Contact);
    setUser(response.data.data.Contact);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/contacts/deletecontact/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setAlert(response.data.message);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/contacts/edit/${user.id}`,
        user,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setAlert(response.data.message); // Assuming you want to log the response data
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getdetails();
  }, []);

  
  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 2000);
  }, [alert]);

  
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);


  const changeediting = () => {
    setEditing(!editing);
  };
  return (
    <div className="flex flex-row items-center justify-between ">
      <div className="h-[100vh] bg-gray-800 w-[100vw] md:w-[50vw]">
        <h1 className="  text-3xl font-semibold float-left mt-5 ml-5 text-white">
          Contact
        </h1>
        {alert ? (
          <p className="fixed top-14 left-[45vw] text-green-500">{alert}</p>
        ) : (
          ""
        )}
        {error ? (
          <p className="fixed top-14 left-[45vw] text-red-500">{error}</p>
        ) : (
          ""
        )}
        <div
          className={`${
            editing ? " bg-gray-600 " : "bg-transparent"
          } hover:bg-black p-2 rounded-full float-right mr-5 mt-5`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            onClick={changeediting}
            className={`cursor-pointer`}
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div
          onClick={handleDelete}
          className={`p-2 rounded-full float-right mr-0 mt-5 hover:bg-black `}
        >
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/ios/50/ffffff/delete-trash.png"
            alt="delete-trash"
          />
        </div>

        <div
          className={` flex-col ${
            editing ? "hidden" : "flex"
          } items-center mt-[20vh] py-11 border-t-2 border-b-2 border-gray-600`}
        >
          <div className="text-white rounded-full bg-blue-400 w-24 h-24  text-5xl flex items-center justify-center mr-3">
            {user.firstName?.slice(0, 1).toUpperCase()}
          </div>
          {user.firstName && (
            <div className="text-white text-xl md:text-4xl font-semibold">
              {user.firstName} {user.middleName} {user.lastName}
            </div>
          )}
          {user.email && (
            <div className="text-white mt-4 text-lg md:text-2xl font-thin">
              {user.email}
            </div>
          )}
          {user.phoneNumber1 && (
            <div className="text-white mt-4 items-center flex text-lg md:text-2xl font-thin">
              <img
                className="-rotate-90"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/ffffff/phone-disconnected.png"
                alt="phone-disconnected"
              />
              {user.phoneNumber1}
            </div>
          )}
          {user.phoneNumber2 && (
            <div className="text-white mt-4 items-center flex text-lg md:text-2xl font-thin">
              <img
                className="-rotate-90"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/ffffff/phone-disconnected.png"
                alt="phone-disconnected"
              />
              {user.phoneNumber2}
            </div>
          )}
          {user.address && (
            <div className="text-white mt-4 items-center flex text-lg md:text-2xl font-thin">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/ffffff/address.png"
                alt="address"
              />
              {user.address}
            </div>
          )}
        </div>
        <div
          className={`  ${
            editing ? "block" : "hidden"
          }edit-form flex flex-col items-center `}
        >
          <form
            className={`flex-col ${
              editing ? "flex" : "hidden"
            } items-center mt-[7vh]`}
          >
            <div className="text-white rounded-full bg-blue-400 w-24 h-24  text-5xl flex items-center justify-center mr-3">
              {user.firstName?.slice(0, 1).toUpperCase()}
            </div>
            <div className="text-white mt-1 md:mt-4  flex-col flex items-start font-thin">
              <label htmlFor="fname">Firstname</label>
              <input
                type="text"
                id="fname"
                className="bg-transparent focus:border-blue-600 transition-colors duration-150 border-b  w-full md:w-[28vw] mt-0  focus:outline-none p-3 text-white"
                value={user.firstName}
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                }}
              />
            </div>
            <div className="text-white mt-1 flex-col  flex items-start font-thin">
              <label htmlFor="mname">Middlename</label>
              <input
                type="text"
                id="mname"
                value={user.middleName}
                className="bg-transparent focus:border-blue-600 transition-colors duration-150 border-b  w-full md:w-[28vw] mt-0  focus:outline-none p-3 text-white"
                onChange={(e) => {
                  setUser({ ...user, middleName: e.target.value });
                }}
              />
            </div>
            <div className="text-white mt-1 flex items-start flex-col font-thin">
              <label htmlFor="lname">Lastname</label>
              <input
                id="lname"
                type="text"
                value={user.lastName}
                className="bg-transparent focus:border-blue-600 transition-colors duration-150 border-b  w-full md:w-[28vw] mt-0  focus:outline-none p-3 text-white"
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                }}
              />
            </div>
            <div className="text-white mt-1 md:mt-4  flex items-center font-thin">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/ffffff/new-post--v1.png"
                alt="new-post--v1"
              />
              <input
                type="text"
                value={user.email}
                className="bg-transparent focus:border-blue-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>
            <div className="text-white mt-1 md:mt-4 items-center flex font-thin">
              <img
                className="-rotate-90"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/ffffff/phone-disconnected.png"
                alt="phone-disconnected"
              />
              <input
                type="text"
                value={user.phoneNumber1}
                className="bg-transparent focus:border-blue-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
                onChange={(e) => {
                  setUser({ ...user, phoneNumber1: e.target.value });
                }}
              />
            </div>
            <div className="text-white mt-1 md:mt-4 items-center flex font-thin">
              <img
                className="-rotate-90"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/ffffff/phone-disconnected.png"
                alt="phone-disconnected"
              />
              <input
                type="text"
                value={user.phoneNumber2}
                className="bg-transparent focus:border-blue-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
                onChange={(e) => {
                  setUser({ ...user, phoneNumber2: e.target.value });
                }}
              />
            </div>
            <div className="text-white mt-1 md:mt-4 items-center flex font-thin">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/ffffff/address.png"
                alt="address"
              />
              <input
                type="text"
                className="bg-transparent focus:border-blue-600 transition-colors duration-150 border-b  w-full md:w-[26vw] mt-0  focus:outline-none p-3 text-white"
                value={user.address}
                onChange={(e) => {
                  setUser({ ...user, address: e.target.value });
                }}
              />
            </div>
          </form>
          <button
            onClick={handleEdit}
            className={` ${
              editing ? "block" : "hidden"
            } text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-20 mt-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
          >
            Save
          </button>
        </div>
      </div>
      <div className="h-[100vh] text-white flex-col justify-center bg-gray-900 hidden md:flex w-[50vw]">
        <div className="mx-auto">
          <p className="w-[40vw]   text-4xl font-thin ">
            This contact book app has provided me with a great way to manage my
            contacts. The user interface is clean and very intuitive
          </p>
          <div className="mt-5">
            <p>Jules Winnfield</p>
            <p className="text-gray-500">CEO, Acme inc</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewcontact;
