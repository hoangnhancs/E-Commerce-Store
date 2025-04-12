import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
    darkMode: boolean,
    changeTheme: () => void 
}

export default function NavBar({changeTheme, darkMode}: Props) {
  return (
    <AppBar 
        position="fixed"
        sx={{
            display: 'flex',
            flexDirection: 'row',
            height: 80,
        }}
    >
        <Toolbar>
            <Typography 
                variant="h6"
                sx={{
                    fontSize: '1.8rem', // Tăng kích thước chữ
                    fontWeight: 'bold'  // Làm đậm chữ
                }}
            >
                RE-STORE
            </Typography>  
            <IconButton onClick={changeTheme} sx={{ml: 2}}>
                {!darkMode ? <LightMode sx={{color: 'yellow'}} /> : <DarkMode />}
            </IconButton>
        </Toolbar>
    </AppBar>
    
  )
}