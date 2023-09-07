import "./Products.css"
import Filter from "../components/filters/Filter";
import Product from "../components/Product/Product";

export default function Products() {
  return (
    <div className="Products-container">
        <Filter/>
        <Product/>
    </div>
  )
}
