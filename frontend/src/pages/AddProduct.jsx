import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../api.js';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let productData;
      
      if (selectedFile) {
        console.log('Creating product with file upload:', selectedFile.name);
        // If file is selected, use FormData
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('image', selectedFile);
        
        productData = formDataToSend;
      } else {
        console.log('Creating product with URL:', formData.image);
        // If no file, use regular JSON
        productData = {
          ...formData,
          price: parseFloat(formData.price)
        };
      }
      
      console.log('Sending product data:', productData);
      const response = await productsAPI.create(productData);
      console.log('Product creation response:', response.data);
      
      if (response.data && response.data._id) {
        setSuccess('Product added successfully!');
      } else {
        throw new Error('Invalid response from server');
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
      });
      setSelectedFile(null);
      setImagePreview(null);
      
      // Clear the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Add New Product</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <input 
            type="text" 
            name="title"
            placeholder="Product Title" 
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
          />
          <textarea 
            name="description"
            placeholder="Product Description" 
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows="4"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="category"
              placeholder="Category" 
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <input 
              type="number" 
              name="price"
              placeholder="Price (₹)" 
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            {imagePreview && (
              <div className="mt-3 flex justify-center">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border shadow-sm"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500 mb-2">Or enter image URL:</p>
              <input 
                type="url" 
                name="image"
                placeholder="Image URL" 
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-semibold"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}