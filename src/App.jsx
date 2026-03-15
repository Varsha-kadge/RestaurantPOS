import { useState , useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import BillingPage from "./pages/BillingPage";
import SearchPanel from "./pages/SearchPanel"
import Layout from "./pages/Layout"

function App() {
    const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setItems] = useState([]);
  const [restoInfo, setRestoInfo] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
    try {
      const response = await fetch(
        "https://bryce-unseducible-zaida.ngrok-free.dev/bo-pos/getItemData?storeId=2&categorieId=2"
      );
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
    const fetchRestoInfo = async () => {
      try {
        const response = await fetch(
          "https://bryce-unseducible-zaida.ngrok-free.dev/bo-pos/getRestaurantData?storeId=2"
        );
      const data = await response.json();
        setRestoInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
    fetchRestoInfo();
  }, [selectedCategory]);
   const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.categorieId === selectedCategory.categorieId;
   const matchesSearch = product.item.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
 
  return (
    <Routes>
  <Route
    path="/"
    element={
      <Layout
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    }
  >
    <Route
      index
      element={
        <BillingPage
          filteredProducts={filteredProducts}
          restoInfo={restoInfo}
        />
      }
    />

    <Route
      path="add-item"
      element={
        <SearchPanel
          menuItems={products}
          restoInfo={restoInfo}
        />
      }
    />
  </Route>
</Routes>
  )
}

export default App;