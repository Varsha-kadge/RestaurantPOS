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

  <div
    onClick={() => setSelectedTable("Table 6")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 6"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 6"
      restaurantInfo={restoInfo}
    />
  </div>
  <div
    onClick={() => setSelectedTable("Table 7")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 7"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 7"
      restaurantInfo={restoInfo}
    />
  </div>
  <div
    onClick={() => setSelectedTable("Table 8")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 8"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 8"
      restaurantInfo={restoInfo}
    />
  </div>
  <div
    onClick={() => setSelectedTable("Table 9")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 9"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 9"
      restaurantInfo={restoInfo}
    />
  </div>
  <div
    onClick={() => setSelectedTable("Table 10")}
    className={`border-2 rounded cursor-pointer ${
      selectedTable === "Table 10"
        ? "border-green-500"
        : "border-gray-300"
    }`}
  >
    <BillPanel
      tableId="Table 10"
      restaurantInfo={restoInfo}
    />
  </div>

</div>
)
}
export default BillPanelGrid;