import React from 'react';
import { FaStar } from 'react-icons/fa';
const BookDetailsModal = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4">{book.title}</h2>
        <img 
          src={`http://localhost:9000/image/${book.cover}`} 
          alt={book.title} 
          className="w-32 h-32 rounded-lg mb-4"
        />
        <p className="mb-2 font-bold" >Summery</p>
        <p className="mb-4">{book.description}</p>
        <div className="flex items-center mb-4">
          <span className="font-bold">Category: </span>
          <span className="ml-2">{book.category}</span>
        </div>
        <div className="flex items-center">
        </div>
        <div className="flex gap-2 py-4">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className="text-yellow-500 font-extrabold text-2xl" />
          ))}
        </div>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookDetailsModal;
