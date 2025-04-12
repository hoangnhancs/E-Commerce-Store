import { Box, Grid } from "@mui/material"
import { Product } from "../../lib/types"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[]
}

export default function ProductList({products}: Props) {
  return (
    <Box
       sx={{ flexGrow: 1,}} 
    >
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 2, sm: 9, md: 12 }}>
            {products.map((product) => (
                <Grid 
                    size={{ xs: 1, sm: 3, md: 3 }} 
                    key={product.id}
                >
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    </Box>
    
  )
}