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
import {Alert, Divider, Fab, Modal, Snackbar, Tab, Tabs, TextareaAutosize, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    auth: any;
    header: React.ReactNode;
    children: React.ReactNode;
    flash: any;
    default_tab?: number;
}

interface FormInput {
    title: string;
    content: string;
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

const modalBoxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const schema = yup.object({
    title: yup
        .string()
        .required('達成したい夢は必須です')
        .min(3, '達成したい夢は3文字以上で入力してください')
        .max(30, '達成したい夢は30文字以下で入力してください'),
    content: yup
        .string()
        .required("努力したいことは必須です")
        .max(2000, '努力したいことは2000文字以内で入力してください')
});

export default function Authenticated({auth, header, children, flash, default_tab = 0}: Props) {
    const [modal_open, setModalOpen] = React.useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const onSubmit: SubmitHandler<FormInput> = (data: any) => {
        Inertia.post(route('auth.dream.store'), data, {
            onSuccess: (response) => {
                handleModalClose();
                resetForm();
                Inertia.get(route('auth.home'));
            },
        });
    }

    const resetForm = () => {
        setTitle("");
        setContent("");
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormInput>({
        // @ts-ignore
        resolver: yupResolver(schema),
    })

    return (
        <>
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
                            <Button onClick={handleModalOpen} variant="contained" color="primary" style={{
                                borderRadius: 20,
                                width: 200,
                                height:42
                            }}>新規作成</Button>
                        </Box>
                        <Box className="absolute bottom-10" sx={{flexGrow: 0}}>
                            <div className="flex justify-start">
                                <div>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt="yurisi" src="/static/images/avatar/2.jpg"/>
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
                    <div className="bg-gray-100" style={{
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
                                        <div className='flex'>
                                            <div>
                                                <HomeIcon/>
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
                                        </div>
                                    </Link>
                                </div>
                                <div className="my-5">
                                    <Link href=''>
                                        <div className='flex'>
                                            <div>
                                                <MarkChatUnreadIcon/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="px-4">
                                <Box className="w-100 absolute" sx={{bottom: 72}}>
                                    <Button onClick={handleModalOpen} variant="contained" color="primary" style={{
                                        borderRadius: 40,
                                        minWidth: 42,
                                        width: 42,
                                        height: 42
                                    }}><AddIcon/></Button>
                                </Box>

                                <Box className="absolute bottom-3" sx={{flexGrow: 0}}>
                                    <div className="flex justify-start">
                                        <div>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                    <Avatar alt="yurisi" src="/static/images/avatar/2.jpg"/>
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
                                            <Link href={route('auth.profile.edit')} className="w-full">
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
                    <div className="bg-gray-100" style={{
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
                {/*Add Icon*/}
                <div className="fixed w-full">
                    <div className="mx-auto w-full" style={{"height": "85vh"}}>
                        <div className="absolute" style={{"bottom": 40, "right": 30}}>
                            <Fab color="primary" aria-label="add" onClick={handleModalOpen}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </div>
                </div>
                <div className="main bg-gray-100 mt-14 mb-16" style={{minHeight: '100vh'}}>
                    {children}
                </div>
                <div className="w-full fixed bottom-0" style={{backgroundColor: "white"}}>
                    <Box sx={{width: '100%'}}>
                        <Tabs value={tab} onChange={handleChangeTab} aria-label="icon tabs example"
                              sx={{width: '100%'}}>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<HomeIcon/>} aria-label="home"
                                 onClick={handleClickTab}
                                 href={route('auth.home')} component='a'/>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<SearchIcon/>} aria-label="phone"/>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<MarkChatUnreadIcon/>}
                                 aria-label="favorite"/>
                            <Tab sx={{minWidth: '25%', width: '25%'}} icon={<PersonIcon/>} aria-label="person"
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

            {/*modal*/
            }
            <Modal
                open={modal_open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalBoxStyle}>
                    <form>
                        <div className="w-full">
                            <div className="my-2">
                                <TextField id="title" label="達成したい夢" variant="outlined"
                                           required
                                           style={{width: '100%'}}
                                           {...register('title')}
                                           value={title}
                                           onChange={(event) => setTitle(event.target.value)}
                                           name="title"
                                           error={'title' in errors}
                                           helperText={errors.title?.message}
                                />
                            </div>
                            <div className="my-2">
                                <TextField
                                    required
                                    id="content"
                                    label="努力したいこと"
                                    variant="outlined"
                                    {...register('content')}
                                    style={{'width': '100%', minHeight: '60px'}}
                                    name="content"
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                    inputProps={{maxLength: 2000}}
                                    error={'content' in errors}
                                    InputProps={{
                                        inputProps: {
                                            style: {maxHeight: "60vh", minHeight: "30vh", overflow: "auto"}
                                        },
                                        inputComponent: TextareaAutosize,

                                    }}
                                    helperText={errors.content?.message}
                                />
                            </div>
                        </div>
                        <Divider/>
                        <div className="flex w-full justify-end">
                            <div className="mt-3">
                                <Button onClick={handleSubmit(onSubmit)} variant="contained">投稿する</Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>

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
