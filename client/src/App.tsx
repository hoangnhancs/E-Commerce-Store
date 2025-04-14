import { useState } from "react"
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import NavBar from "./layouts/NavBar"
import { Outlet } from "react-router-dom"

function App() {

  const [darkMode, setDarkMode] = useState(false);

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  
  const palletteType = darkMode ? 'dark' : 'light'
  
  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: palletteType === 'dark' 
          ? '#121212' 
          : '#f5f5f5',
        paper: palletteType === 'dark' 
          ? '#1e1e1e' 
          : '#ffffff'
      },
      primary: {
        main: palletteType === 'dark' 
          ? '#90caf9' 
          : '#1976d2',
        light: palletteType === 'dark' 
          ? '#e3f2fd' 
          : '#42a5f5',
        dark: palletteType === 'dark' 
          ? '#42a5f5' 
          : '#1565c0'
      },
      secondary: {
        main: palletteType === 'dark' 
          ? '#ce93d8' 
          : '#9c27b0',
        light: palletteType === 'dark' 
          ? '#f3e5f5' 
          : '#ba68c8',
        dark: palletteType === 'dark' 
          ? '#ab47bc' 
          : '#7b1fa2'
      },
      text: {
        primary: palletteType === 'dark' 
          ? '#ffffff' 
          : '#000000',
        secondary: palletteType === 'dark' 
          ? '#b0b0b0' 
          : '#666666'
      }
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} changeTheme={handleThemeChange}/>
        <Box
          sx={{
            background: darkMode 
              ? 'linear-gradient(to bottom, #1a237e 0%, #121212 100%)' 
              : 'linear-gradient(to bottom, #bbdefb 0%, #f5f5f5 100%)',
            minHeight: '100vh',
            
            display: 'flex',
            flexDirection: 'column',
            
            
          }}
        >
          <Container maxWidth="xl" sx={{ 
            mt: 12  // marginTop responsive
          }}>
            <Outlet />
          </Container> 
        </Box>
      </ThemeProvider> 
    </>    
  )
}

export default App
