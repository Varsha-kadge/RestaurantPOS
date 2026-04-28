
import { useCart } from "../context/useCart";

//import { products } from "../data/products";

function ProductGrid({ products }) {
    const { addToCart } = useCart();
    //const filteredProducts =
    //selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);
    console.log(products,'products')
  if (products.length !== 0) {
    return (
    <div className="flex-1 p-4 overflow-y-auto grid grid-cols-6 gap-3">
      
      {products.map((product) => (
      <div
          key={product.itemId}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 cursor-pointer"
              onClick={() => addToCart(product)}
        >
          {/* <img
            src={product.image}
            alt={product.item}
            className="rounded-xl h-30 w-full object-cover"
          /> */}
          <h3 className="mt-3 font-semibold">{product.item}</h3>
          <p className="text-orange-500 font-bold">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
  } else {
    return (
      <div className="flex-1 p-4 overflow-y-auto grid grid-cols-7 mt-2 mr-3 gap-3 bg-white">
            <h1>No Data Found</h1>
      </div>
    )
  }
    
}

export default ProductGrid;