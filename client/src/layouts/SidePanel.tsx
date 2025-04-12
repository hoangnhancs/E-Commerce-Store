import { Box, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface Category {
    id: number;
    name: string;
}

// Data mẫu
const categories: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
    // ...thêm các danh mục khác
];

const bannerItems = [
    {
        image: "/images/banner1.jpg",
        title: "Summer Sale"
    },
    {
        image: "/images/banner2.jpg",
        title: "New Arrivals"
    },
    // ...thêm các banner khác
];

export default function SidePanel() {
    return (
        <Box 
            sx={{
                width: 280,
                position: 'fixed',
                top: 90, // Để tránh bị NavBar che
                left: 20,
                height: 'calc(100vh - 100px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            {/* Categories Section */}
            <Paper elevation={3}>
                <Typography 
                    variant="h6" 
                    sx={{ p: 2, borderBottom: '1px solid #eee' }}
                >
                    Categories
                </Typography>
                <List>
                    {categories.map((category) => (
                        <ListItem 
                            component={'button'} 
                            key={category.id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            <ListItemText primary={category.name} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Advertisement Carousel */}
            <Paper 
                elevation={3}
                sx={{ 
                    flex: 1,
                    overflow: 'hidden',
                    minHeight: 300
                }}
            >
                <Carousel
                    animation="slide"
                    interval={4000}
                    indicators={true}
                    navButtonsAlwaysVisible={true}
                >
                    {bannerItems.map((item, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    ))}
                </Carousel>
            </Paper>
        </Box>
    );
}