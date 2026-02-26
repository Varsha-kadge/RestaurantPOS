import { useState } from "react";
import Sidebar from "./Layout/Sidebar";
import Topbar from "./Layout/TopBar";
import ProductGrid from "./components/ProductGrid";
import BillPanel from "./components/BillPanel";
import { products } from "./data/products";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

   const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar onCatClick={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}/>

        <div className="flex flex-1 overflow-hidden">
          <ProductGrid products={filteredProducts} />
          <BillPanel />
        </div>
      </div>
    </div>
  );
}

export default App;