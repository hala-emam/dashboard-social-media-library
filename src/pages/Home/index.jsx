import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaBook, FaNewspaper } from 'react-icons/fa'; // Importing icons from react-icons

const Home = () => {
  const [userCount, setUserCount] = useState(0); // State to store user count
  const [bookCount, setBookCount] = useState(0); // State to store book count
  const [postCount, setPostCount] = useState(0); // State to store post count

  useEffect(() => {
    // Function to fetch user count from backend
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users');
        setUserCount(response.data.data.length); // Assuming response structure { data: [...] }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    // Function to fetch book count from backend
    const fetchBookCount = async () => {
      try {
        const response = await axios.get('http://localhost:9000/books');
        setBookCount(response.data.Data.length); // Assuming response structure { Data: [...] }
      } catch (error) {
        console.error('Error fetching book count:', error);
      }
    };

    // Function to fetch post count from backend
    const fetchPostCount = async () => {
      try {
        const response = await axios.get('http://localhost:9000/posts');
        console.log(response.data)
        setPostCount(response.data.length); // Assuming response structure is an array of posts
      } catch (error) {
        console.error('Error fetching post count:', error);
      }
    };

    fetchUserCount();
    fetchBookCount();
    fetchPostCount();
  }, []);

  // Sample data for cards
  const cardsData = [
    { icon: <FaUser />, counter: userCount, title: 'Users' },
    { icon: <FaBook />, counter: bookCount, title: 'Books' },
    { icon: <FaNewspaper />, counter: postCount, title: 'Posts' },
  ];

  return (
    <div className='content flex flex-col'>
      <div className='flex justify-between px-20'>
        {/* Map over the cardsData array to render each card */}
        {cardsData.map((card, index) => (
          <div key={index} className="card bg-secondary w-[14rem] flex items-center border border-gray-300 rounded-md p-4 shadow-md">
            <div className="icon-container bg-primary rounded-md p-4 text-secondary mr-4 text-2xl">
              {card.icon}
            </div>
            <div className='flex flex-col'>
              <p className="text-lg font-bold">{card.counter}K</p>
              <p className="text-sm">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">Chart goes here</div>
    </div>
  );
};

export default Home;
