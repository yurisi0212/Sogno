import React from "react";
import {Link} from '@inertiajs/inertia-react';
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const pages = [
    'Sognoとは',

];

export default function UnauthenticatedHeader() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const pages_button = (
        <>
            <Button
                variant="outlined"
                key="会員登録"
                onClick={handleCloseNavMenu}
                sx={{mx: 1, display: 'block'}}
            >
                <Link href={route('register')}>会員登録</Link>

            </Button>
            <Button
                variant="contained"
                key="ログイン"
                onClick={handleCloseNavMenu}
                sx={{mx: 1, display: 'block'}}
            >
                <Link href={route('login')}>ログイン</Link>
            </Button>
        </>
    );


    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/">
                            Sogno
                        </Link>
                    </Typography>


                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <Button
                                key="会員登録"
                                onClick={handleCloseNavMenu}
                                sx={{mx: 1, display: 'block'}}
                            >
                                <Link href={route('register')}>会員登録</Link>

                            </Button>,
                            <Button
                                key="ログイン"
                                onClick={handleCloseNavMenu}
                                sx={{mx: 1, display: 'block'}}
                            >
                                <Link href={route('login')}>ログイン</Link>
                            </Button>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/">
                            Sogno
                        </Link>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    </Box>
                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        {pages_button}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
