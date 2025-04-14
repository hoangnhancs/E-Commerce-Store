import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../lib/types";
import { Link } from "react-router-dom";
import discount from '../../assets/discount.png';


type Props = {
    product: Product
}

export default function ProductCard({product}: Props) {
  return (
    <Card
        elevation={3}    
        sx={{
            position: 'relative',
            height: 400,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'visible', // Để hiển thị phần thẻ giảm giá bên ngoài
        }}
    >
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: -4,
                color: 'white',
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                width: {
                    xs: '80px',    // Màn hình nhỏ
                    sm: '90px',    // Tablet
                    md: '100px',   // Desktop
                },
                height: {
                    xs: '32px',
                    sm: '36px',
                    md: '40px',
                },
                alignItems: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center',
                backgroundImage: `url(${discount})`,
                
            }}
        >
            <Typography 
                variant="subtitle2" 
                sx={{
                    fontSize: {
                        xs: '0.6rem',
                        sm: '0.7rem',
                        md: '0.8rem',
                    }, 
                    transform:'translateY(-2px)'
                }}
            >
                Giảm 4%
            </Typography>    
        </Box>
        <CardMedia
            component="img"
            sx={{
                height: 230,
                backgroundSize: 'cover',
                
            }}
            image={product.imageUrl}
        >
        </CardMedia>
        <CardContent
            sx={{
                flexGrow: 1,
                minHeight: 50,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,     // Khoảng cách giữa các Typography
                alignItems: 'flex-start'  // Căn chỉnh các phần tử con từ đầu
            }}
        >
            <Typography
                gutterBottom
                sx={{
                    textTransform: "uppercase",
                    width: '100%',  // Chiếm toàn bộ chiều rộng
                    minHeight: '2.5em',  // Chiều cao tối thiểu 2 dòng
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: 0  // Loại bỏ margin mặc định
                
                }}
                variant="subtitle2"
            >
                {product.name}
            </Typography>
            <Typography
                sx={{
                    color: 'secondary.main',
                    marginTop: 'auto',  // Đẩy xuống dưới cùng  
                }}
                variant="h6"
            >
                ${(product.price / 100).toFixed(2)}
            </Typography>
        </CardContent>
        <CardActions
            sx={{
                justifyContent: 'space-between', 
                height: 50,
                paddingTop: 0,
            }}
        >
            <Button >Add to cart</Button>
            <Button component={Link} to={`/products/${product.id}`}>View</Button>
        </CardActions>
    </Card>
  )
}