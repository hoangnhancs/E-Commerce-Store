import { useEffect, useState } from "react"
import { Product } from "./lib/types"
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import NavBar from "./layouts/NavBar"
import ProductCatalog from "./features/products/ProductCatalog"


function App() {
  
  const [products, setProducts] = useState<Product[]>([])
  const [darkMode, setDarkMode] = useState(false);

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  
  const palletteType = darkMode ? 'dark' : 'light'
  
  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: (palletteType === 'dark') ? '#121212' : '#eaeaea',
      }
    }
  })


  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} changeTheme={handleThemeChange}/>
        11111
        
        <Box
          sx={{
            background: darkMode 
              ? 'radial-gradient(circle, #1e3aBa, #111B27)' 
              : 'radial-gradient(circle, #baecf9, #f0f9ff)',
            minHeight: '100vh',
            py: 6,
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <ProductCatalog products={products}/>
          </Container>
        </Box>
      </ThemeProvider> 
    </>    
  )
}

export default App
