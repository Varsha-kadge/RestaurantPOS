import BillPanel from "./BillPanel"
import { useCart } from "../context/useCart";
function BillPanelGrid({restoInfo}){
const { selectedTable, setSelectedTable } = useCart();

return(
  <div className="grid grid-cols-3 gap-4">

  <div
    onClick={() => setSelectedTable("Table 2")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 2"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 2"
      restaurantInfo={restoInfo}
    />
  </div>

  <div
    onClick={() => setSelectedTable("Table 3")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 3"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 3"
      restaurantInfo={restoInfo}
    />
  </div>

  <div
    onClick={() => setSelectedTable("Table 4")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 4"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 4"
      restaurantInfo={restoInfo}
    />
  </div>

  <div
    onClick={() => setSelectedTable("Table 5")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 5"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 5"
      restaurantInfo={restoInfo}
    />
  </div>

</div>
)
}
export default BillPanelGrid;