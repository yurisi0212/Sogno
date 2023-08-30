import React, {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@inertiajs/inertia-react";
import {Alert, Snackbar} from "@mui/material";
import Footer from "@/Layouts/Footer";

interface Props {
    auth: any;
    header: React.ReactNode;
    children: React.ReactNode;
    flash: any;
    errors: any;
}

const pages = [
    '検索',
    'あなたの夢',
];

export default function Authenticated({auth, header, children, flash, errors}: Props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState({
        'error': false,
        'warning': false,
        'info': false,
        'success': false
    });

    useEffect(() => {
        if (flash !== undefined) {
            setOpen({
                'error': flash.error !== null,
                'warning': flash.warning !== null,
                'info': flash.info !== null,
                'success': flash.success !== null
            })
        }
    }, [flash]);

    const handleClose = (type: string) => {
        setOpen(open => ({
            ...open,
            [type]: false,
        }))
    };

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static" color="inherit">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                letterSpacing: '.2rem',
                                textDecoration: 'none',
                            }}
                        >
                            <Link href={route('auth.home')}>
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
                                <Link href={route('auth.home')}>
                                    <MenuItem
                                        key={0}
                                        onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">タイムライン</Typography>
                                    </MenuItem>
                                </Link>
                                {pages.map((page, i) => (
                                    <MenuItem key={i} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link href={route('auth.home')}>
                                Sogno
                            </Link>
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Link href={route('auth.home')}>
                                <Button
                                    key={0}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, display: 'block'}}>
                                    タイムライン
                                </Button>
                            </Link>
                            {pages.map((page, i) => (
                                <Button
                                    key={i}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Link href={route('auth.profile.edit')} className="w-full">
                                    <MenuItem key={0} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">プロフィール</Typography>
                                    </MenuItem>
                                </Link>
                                <Link href={route('logout')} method="post" as="button" className="w-full">
                                    <MenuItem key={1} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">ログアウト</Typography>
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <div style={{minHeight: "90vh"}}>
                {children}
            </div>
            <Footer/>
            {errors !== undefined && Object.values(errors).length > 0 ?
                <div className="w-full bg-red-500 text-center text-white">
                    <ul>
                        {Object.values(errors).map((e, i) => (
                                <li key={i}>{e}</li>
                            )
                        )}
                    </ul>
                </div>
                : ''}
            <Snackbar open={open.success} onClose={() => handleClose("success")} autoHideDuration={6000}
                      anchorOrigin={{vertical: "top", horizontal: "center"}}>
                <Alert severity="success"
                       onClose={() => handleClose("success")}
                       sx={{width: '100%'}}>{flash !== undefined && flash.success !== null ? flash.success : ''}</Alert>
            </Snackbar>
            <Snackbar open={open.warning} onClose={() => handleClose("warning")} autoHideDuration={6000}
                      anchorOrigin={{vertical: "top", horizontal: "center"}}>
                <Alert severity="warning"
                       onClose={() => handleClose("warning")}
                       sx={{width: '100%'}}>{flash !== undefined && flash.warning !== null ? flash.warning : ''}</Alert>
            </Snackbar>
            <Snackbar open={open.info} onClose={() => handleClose("info")} autoHideDuration={6000}
                      anchorOrigin={{vertical: "top", horizontal: "center"}}>
                <Alert severity="info"
                       onClose={() => handleClose("info")}
                       sx={{width: '100%'}}>{flash !== undefined && flash.info !== null ? flash.info : ''}</Alert>
            </Snackbar>
            <Snackbar open={open.error} onClose={() => handleClose("error")} autoHideDuration={6000}
                      anchorOrigin={{vertical: "top", horizontal: "center"}}>
                <Alert severity="error"
                       onClose={() => handleClose("error")}
                       sx={{width: '100%'}}>{flash !== undefined && flash.error !== null ? flash.error : ''}</Alert>
            </Snackbar>
        </>
    );
}
