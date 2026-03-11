import { useState , useEffect} from "react";
import Sidebar from "./Layout/Sidebar";
import Topbar from "./Layout/TopBar";
import ProductGrid from "./components/ProductGrid";
import BillPanel from "./components/BillPanel";
//import { products } from "./data/products";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:6035/bo-pos/getItemData?storeId=2&categorieId=2"
        );
  
        const data = await response.json();
  
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchItems();
  }, [selectedCategory]);
   const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.categorieId === selectedCategory.categorieId;
   const matchesSearch = product.item.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>

      <div className="flex-1 flex flex-col">
        <Topbar onCatClick={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}/>

        <div className="flex flex-1 overflow-hidden">
          <ProductGrid products={filteredProducts} />
          <BillPanel/>
        </div>
      </div>
    </div>
  );
}

export default App;