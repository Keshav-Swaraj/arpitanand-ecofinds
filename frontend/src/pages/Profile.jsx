export default function Profile() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-300"></div>
          <div>
            <h3 className="font-bold">John Doe</h3>
            <p className="text-gray-600">johndoe@email.com</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">My Listings</h3>
        <div className="space-y-3">
          <div className="p-4 border rounded-lg flex justify-between">
            <span>Old Book Collection</span>
            <span className="text-green-600">₹300</span>
          </div>
          <div className="p-4 border rounded-lg flex justify-between">
            <span>Vintage Lamp</span>
            <span className="text-green-600">₹800</span>
          </div>
        </div>
      </div>
    </div>
  );
}