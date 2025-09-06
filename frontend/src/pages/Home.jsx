import { Link } from "react-router-dom";

const dummyProducts = [
  { id: 1, title: "Vintage Lamp", price: "₹800", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Second-Hand Chair", price: "₹1200", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Old Books", price: "₹300", image: "https://via.placeholder.com/150" },
];

export default function Home() {
  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <input type="text" placeholder="Search items..." className="border p-3 rounded-lg w-2/3" />
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Filter</button>
      </div>
      <h2 className="text-xl font-bold mb-4">Latest Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="mt-3 font-semibold">{product.title}</h3>
            <p className="text-green-600 font-bold">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}