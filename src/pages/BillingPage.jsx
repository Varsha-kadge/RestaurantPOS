import ProductGrid from "../components/ProductGrid";
import BillPanel from "../components/BillPanel";
import { useCart } from "../context/useCart";

export default function BillingPage({
  filteredProducts,
  restoInfo
}) {
  const { selectedTable, setSelectedTable } = useCart();

   return (
    <div className="flex h-screen bg-gray-100">
        <div className="flex flex-1 overflow-y-auto">
          <ProductGrid products={filteredProducts} />
          <div
    onClick={() => setSelectedTable("Table 1")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 1"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
          <BillPanel tableId="Table 1" restaurantInfo={restoInfo} />
          </div>
        </div>

    </div>
  );
}

//export default BillingPage;