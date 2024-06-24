import React from 'react';
import { FaSearch } from 'react-icons/fa';
import user from '../../assets/user.png'
const Header = () => {
  return (
    <div className=" flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg bg-secondary text-gray-900 focus:outline-none"
          />
          <FaSearch className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src={user}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;

