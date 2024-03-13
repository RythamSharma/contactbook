import React from "react";
import { useNavigate } from "react-router-dom";

function ContactCard(props) {
  const navigate = useNavigate();
  const handleContactClick = () => {
    navigate(`/contact/${props.contact.id}`);
  };

  return (
    <div
      onClick={handleContactClick}
      className="py-3 px-3 flex flex-row justify-between items-center hover:bg-gray-800 rounded-xl bg-gray-900 cursor-pointer "
    >
      <div className="flex flex-row items-center">
        <div className="text-white rounded-full bg-blue-400 w-11 h-11  text-xl flex items-center justify-center mr-3">
          {props.contact.firstName.slice(0, 1).toUpperCase()}
        </div>
        <div className="flex flex-row w-[26vw]">
          <div className="text-white">{props.contact.firstName}</div>
          <div className="text-white ml-1">{props.contact.middleName}</div>
          <div className="text-white ml-1">{props.contact.lastName}</div>
        </div>
      </div>
      <div className=" flex-row hidden md:flex ">
        <div className="text-white">{props.contact.phoneNumber1} /</div>
        <div className="text-white ml-1">{props.contact.phoneNumber1}</div>
      </div>

      <div className="text-gray-600 hidden w-[15vw] md:block ">{props.contact.address}</div>
    </div>
  );
}

export default ContactCard;
