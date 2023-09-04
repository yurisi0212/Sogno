import React, {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {Alert, Divider, Snackbar, Tab, Tabs} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from "@mui/icons-material/Add";
import MovingIcon from '@mui/icons-material/Moving';

interface Props {
    auth: any;
    header: string;
    children: React.ReactNode;
    flash: any;
    handleModalChange?: any;
}

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

export default function Authenticated({auth, header, children, flash, handleModalChange}: Props) {
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

    const getHeaderId = () =>{
        switch (header){
            case "home":
                return 0;
            case "search":
                return 1;
            case "notification":
                return 2;
            case "profile":
                return 3;
            default:
                return -1;
        }
    }

    const handleClose = (type: string) => {
        setOpen(open => ({
            ...open,
            [type]: false,
        }))
    };

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [tab, setTab] = React.useState(getHeaderId);

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

            <AppBar color="inherit" position="fixed">
                <Box sx={{width: "100%", height: 50, display: {xs: 'flex', sm: 'none'}}}>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            pt: 1,
                            textAlign: "center",
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

                </Box>
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
                                    <div className={header == "home" ? "flex text-gray-600" : "flex"}>
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
                                <Link href={route('auth.search.index')}>
                                    <div className={header == "search" ? "flex text-gray-600" : "flex"}>
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
                                <Link href={route('auth.notification.index')}>
                                    <div className={header == "notification" ? "flex text-gray-600" : "flex"}>
                                        <div>
                                            <MarkChatUnreadIcon/>
                                        </div>
                                        <div className="ms-1" style={{marginTop: "2px"}}>
                                            通知
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="my-5">
                                <Link href=''>
                                    <div className='flex'>
                                        <div>
                                            <MovingIcon/>
                                        </div>
                                        <div className="ms-1" style={{marginTop: "2px"}}>
                                            貴方の夢
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="my-5">
                                <Link href={route('auth.profile.show', {profile: auth.user.id})}>
                                    <div className={header == "profile" ? "flex text-gray-600" : "flex"}>
                                        <div>
                                            <PersonIcon/>
                                        </div>
                                        <div className="ms-1" style={{marginTop: "2px"}}>
                                            プロフィール
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {(() => {
                            if (header === "home") {
                                return (
                                    <Box className="w-100 absolute text-center" sx={{bottom: 100}}>
                                        <Button variant="contained" color="primary"
                                                onClick={() => handleModalChange(true)}
                                                style={{
                                                    borderRadius: 20,
                                                    width: 200,
                                                    height: 42
                                                }}>新規作成</Button>
                                    </Box>
                                );
                            }
                        })()}

                        <Box className="absolute bottom-10" sx={{flexGrow: 0}}>
                            <div className="flex justify-start">
                                <div>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt={auth.user.name} src="/static/images/avatar/2.jpg"/>
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
                                    <Link href={route('auth.profile.show', {profile: auth.user.id})} className="w-full">
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
                    <div className="bg-gray-100 pt-4" style={{
                        width: `calc(100vw - 250px)`,
                        minHeight: "100vh",
                        marginLeft: "250px",
                        overflowY: "scroll"
                    }}>
                        {children}
                    </div>
                </div>
            </Box>

            <Box sx={{display: {xs: 'none', sm: 'block', lg: 'none'}}} style={{minHeight: "100vh", maxHeight: "100vh"}}>
                <div className="flex justify-start h-full">
                    <header className="start-0 fixed overflow-y-auto"
                            style={{width: "80px", minHeight: "400px", height: "100%"}}>
                        <div className="text-center mt-8">Sogno</div>
                        <div className="mt-8" style={{width: "80px", minHeight: "400px", height: "100%"}}>
                            <div id="navigation" className="mt-6 px-6">
                                <div className="my-5">
                                    <Link href={route('auth.home')}>
                                        <div className={header == "home" ? "flex text-gray-600" : "flex"}>
                                            <div>
                                                <HomeIcon/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="my-5">
                                    <Link href={route('auth.search.index')}>
                                        <div className={header == "search" ? "flex text-gray-600" : "flex"}>
                                            <div>
                                                <SearchIcon/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="my-5">
                                    <Link href={route('auth.notification.index')}>
                                        <div className={header == "notification" ? "flex text-gray-600" : "flex"}>
                                            <div>
                                                <MarkChatUnreadIcon/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="my-5">
                                    <Link href=''>
                                        <div className='flex'>
                                            <div>
                                                <MovingIcon/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="my-5">
                                    <Link href={route('auth.profile.show', {profile: auth.user.id})}>
                                        <div className={header == "profile" ? "flex text-gray-600" : "flex"}>
                                            <div>
                                                <PersonIcon/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="px-4">
                                {(() => {
                                    if (header === "home") {
                                        return (
                                            <Box className="w-100 absolute" sx={{bottom: 72}}>
                                                <Button variant="contained" onClick={() => handleModalChange(true)}
                                                        color="primary"
                                                        style={{
                                                            borderRadius: 40,
                                                            minWidth: 42,
                                                            width: 42,
                                                            height: 42
                                                        }}>
                                                    <AddIcon/>
                                                </Button>
                                            </Box>
                                        );
                                    }
                                })()}

                                <Box className="absolute bottom-3" sx={{flexGrow: 0}}>
                                    <div className="flex justify-start">
                                        <div>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                    <Avatar alt={auth.user.name} src="/static/images/avatar/2.jpg"/>
                                                </IconButton>
                                            </Tooltip>
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
                                            <Link href={route('auth.profile.show', {profile: auth.user.id})}
                                                  className="w-full">
                                                <MenuItem key={0} onClick={handleCloseUserMenu}>
                                                    <Typography
                                                        textAlign="center"><PersonIcon/>プロフィール</Typography>
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
                            </div>
                        </div>
                    </header>
                    <div className="bg-gray-100 pt-4" style={{
                        width: `calc(100vw - 80px)`,
                        minHeight: "100vh",
                        marginLeft: "80px",
                        overflowY: "scroll"
                    }}>
                        {children}
                    </div>
                </div>
            </Box>

            <Box style={{minHeight: "90vh"}} sx={{display: {xs: 'block', sm: 'none'}}}>
                <div className="main bg-gray-100" style={{minHeight: '100vh'}}>
                    <div className="pt-14 pb-16">
                        {children}
                    </div>
                </div>
                <div className="w-full fixed bottom-0" style={{backgroundColor: "white"}}>
                    <Box sx={{width: '100%'}}>
                        <Tabs value={tab} onChange={handleChangeTab} aria-label="icon tabs example"
                              sx={{width: '100%'}}>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<HomeIcon/>} aria-label="home"
                                 onClick={handleClickTab}
                                 href={route('auth.home')} component='a'/>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<SearchIcon/>} aria-label="search"
                                 onClick={handleClickTab} href={route('auth.search.index')} component='a'/>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<MarkChatUnreadIcon/>}
                                 onClick={handleClickTab} aria-label="notification"
                                 href={route('auth.notification.index')}
                                 component='a'/>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<PersonIcon/>} aria-label="person"
                                 onClick={handleClickTab} href={route('auth.profile.show', {profile: auth.user.id})}
                                 component='a'/>
                        </Tabs>
                    </Box>
                </div>
            </Box>
        </>
    );
}
