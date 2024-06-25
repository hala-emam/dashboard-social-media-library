


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaUser, FaBook, FaNewspaper } from 'react-icons/fa';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

const Home = () => {
  const [userCount, setUserCount] = useState(0); // State to store user count
  const [bookCount, setBookCount] = useState(0); // State to store book count
  const [postCount, setPostCount] = useState(0); // State to store post count
  const [dailyLogins, setDailyLogins] = useState([]); // State to store daily login counts

  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  useEffect(() => {
    // Fetch counts and daily logins from backend
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get('http://localhost:9000/users');
        if (userResponse.data && userResponse.data.data) {
          setUserCount(userResponse.data.data.length);
        }

        const bookResponse = await axios.get('http://localhost:9000/books');
        if (bookResponse.data && bookResponse.data.Data) {
          setBookCount(bookResponse.data.Data.length);
        }

        const postResponse = await axios.get('http://localhost:9000/posts');
        if (postResponse.data) {
          setPostCount(postResponse.data.length);
        }

        const dailyLoginsResponse = await axios.get('http://localhost:9000/users/login-statistics');
        if (dailyLoginsResponse.data && dailyLoginsResponse.data) {
          console.log('ddddddd',dailyLoginsResponse.data)
          setDailyLogins(dailyLoginsResponse.data); // Assuming response structure { data: [...] }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const barChartCanvas = barChartRef.current.getContext('2d');
    const doughnutChartCanvas = doughnutChartRef.current.getContext('2d');
  
    // Safely destroy existing chart instances
    if (barChartRef.current.chartInstance) {
      barChartRef.current.chartInstance.destroy();
    }
    if (doughnutChartRef.current.chartInstance) {
      doughnutChartRef.current.chartInstance.destroy();
    }
  
    // Create new chart instances
    barChartRef.current.chartInstance = new ChartJS(barChartCanvas, {
      type: 'bar',
      data: {
        labels: dailyLogins.map(item => item.day),
        datasets: [
          {
            label: 'User Logins',
            data: dailyLogins.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  
    doughnutChartRef.current.chartInstance = new ChartJS(doughnutChartCanvas, {
      type: 'doughnut',
      data: {
        labels: dailyLogins.map(item => item.day),
        datasets: [
          {
            label: 'User Logins',
            data: dailyLogins.map(item => item.count),
            // backgroundColor: [
            //   'rgba(75, 192, 192, 0.6)',
            //   'rgba(54, 162, 235, 0.6)',
            //   'rgba(255, 206, 86, 0.6)',
            //   'rgba(75, 192, 192, 0.6)',
            //   'rgba(153, 102, 255, 0.6)',
            //   'rgba(255, 159, 64, 0.6)',
            // ],
            // borderColor: [
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)',
            // ],
            borderWidth: 1,
          },
        ],
      },
    });
  
    // Cleanup function to destroy charts on unmount or update
    return () => {
      if (barChartRef.current.chartInstance) {
        barChartRef.current.chartInstance.destroy();
      }
      if (doughnutChartRef.current.chartInstance) {
        doughnutChartRef.current.chartInstance.destroy();
      }
    };
  }, [dailyLogins]);
  

  // Sample data for cards
  const cardsData = [
    { icon: <FaUser />, counter: userCount, title: 'Users' },
    { icon: <FaBook />, counter: bookCount, title: 'Books' },
    { icon: <FaNewspaper />, counter: postCount, title: 'Posts' },
  ];

  return (
    <div className='content flex flex-col relative'>
      <div className='flex justify-between px-20 '>
        {cardsData.map((card, index) => (
          <div key={index} className="card bg-secondary w-[14rem] flex items-center border border-gray-300 rounded-md p-4 shadow-md">
            <div className="icon-container bg-primary rounded-md p-4 text-secondary mr-4 text-2xl">
              {card.icon}
            </div>
            <div className='flex flex-col'>
              <p className="text-lg font-bold">{card.counter}</p>
              <p className="text-sm">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto my-8 flex items-center justify-center gap-8 bg-secondary shadow-md px-6 py-4 w-[85%] h-auto rounded-md">
        <div className="w-2/3 h-80">
          <canvas ref={barChartRef}></canvas>
        </div>
        <div className="w-1/3 h-80">
          <canvas ref={doughnutChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;
