import { StoreMallDirectory, DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Container, Divider, IconButton, List, Toolbar, Typography } from "@mui/material";
import MenuItemLink from "../components/MenuItemLink";
import { NavLink } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useMediaQuery, useTheme, Drawer } from "@mui/material";
import { useState } from "react";

const midLinks = [
    {title: 'products', path: '/products'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
    {title: 'counter', path: '/counter'},
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},

]

type Props = {
    darkMode: boolean,
    changeTheme: () => void 
}

export default function NavBar({changeTheme, darkMode}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mobileMenu = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <StoreMallDirectory sx={{ fontSize: '2rem' }} />
        <Typography variant="h6" sx={{ ml: 1 }}>RE-STORE</Typography>
      </Box>
      <List>
        {midLinks.map(({title, path}) => (
          <MenuItemLink 
            key={path} 
            to={path} 
          >
            {title.toUpperCase()}
          </MenuItemLink>
        ))}
      </List>
      <Divider />
      <List>
        {rightLinks.map(({title, path}) => (
          <MenuItemLink 
            key={path} 
            to={path}
          >
            {title.toUpperCase()}
          </MenuItemLink>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" >
      <Container maxWidth='xl'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '80px !important' }}>
          {/* Logo và Brand */}
          <Box display="flex" alignItems="center" component={NavLink}
              to="/" sx={{textDecoration: 'none', color: 'inherit'}}>
            <StoreMallDirectory sx={{ fontSize: '2.5rem' }} />
            <Typography 
              variant="h6"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'inherit',
                ml: 1
              }}
            >
              RE-STORE
            </Typography>
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <>
              <List sx={{ display: 'flex', gap: 2 }}>
                {midLinks.map(({title, path}) => (
                  <MenuItemLink key={path} to={path}>
                    {title.toUpperCase()}
                  </MenuItemLink>
                ))}
              </List>

              <Box display="flex" alignItems="center">
                <IconButton onClick={changeTheme}>
                  {!darkMode ? <LightMode sx={{color: 'yellow'}} /> : <DarkMode />}
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <List sx={{ display: 'flex', gap: 2, ml: 2 }}>
                  {rightLinks.map(({title, path}) => (
                    <MenuItemLink key={path} to={path}>
                      {title.toUpperCase()}
                    </MenuItemLink>
                  ))}
                </List>
              </Box>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box display="flex" alignItems="center">
              <IconButton onClick={changeTheme} sx={{ mr: 1 }}>
                {!darkMode ? <LightMode sx={{color: 'yellow'}} /> : <DarkMode />}
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
              >
                {mobileOpen ? <Close /> : <Menu />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better mobile performance
        }}
      >
        {mobileMenu}
      </Drawer>
    </AppBar>
  );
}