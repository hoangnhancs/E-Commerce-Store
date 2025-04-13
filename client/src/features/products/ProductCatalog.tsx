import { Box, Button } from "@mui/material"
import { Product } from "../../lib/types"
import ProductList from "../products/ProductList"
import { useEffect, useState } from "react"
import SidePanel from "../../layouts/SidePanel"

export default function ProductCatalog() {
  
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
      fetch('https://localhost:5001/api/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <Box>
      <SidePanel />
      <ProductList products={products} />
      <Button variant="contained">Add Product</Button>
    </Box>
  )
}
