import Topbar from "../components/TopBar";
import ProductGrid from "../components/ProductGrid";
import BillPanel from "../components/BillPanel";

export default function BillingPage({
  filteredProducts,
  restoInfo
}) {
   return (
    <div className="flex h-screen bg-gray-100">
     {/* <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Topbar
          onCatClick={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        /> */}

        <div className="flex flex-1 overflow-y-auto">
          <ProductGrid products={filteredProducts} />
          <BillPanel restaurantInfo={restoInfo} />
        </div>

    </div>
  );
}

//export default BillingPage;