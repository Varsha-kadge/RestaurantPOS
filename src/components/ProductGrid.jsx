
import { useCart } from "../context/useCart";
//import { products } from "../data/products";

function ProductGrid({ products }) {
    const { addToCart } = useCart();
    //const filteredProducts =
    //selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);
  return (
    <div className="flex-1 p-4 overflow-y-auto grid grid-cols-6 gap-3">
      {products.map((product) => (
        <div
          key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 cursor-pointer"
              onClick={() => addToCart(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl h-30 w-full object-cover"
          />
          <h3 className="mt-3 font-semibold">{product.name}</h3>
          <p className="text-orange-500 font-bold">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;