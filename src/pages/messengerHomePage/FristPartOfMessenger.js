import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import "./style.css";

import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/auth";
import { FaSearch } from "react-icons/fa";

const FristPartOfMessenger = ({ handleChatUserChange, currentChatUser }) => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);

  const [currentSelected, setCurrentSelected] = useState();

  const { allUsers } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState();

  console.log(filter);

  const handleChangeChatUser = (detail, index) => {
    handleChatUserChange(detail);
    setCurrentSelected(index);
  };

  const handleFilterchange = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <div className="flex justify-between border p-2 m-2 items-center">
        <img src="./images/logo1.png" className="w-3/12" alt="" />
        <FiMoreVertical className="text-2xl" />
      </div>
      <div className="m-auto m-2 px-2 relative">
        <input
          value={filter}
          onChange={(event) => handleFilterchange(event)}
          className="border w-full p-2 focus:outline-none rounded"
          type="text"
        />
        <FaSearch className="absolute right-5 top-3" />
      </div>
      <div className="flex flex-col overflow-y-scroll h-[31rem] scrollParent my-3 mx-2">
        {allUsers?.map(
          (detail, index) =>
            detail._id !== authData?._id && (
              <div
                onClick={() => handleChangeChatUser(detail, index)}
                key={index}
                // className="flex items-center mb-2  w-11/12 m-auto"
                className={`contact ${
                  index === currentSelected
                    ? "bg-[#3C2F95] rounded text-white flex items-center mb-2  w-11/12 m-auto px-1 py-1"
                    : "flex items-center mb-2  w-11/12 m-auto"
                }`}
              >
                <Avatar
                  size="55"
                  round={true}
                  // src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  name={`${detail.firstName} ${detail.lastName}`}
                />
                <p className="pl-3">
                  {detail.firstName} {detail.lastName}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default FristPartOfMessenger;
