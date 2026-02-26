function Sidebar() {
  return (
    <div className="w-20 bg-white shadow-md flex flex-col items-center py-6 space-y-8">
      <div className="text-orange-500 text-xl font-bold">POS</div>
      <button className="text-gray-500 hover:text-orange-500">🏠</button>
      <button className="text-gray-500 hover:text-orange-500">📋</button>
      <button className="text-gray-500 hover:text-orange-500">📊</button>
      <button className="text-gray-500 hover:text-orange-500">⚙️</button>
    </div>
  );
}

export default Sidebar;