import React, {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {Alert, Divider, Snackbar, Tab, Tabs} from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
    auth: any;
    header: React.ReactNode;
    children: React.ReactNode;
    flash: any;
    errors: any;
    default_tab?: number;
}

const pages = [
    '検索',
    'あなたの夢',
];

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

export default function Authenticated({auth, header, children, flash, errors, default_tab = 0}: Props) {
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

    const [tab, setTab] = React.useState(default_tab);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        if (
            event.type !== 'click' ||
            (event.type === 'click' &&
                samePageLinkNavigation(
                    event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                ))
        ) {
            setTab(newValue);
        }
    };

    const handleClickTab = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
            // @ts-ignore
            const location: string = event.currentTarget.getAttribute('href');
            Inertia.get(location);
            event.preventDefault();
        }
    }

    return (
        <>
            <AppBar position="static" color="inherit">
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
            </AppBar>

            <Box sx={{display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'}}}
                 style={{minHeight: "100vh", maxHeight: "100vh"}}>
                <div className="flex justify-start h-full">
                    <header className="mt-7 px-6 start-0 fixed overflow-y-auto"
                            style={{width: "250px", minHeight: "400px", height: "100%"}}>
                        <div id="title">
                            <Typography
                                variant="h5"
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
                        </div>
                        <div id="navigation" className="mt-6">
                            <div className="my-5">
                                <Link href={route('auth.home')}>
                                    <div className='flex'>
                                        <div>
                                            <HomeIcon/>
                                        </div>
                                        <div className="ms-1" style={{marginTop: "2px"}}>
                                            ホーム
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="my-5">
                                <Link href=''>
                                    <div className='flex'>
                                        <div>
                                            <SearchIcon/>
                                        </div>
                                        <div className="ms-1" style={{marginTop: "2px"}}>
                                            検索
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="my-5">
                                <Link href=''>
                                    <div className='flex'>
                                        <div>
                                            <MarkChatUnreadIcon/>
                                        </div>
                                        <div className="ms-1" style={{marginTop: "2px"}}>
                                            通知
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <Box className="w-100 absolute text-center" sx={{bottom: 100}}>
                            <Button variant="contained" color="primary" style={{borderRadius: 20, paddingLeft:70, paddingRight: 70, paddingTop: 5, paddingBottom: 5}}>新規作成</Button>
                        </Box>
                        <Box className="absolute bottom-10" sx={{flexGrow: 0}}>
                            <div className="flex justify-start">
                                <div>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="mt-2 ms-3 break-words" style={{width: "100px"}}>
                                    <span>{auth.user.name}</span>
                                </div>
                            </div>
                            <Menu
                                sx={{ml: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <div>
                                    <Link href={route('auth.profile.edit')} className="w-full">
                                        <MenuItem key={0} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"><PersonIcon/>プロフィール</Typography>
                                        </MenuItem>
                                    </Link>
                                </div>
                                <div className="my-2">
                                    <Divider/>
                                </div>
                                <div>
                                    <Link href={route('logout')} method="post" as="button" className="w-full">
                                        <MenuItem key={1} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"><LogoutIcon/>ログアウト</Typography>
                                        </MenuItem>
                                    </Link>
                                </div>
                            </Menu>
                        </Box>
                    </header>
                    <div className="fixed" style={{zIndex: -1}}>
                        <Divider orientation="vertical" style={{"height": "100vh", marginLeft: "250px"}}/>
                    </div>
                    <div style={{width: `calc(100vw - 253px)`, marginLeft: "260px", overflowY: "scroll"}}>
                        {children}
                    </div>
                </div>
            </Box>

            <Box sx={{display: {xs: 'none', sm: 'block', lg: 'none'}}} style={{minHeight: "90vh"}}>
                <div className="flex justify-center">
                    <div className="text-center" style={{width: "20%", overflow: "scroll"}}>
                        <p>md</p>
                    </div>
                    <div>
                        <Divider orientation="vertical"/>
                    </div>
                    <div style={{width: "80%", overflow: "scroll"}}>
                        {children}
                    </div>
                </div>
            </Box>

            <Box style={{minHeight: "90vh"}} sx={{display: {xs: 'block', sm: 'none'}}}>
                <div className="main">
                    {children}
                </div>
                <div className="w-full fixed bottom-0" style={{backgroundColor: "white"}}>
                    <Box sx={{width: '100%'}}>
                        <Tabs value={tab} onChange={handleChangeTab} aria-label="icon tabs example"
                              sx={{width: '100%'}}>
                            <Tab sx={{width: '25%'}} icon={<HomeIcon/>} aria-label="home" onClick={handleClickTab}
                                 href={route('auth.home')} component='a'/>
                            <Tab sx={{width: '25%'}} icon={<PhoneIcon/>} aria-label="phone"/>
                            <Tab sx={{width: '25%'}} icon={<FavoriteIcon/>} aria-label="favorite"/>
                            <Tab sx={{width: '25%'}} icon={<PersonIcon/>} aria-label="person"
                                 onClick={handleClickTab} href={route('auth.profile.edit')} component='a'/>
                        </Tabs>
                    </Box>
                </div>
            </Box>

            {
                errors !== undefined && Object.values(errors).length > 0 ?
                    <div className="w-full bg-red-500 text-center text-white">
                        <ul>
                            {Object.values(errors).map((e, i) => (
                                    <li key={i}>{e}</li>
                                )
                            )}
                        </ul>
                    </div>
                    : ''
            }
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
    )
        ;
}
