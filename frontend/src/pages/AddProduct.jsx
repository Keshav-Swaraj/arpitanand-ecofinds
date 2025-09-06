export default function AddProduct() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Product Title" className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Product Description" className="w-full p-3 border rounded-lg"></textarea>
          <input type="text" placeholder="Category" className="w-full p-3 border rounded-lg" />
          <input type="number" placeholder="Price" className="w-full p-3 border rounded-lg" />
          <input type="file" className="w-full p-3 border rounded-lg" />
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">Add Product</button>
        </form>
      </div>
    </div>
  );
}