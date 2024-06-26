
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddBookModal = ({ isOpen, onClose, onSave }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [cover, setCover] = useState(null);
//   const [pdf, setPdf] = useState(null);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [authorId, setAuthorId] = useState('');
//   const [authors, setAuthors] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/books/categories');
//         setCategories(response.data.data); 
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     if (isOpen) {
//       fetchCategories();
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/authors');
//         setAuthors(response.data.Data); 
//         console.log(response.data.Data);
//       } catch (error) {
//         console.error('Error fetching authors:', error);
//       }
//     };
//     if (isOpen) {
//       fetchAuthors();
//     }
//   }, [isOpen]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('category', category);
//     formData.append('authorId', authorId);
//     formData.append('cover', cover);
//     formData.append('pdf', pdf);

//     try {
//       console.log("dhjkkldd");
//       const response = await axios.post('http://localhost:9000/books', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       onSave(response.data);
//       console.log('hhhhhhhhh',response.data);

//       onClose();
//     } catch (error) {
//       console.error('Error adding book:', error);
//       setError('Failed to add book. Please try again.');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg w-1/2">
//         <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Book Name</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Description</label>
//             <textarea
//               className="w-full p-2 border rounded"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Category</label>
//             {categories.length > 0 ? (
//               <select
//                 className="w-full p-2 border rounded"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//               >
//                 <option value="">Select a category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             ) : (
//               <p>Loading categories...</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Author</label>
//             {authors.length > 0 ? (
//               <select
//                 className="w-full p-2 border rounded"
//                 value={authorId}
//                 onChange={(e) => setAuthorId(e.target.value)}
//                 required
//               >
//                 <option value="">Select author</option>
//                 {authors.map((auth) => (
//                   <option key={auth._id} value={auth._id}>{auth.name}</option>
//                 ))}
//               </select>
//             ) : (
//               <p>Loading authors...</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Cover</label>
//             <input
//               type="file"
//               className="w-full p-2 border rounded"
//               onChange={(e) => setCover(e.target.files[0])}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">PDF</label>
//             <input
//               type="file"
//               className="w-full p-2 border rounded"
//               onChange={(e) => setPdf(e.target.files[0])}
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               className="mr-4 px-4 py-2 bg-gray-600 text-white rounded"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBookModal;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBookModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:9000/books/categories');
        setCategories(response.data.data); // Assuming response structure is { data: [] }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:9000/authors');
        setAuthors(response.data.Data); 
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    if (isOpen) {
      fetchAuthors();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('authorId', authorId);
    formData.append('cover', cover);
    formData.append('Pdf', pdf);    

    try {
      const response = await axios.post('http://localhost:9000/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
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
            {categories.length > 0 ? (
              <select
                className="w-full p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            {authors.length > 0 ? (
              <select
                className="w-full p-2 border rounded"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                required
              >
                <option value="">Select author</option>
                {authors.map((auth) => (
                  <option key={auth._id} value={auth._id}>{auth.name}</option>
                ))}
              </select>
            ) : (
              <p>Loading authors...</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cover</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => setCover(e.target.files[0])}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">PDF</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => setPdf(e.target.files[0])}
              required
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
              className="px-4 py-2 bg-green-900 text-white rounded"
            >
             Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
