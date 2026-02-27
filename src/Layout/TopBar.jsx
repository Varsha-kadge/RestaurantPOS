import { categories } from "../data/categories";

function Topbar({ onCatClick,searchTerm, setSearchTerm }) {
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center flex-wrap gap-1">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-lg px-4 py-2 w-1/4"
      />

      <button
        onClick={() => onCatClick("All")}
        className="bg-gray-500 text-white px-2 py-1 rounded-lg cursor-pointer"
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          className="bg-orange-500 text-white px-2 py-1 rounded-lg cursor-pointer"
          onClick={() => onCatClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Topbar;