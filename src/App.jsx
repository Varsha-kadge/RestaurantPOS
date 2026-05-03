import { useState , useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import BillingPage from "./pages/BillingPage";
import SearchPanel from "./pages/SearchPanel"
import Layout from "./pages/Layout"
import LoginPage from "./pages/Login"

function App() {
const [selectedCategory, setSelectedCategory] = useState("All");
const [searchTerm, setSearchTerm] = useState("");
const [products, setItems] = useState([]);
const [restoInfo, setRestoInfo] = useState([]);
const [selectedStoreID, setSlectedStoreID] = useState("");


const handleChildData = (data) => {
    setSlectedStoreID(data); // 👈 receive data from child
    console.log(selectedStoreID,'selectedStoreID22')
  };
  useEffect(() => {
    const fetchItems = async () => {
      console.log(selectedStoreID,'selectedStoreID')
      if(selectedStoreID){
    try {
      const response = await fetch(
        "http://localhost:6035/bo-pos/getItemData?storeId="+selectedStoreID,
        {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
      );
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error:", error);
    }
      }
  };
    const fetchRestoInfo = async () => {
      if(selectedStoreID){
      try {
        const response = await fetch(
          "http://localhost:6035/bo-pos/getRestaurantData?storeId="+selectedStoreID,
          {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
        );
      const data = await response.json();
        setRestoInfo(data);
      } catch (error) {
        console.error(error);
      }
    }
    };
    fetchItems();
    fetchRestoInfo();
  }, [selectedStoreID]);
   const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.categorieId === selectedCategory.categorieId;
   const matchesSearch = product.item.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
 
  return (
   <Routes>
  {/* If no store selected → Login */}
  {!selectedStoreID ? (
    <Route
      path="*"
      element={<LoginPage sendData={handleChildData}/>}
    />
  ) : (
    <Route
      path="/"
      element={
        <Layout
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStoreID={selectedStoreID}
          setSlectedStoreID={setSlectedStoreID}
          menuItems={products}
          restoInfo={restoInfo}
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
      />
    </Route>
  )}
</Routes>
  )
}

export default App;