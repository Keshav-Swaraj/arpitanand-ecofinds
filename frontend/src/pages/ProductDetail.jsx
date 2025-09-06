import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  return (
    <div className="px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img src="https://via.placeholder.com/400" alt="Product" className="w-full h-80 object-cover rounded-lg" />
        <h2 className="text-2xl font-bold mt-4">Product #{id}</h2>
        <p className="text-gray-600 mt-2">This is the detailed description of the product.</p>
        <p className="text-green-600 font-bold text-lg mt-4">₹1000</p>
        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">Contact Seller</button>
      </div>
    </div>
  );
}