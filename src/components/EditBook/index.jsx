
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBookModal = ({ isOpen, onClose, book, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setDescription(book.description || '');
      setCategory(book.category || '');
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (cover) formData.append('cover', cover);
    if (pdf) formData.append('Pdf', pdf);

    try {
      const response = await axios.put(`http://localhost:9000/books/${book._id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSave(response.data);
      onClose(); 
    } catch (error) {
      console.error('Error updating book:', error);
      setError('Failed to update book. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Book Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cover</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">PDF</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => setPdf(e.target.files[0])}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 bg-gray-600 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              SaveTheEdit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditBookModal;
