import { Box, Button, Container, Divider, Grid, Paper, Typography, Checkbox, IconButton } from "@mui/material";
import { useFetchBasketQuery, useRemoveBasketItemMutation } from "./basketApi"
import { Item } from "../../lib/types";
import { useEffect, useState } from "react";
import { Add, Delete, Remove } from "@mui/icons-material";



export default function BasketPage() {

    const {data: basket, isLoading} = useFetchBasketQuery()
    const [removeItemFromBasket] = useRemoveBasketItemMutation()

    const [groupedItems, setGroupedItems] = useState<Record<string, Item[]>>({})
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

    useEffect(() => {
        if (basket?.items) {
            const groupedByCategory = basket.items.reduce((groups, item) => {
                const category = item.category || 'Other'
                if (!(item.category in groups)){
                    groups[category] = []
                }
                groups[category].push(item)
                return groups
            }, {} as Record<string, Item[]>)
            setGroupedItems(groupedByCategory)
        }
    }, [basket])

    const toogleSelectItem = (productId: string) => {
        const tmpSelectedItems = new Set(selectedItems)
        if (tmpSelectedItems.has(productId)) {
            tmpSelectedItems.delete(productId)
        } else {
            tmpSelectedItems.add(productId)
        }
        setSelectedItems(tmpSelectedItems)
    }

    const isCategorySelectedAll = (category: string) => {
        const itemsGroupedByCategory = groupedItems[category] || []
        return itemsGroupedByCategory.every(item => selectedItems.has(item.productId))
    }

    const toogleSelectCategory = (category: string) => {
        const itemsGroupedByCategory = groupedItems[category] || []
        const tmpSelectedItems = new Set(selectedItems)
        if (isCategorySelectedAll(category)) {
            itemsGroupedByCategory.forEach(item => tmpSelectedItems.delete(item.productId))
        } else {
            itemsGroupedByCategory.forEach(item => tmpSelectedItems.add(item.productId))
        }
        setSelectedItems(tmpSelectedItems)
    }

    const isSelectedAllItems = () => {
        if (selectedItems.size > 0 && selectedItems.size === basket?.items.length) {
            return true
        }
        return false
    }

    const toogleSelectAllItems = () => {
        const tmpSelectedItems = new Set(selectedItems)
        if (isSelectedAllItems())
            setSelectedItems(new Set())
        else
        {
            basket?.items.forEach(item => tmpSelectedItems.add(item.productId))
            setSelectedItems(tmpSelectedItems)
        }   
    }

    const getTotalPrice = () => {
        let total = 0
        basket?.items.forEach(item => {
            if (selectedItems.has(item.productId))   
                (total += item.price * item.quantity)
        })
        return total
    }


    if (isLoading) return <Typography variant="h4">Loading...</Typography>

    if (!basket || basket.items.length === 0) 
    return (
      <Container>
        <Typography variant="h4" sx={{ my: 4, textAlign: 'center' }}>
          Giỏ hàng của bạn đang trống
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          href="/products"
          sx={{ maxWidth: 300, mx: 'auto', display: 'block' }}
        >
          Tiếp tục mua sắm
        </Button>
      </Container>
    );
    
    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4, textAlign: 'center' }}>
                Giỏ hàng của bạn
            </Typography>
            {/* Header */}
            <Paper elevation={3} sx={{ p: 2, mb: 2,}}>
                <Box
                    sx={{
                        width: '100%',
                    }}                    
                >
                    <Grid container spacing={0}>
                        <Grid
                            size={0.5}
                            sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                p: 0.5,
                            }}
                        >
                            <Checkbox checked={isSelectedAllItems()} onChange={() => toogleSelectAllItems()} />
                        </Grid>
                        <Grid
                            size={5}
                            sx={{
                                display: 'flex',                                                                        
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                alignItems: 'center',
                                p: 0.5,
                            }}
                        >
                            <Typography sx={{textAlign: 'left'}}>Sản phẩm</Typography>
                        </Grid>
                        <Grid
                            size={1}
                            sx={{
                                display: 'flex',                                                                        
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 0.5,
                            }}
                        >
                            <Typography>Đơn giá</Typography>
                        </Grid>
                        <Grid
                            size={2.5}
                            sx={{
                                display: 'flex',                                                                        
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 0.5,
                            }}
                        >
                            <Typography>Số lượng</Typography>
                        </Grid>
                        <Grid
                            size={2}
                            sx={{
                                display: 'flex',                                                                        
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 0.5,
                            }}
                        >
                            <Typography>Thành tiền</Typography>
                        </Grid>
                        <Grid
                            size={1}
                            sx={{
                                display: 'flex',                                                                        
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 0.5,
                            }}
                        >
                            <Typography>Thao tác</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/*Items*/}
            {Object.entries(groupedItems).map(([category, items]) => (
                <Paper elevation={3} sx={{ p: 2, mb: 2 }} key={category}>                
                    <Box
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 1, 
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',

                            }}
                        >
                            <Grid container spacing={0}>
                                <Grid
                                    size={0.5}
                                    sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        p: 0.5,
                                    }}
                                >
                                    <Checkbox checked={isCategorySelectedAll(category)} onChange={() => toogleSelectCategory(category)} />
                                </Grid>
                                <Grid
                                    size={4.5}
                                    sx={{
                                        display: 'flex',                                                                        
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        alignItems: 'center',
                                        p: 0.5,
                                    }}
                                >
                                    <Typography sx={{textAlign: 'left'}}>{category}</Typography>
                                </Grid>                        
                            </Grid>
                            <Divider />
                        </Box>
                        {items.map(item => (
                            <Box
                                key={item.productId}
                                sx={{ 
                                    width: '100%',
                                }}
                            >
                                <Grid container spacing={0}>
                                    <Grid
                                        size={0.5}
                                        sx={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            p: 0.5,
                                        }}
                                    >
                                        <Checkbox checked={selectedItems.has(item.productId)} onChange={() => toogleSelectItem(item.productId)} />
                                    </Grid>
                                    <Grid                             
                                        size={1.5}
                                        sx={{                                                                         
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            p: 0.5,
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            sx={{ 
                                                width: 100, 
                                                height: 100, 
                                                borderRadius: 2,
                                                objectFit: 'cover',
                                                
                                            }}
                                        />
                                    </Grid> 
                                    <Grid
                                        size={3.5}
                                        sx={{
                                            display: 'flex',                                                                        
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            alignItems: 'center',
                                            p: 0.5,
                                        }}
                                    >
                                        <Typography sx={{textAlign: 'left'}}>{item.productName}</Typography>
                                    </Grid>
                                    <Grid
                                        size={1}
                                        sx={{
                                            display: 'flex',                                                                        
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            p: 0.5,
                                        }}
                                    >
                                        <Typography>{item.price}</Typography>
                                    </Grid>
                                    <Grid
                                        size={2.5}
                                        sx={{
                                            display: 'flex',                                                                        
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            alignItems: 'center',
                                            p: 0.5,
                                        }}
                                    >
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{width: '100%',}}>
                                            <IconButton 
                                                size="small" 
                                                sx={{ 
                                                    border: '1px solid', 
                                                    borderColor: 'divider',
                                                    borderRadius: 0,
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: '0.85rem' // Icon nhỏ hơn
                                                    } 
                                                }}
                                            >
                                                <Remove sx={{borderRadius: 0}} />
                                            </IconButton>
                                            
                                            <Typography 
                                                sx={{
                                                    textAlign: 'center',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRight: 0, 
                                                    borderLeft: 0, 
                                                    minWidth: 40,
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                {item.quantity}                                            
                                            </Typography>
                                            
                                            <IconButton 
                                                size="small" 
                                                sx={{ 
                                                    border: '1px solid',
                                                    borderColor: 'divider', 
                                                    borderRadius: 0,
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: '0.85rem' // Icon nhỏ hơn
                                                    } 
                                                }}
                                            >
                                                <Add sx={{borderRadius: 0}} />
                                            </IconButton>
                                        </Box>
                                        
                                    </Grid>
                                    <Grid
                                        size={2}
                                        sx={{
                                            display: 'flex',                                                                        
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            p: 0.5,
                                        }}
                                    >
                                        <Typography>{item.quantity * item.price}</Typography>
                                    </Grid>
                                    <Grid
                                        size={1}
                                        sx={{
                                            display: 'flex',                                                                        
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            alignItems: 'center',
                                            p: 0.5,
                                        }}
                                    >
                                        <Button 
                                            color="error" 
                                            startIcon={<Delete />} 
                                            onClick={() => removeItemFromBasket({productId: item.productId, quantity: item.quantity})}
                                        >
                                            Xóa
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Box>                   
                        ))}  
                    </Box>
                </Paper>
            ))}
            <Paper
                elevation={6}
                sx={{ 
                    position: 'sticky',
                    bottom: 0,        
                    p: 2,
                    boxShadow: 3
                }}
            >
                <Box sx={{ bgcolor: 'background.paper'}} display={'flex'} justifyContent='space-between' alignItems={'center'}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox 
                            checked={isSelectedAllItems()} 
                            onChange={() => toogleSelectAllItems()} 
                        />
                        <Typography>Chọn tất cả ({basket?.items.length})</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 2 }}>
                        Tổng tiền: {getTotalPrice()} VND
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        disabled={selectedItems.size === 0}
                    >
                        Thanh toán ({selectedItems.size} sản phẩm)
                    </Button>
                </Box>
            </Paper> 
        </Container>
    )
}