import React, { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import ContactCard from "../components/helpers/ContactCard";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function Dashboard() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [hasmore, setHasmore] = useState(true);
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState("");
  if (!token) {
    navigate("/login");
  }
  const handleaddcontact = () => {
    navigate("/addcontact");
  };
  const queryChange = async () => {
    setContacts([]);
    fetchsearchconytact();
  };
  const fetchsearchconytact = async ()=>{
    try {
        const response = await axios.get(
            `http://localhost:3000/api/v1/contacts/querycontacts?searchQuery=${searchQuery}`,
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          );
          setContacts(response.data.data.contacts);
    } catch (error) {
        console.log(error)
    }
  }
  const fetchContacts = async () => {
    try {
      setPage((prev) => prev + 1);
      const response = await axios.get(
        `http://localhost:3000/api/v1/contacts/getcontacts?page=${page}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data.data.contacts);
      setContacts((prev) => prev.concat(response.data.data.contacts));
      if (response.data.data.contacts.length < 10) {
        setHasmore(false);
        setAlert("no more contacts ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <div className="bg-gray-900 h-full ">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
        queryChange={queryChange}
      />
      <InfiniteScroll
        dataLength={contacts.length}
        next={fetchContacts}
        hasMore={hasmore}
        loader={<h4 className="text-black">Loading...</h4>}
      >
        <div className="contacts">
          {contacts.length > 0
            ? contacts.map((contact) => (
                <div key={contact.id}>
                  {" "}
                  <ContactCard contact={contact} />{" "}
                </div>
              ))
            : ""}
        </div>
      </InfiniteScroll>
      {alert ? (
        <div className="bg-gray-900 text-white text-sm text-center border-t border-gray-700 py-5">
          {alert}
        </div>
      ) : (
        ""
      )}
      <button onClick={handleaddcontact} className="fixed bottom-5 right-5">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACFklEQVR4nO2ay0rDQBRAs9K6UCr42ul3WJeiCIoufXyDVPwLrQtFQdz6CVpffyDiWvta+diIuvaFRy7MIsg05jFJZooHCoU2kxxmcnPvnXjePx0K0A8sABXgBKgBr8C7+sj3W/Wb/GceKHo2AHQDK8AF8EV05JgzYFnG8nIQ6AHWgUfM8QCsAYWsJGaAFunRBKbTXkY7ZMehzLxpiWHgmuy5AoZMSYyp6c6LhlxDUolBFUbzpgWMxJUo5LScgpZZ9BAN7GMfu3FCrK1MRQmzdeylGeqhqZ7YtlMOMxuSKtjOfeCNrxJAV1gKEpEs1jTjQCmFcU+D6ok4qXggvvFN8wn06USkKMIhEWFWJ7KFeyKbOhEpQV0TOdKJSJbpmkhNJ/LioMiTTkQ6HXEZ92KSMDS/mRYpJRCZMC3yQgr4xs9sadUdFLnt6PBbcVBko6NTlKJjSeOHNmlUJztP4YSlhCG2HVWthBKRrrgrLHZKqdvVVkTJSGvfdlYDJXyzYkObtB2N0B1H2Z/ATr6ByVASPpk97GM7koRviUnj2BYu/7zBA2QGLNpWGI4l8WujJ5UyOCR1YDSRhE9mKKdldimbTUYkNJuhEjmy4CDVvXfZn0h5qdUih9iEs1NWqYIp7uSJndcbECK0pKpL6cVGRY6pSgIYO7SaRmoDYE7amMCxeoHm2fdSjXy/kfJUKjspioBe4xfyj2cHPwXX7/3IUdS+AAAAAElFTkSuQmCC" />
      </button>
    </div>
  );
}

export default Dashboard;
