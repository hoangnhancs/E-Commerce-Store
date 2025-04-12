import { Button } from "@mui/material"
import { Product } from "../../lib/types"
import ProductList from "../products/ProductList"

type Props = {
  products: Product[]
}

export default function ProductCatalog({products}: Props) {
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">Add Product</Button>
    </>
  )
}
