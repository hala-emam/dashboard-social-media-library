
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:9000/users')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Expected an array of users but got:', response.data);
          setUsers([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUsers([]);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid user ID');
      return;
    }
    
    try {
      await axios.delete(`http://localhost:9000/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-10 px-20">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 bg-gray-100 text-left">Users</th>
            <th className="py-2 px-4 border-b-2 bg-gray-100 text-left">Following</th>
            <th className="py-2 px-4 border-b-2 bg-gray-100 text-left">Followers</th>
            <th className="py-2 px-4 border-b-2 bg-gray-100 text-left">Total Posts</th>
            <th className="py-2 px-4 border-b-2 bg-gray-100 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b flex items-center">
                <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png' alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                {user.name}
              </td>
              <td className="py-2 px-4 border-b">{user.following.length}k</td>
              <td className="py-2 px-4 border-b">{user.followers.length}k</td>
              <td className="py-2 px-4 border-b">{user.savedPosts.length}k</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 border border-red-500 px-2 py-1 rounded"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-2 py-1 border rounded bg-green-700  hover:bg-green-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastUser >= users.length}
          className="mx-1 px-2 py-1 border rounded bg-green-900 hover:bg-green-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;




