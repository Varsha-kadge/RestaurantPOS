
import { useCart } from "../context/useCart";
import itemImages from "../Utils/itemImages";
import defaultImg from "../../public/images/Default_food.jpg"

//import { products } from "../data/products";

function ProductGrid({ products }) {
    const { addToCart,selectedTable } = useCart();
    //const filteredProducts =
    //selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);
  if (products.length !== 0) {
    return (
    <div className="flex-1 p-4 overflow-y-auto m-3 grid grid-cols-6 gap-3">
      
      {products.map((product) => (
      <div
          key={product.itemId}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 cursor-pointer"
              onClick={() => addToCart(selectedTable ,product)}
        >
          <img
          src={
        itemImages[product.itemId] || defaultImg}

            alt={product.item}
            className="rounded-xl h-30 w-full object-cover"
          />
          <h3 className="mt-3 font-semibold">{product.item}</h3>
          <p className="text-orange-500 font-bold">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
  } else {
    return (
      <div className="flex-1 p-4 overflow-y-auto grid grid-cols-7 m-3 gap-3 bg-white">
            <h1>No Data Found</h1>
      </div>
    )
  }
    
}

export default ProductGrid;