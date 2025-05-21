import { ProductsPages } from "./products"
import { StationsPages } from "./stations"

const ProductsStationsPages = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            <ProductsPages />
            <StationsPages />
        </div>
    )
}

export default ProductsStationsPages
