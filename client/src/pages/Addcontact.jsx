import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
function Addcontact() {
    const token = Cookies.get("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    const[alert,setAlert]=useState('');
    const[error,setError]=useState('');
    const [user, setUser] = useState({
        firstName:'',
        middleName:'',
        lastName:'',
        email:'',
        phoneNumber1:'',
        phoneNumber2:'',
        address:'',
        userId:userId
      });
      const handleEdit = async() => {
        // console.log(user);
        try {
            const response = await axios.post("http://localhost:3000/api/v1/contacts/create", user, {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            setAlert(response.data.message); 

        } catch (error) {
            setError(error.response.data.message)
        }
      }
      useEffect(()=>{
        setTimeout(() => {
            setAlert('');
        }, 2000);
    },[alert])
      useEffect(()=>{
        setTimeout(() => {
            setError('');
        }, 2000);
    },[error])
  return (
    <div className={`edit-form flex flex-col items-center bg-gradient-to-r from-gray-900 to-slate-700 h-[100vh]` } >
        {alert? <p className="fixed top-14 left-[45vw] text-green-500" >{alert}</p>:""}
        {error? <p className="fixed top-14 left-[45vw] text-red-500" >{error}</p>:""}
    <form
      className={`flex-col items-center mt-[7vh]`}
    >
      <div className="text-white rounded-full bg-blue-400 w-24 h-24  text-5xl flex items-center justify-center mr-3">
        {user.firstName?.slice(0, 1).toUpperCase() || "NC"}
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
          placeholder='email'
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
          placeholder='phone number 1'
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
            placeholder='phone number 2'
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
            placeholder='address'
          onChange={(e) => {
            setUser({ ...user, address: e.target.value });
          }}
        />
      </div>
    </form>
    <button onClick={handleEdit} className={` text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-20 mt-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`} >Save</button>
  </div>
  )
}

export default Addcontact
