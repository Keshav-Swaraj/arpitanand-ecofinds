export default function Signup() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg" />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">Signup</button>
        </form>
      </div>
    </div>
  );
}