import { Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi"

export default function BasketPage() {
    const {data, isLoading} = useFetchBasketQuery();

    if (isLoading) return <Typography variant="h4">Loading...</Typography>
    
    if (!data) return <Typography variant="h4">No items in your basket</Typography> 
    
    return (
        <div>{data.items[0].productName}</div>
    )
}