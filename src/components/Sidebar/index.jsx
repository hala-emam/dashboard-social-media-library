import React from 'react'
import { IoIosSettings, IoMdHome } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import Users from './../../pages/Users/index';
import { FaBookOpen, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  return (
  
    <div >
      <div className="flex items-start justify-center py-6 text-3xl text-secondary font-bold">
        BookNet
      </div>
      <ul className="text-secondary flex flex-col justify-center items-start gap-4 text-2xl font-semibold px-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "active-link w-full" : "hover:w-full"
          }
        >
          {({ isActive }) => (
            <li
              className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md  hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                isActive ? "bg-secondary text-primary w-full" : ""
              }`}
            >
              <IoMdHome className="text-3xl" />
              <span className={isActive ? "text-primary " : ""}>Dashboard</span>
            </li>
          )}
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "active-link w-full" : "hover:w-full"
          }
        >
          {({ isActive }) => (
            <li
              className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                isActive ? "bg-secondary text-primary w-full" : ""
              }`}
            >
              <FaUserCircle className="text-2xl" />
              <span className={isActive ? "text-primary" : ""}>Users</span>
            </li>
          )}
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "active-link w-full" : "hover:w-full"
          }
        >
          {({ isActive }) => (
            <li
              className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                isActive ? "bg-secondary text-primary w-full" : ""
              }`}
            >
              <FaBookOpen />
              <span className={isActive ? "text-primary" : ""}>Books</span>
            </li>
          )}
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "active-link w-full" : "hover:w-full"
          }
        >
          {({ isActive }) => (
            <li
              className={`flex flex-row items-center justify-start gap-2 py-1 px-2 rounded-md hover:bg-secondary hover:text-primary hover:transition-all w-full ${
                isActive ? "bg-secondary text-primary w-full" : ""
              }`}
            >
              <FaBookOpen />
              <span className={isActive ? "text-primary" : ""}>Posts</span>
            </li>
          )}
        </NavLink>
       
      </ul>
    </div>

  )
}

export default Sidebar