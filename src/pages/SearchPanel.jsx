import { useState } from "react";
import { useCart } from "../context/useCart";

export default function AddItem({ menuItems, restoInfo }) {

  const [search, setSearch] = useState("");
  const [qty, setQty] = useState({});
  const { addToCart } = useCart();
  const filteredItems = menuItems.filter(item =>
    item.item.toLowerCase().includes(search.toLowerCase())
  );

  const handleQtyChange = (id, value) => {
    setQty({ ...qty, [id]: value });
  };

  const handleAdd = (item) => {
  
    const quantity = qty[item.itemId] || 1;

    addToCart({
      storeId:item.storeId,
      categorieId:item.categorieId,
      itemId:item.itemId,
      item: item.item,
      price: item.price,
      gst:item.gst,
      qty: Number(quantity)
    });

    setSearch("");
  };

  return (
    <div className="w-80 relative">

  <input
    type="text"
    placeholder="Search item..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-2 w-full"
  />

  {search && (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">

      {filteredItems.map((item) => (
        <div
          key={item.itemId}
          className="flex items-center justify-between p-2 hover:bg-gray-50"
        >
          <span>{item.item}</span>

        <input
  type="number"
  min="1"
  placeholder="1"
  value={qty[item.itemId] || ""}
  onChange={(e) => handleQtyChange(item.itemId, e.target.value)}
  onBlur={(e) => handleQtyChange(item.itemId,e.target.value)} // ✅ reliable
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.target.blur(); // ✅ forces blur
    }
  }}
  className="w-12 border rounded text-center"
/>

          <button
            onClick={() => handleAdd(item)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Add
          </button>
        </div>
      ))}

    </div>
  )}
</div>
  );
}