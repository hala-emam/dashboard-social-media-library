
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaStar, FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AddBookModal from '../../components/AddBook';
import BookDetailsModal from '../../components/BookDetails';
import EditBookModal from './../../components/EditBook/index';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [editBookId, setEditBookId] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('http://localhost:9000/books');
        if (Array.isArray(response.data.Data)) {
          setBooks(response.data.Data);
          setStatus('succeeded');
        } else {
          throw new Error('Expected an array of books');
        }
      } catch (error) {
        setStatus('failed');
        setError(error.message);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid book ID');
      return;
    }

    Swal.fire({
      title: 'Are you sure of the deletion ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:9000/books/${id}`);
          setBooks(books.filter((book) => book._id !== id));
          Swal.fire(
            'Deleted!',
            'Your book has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      }
    });
  };

  const handleEdit = (id) => {
    const bookToEdit = books.find((book) => book._id === id);
    setSelectedBook(bookToEdit);
    setEditBookId(id);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/books/single/${id}`);
      setSelectedBook(response.data.data);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleDownloadNewBook = () => {
    setIsModalOpen(true);
  };

  const handleSaveBook = (newBook) => {
    setBooks([newBook, ...books]);
  };

  const handleUpdateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book._id === updatedBook._id ? updatedBook : book
    );
    setBooks(updatedBooks);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10 px-20">
      <div className="flex justify-between items-end mb-6">
        <button
          onClick={handleDownloadNewBook}
          className="flex items-center text-green-900 font-bold outline p-2  rounded-md px-4 "
        >
          <FaDownload className="mr-2" />
          Add New Book
        </button>
      </div>
      <div className="flex flex-wrap -mx-4">
        {currentBooks.map((book) => (
          <div key={book._id} className="w-full md:w-1/4 px-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <img
                src={`http://localhost:9000/image/${book.cover}`}
                alt={book.title}
                className="w-32 h-32 rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
              <button className="text-yellow-500 font-extrabold text-2xl">
                <div className='flex gap-2 py-4'><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
              </button>
              <div className="flex items-center space-x-4 mb-4">
                <button className="text-blue-500 font-extrabold text-2xl" onClick={() => handleViewDetails(book._id)}>
                  <FaEye />
                </button>
                <button className="text-green-500 font-extrabold text-2xl px-2" onClick={() => handleEdit(book._id)}>
                  <FaEdit />
                </button>
                <button className="text-red-500 font-extrabold text-2xl" onClick={() => handleDelete(book._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
            <li key={index + 1}>
              <button
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-green-900 text-white' : 'bg-white text-green-900'}`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBook}
      />
      <BookDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        book={selectedBook}
      />
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateBook}
        book={selectedBook}
      />
    </div>
  );
};

export default Books;

