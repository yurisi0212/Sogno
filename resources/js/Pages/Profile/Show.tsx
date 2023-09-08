import Authenticated from "@/Layouts/Authenticated";
import {BottomNavigation, BottomNavigationAction, Card, Divider} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, {useState} from "react";
import ThreePIcon from '@mui/icons-material/ThreeP';
import MovingIcon from '@mui/icons-material/Moving';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from "@mui/material/Box";
import {Link} from "@inertiajs/inertia-react";
import Container from "@mui/material/Container";

export default function Show(props: any) {

    const [nav, setNav] = React.useState(0);
    return (
        <>
            <Authenticated auth={props.auth} header="profile" flash={props.flash}>
                <Box sx={{display: {xs: "none", sm: "block"}}}>
                    <Container>
                    <div className="mx-6 mt-4 mb-10 text-center">
                        <Card sx={{minHeight: "90vh", display: {xs: "none", sm: "block"}}}>
                            <div className="mt-8">
                                <div className="flex justify-between px-4">
                                    <div>
                                        <div className="flex justify-start">
                                            <div>
                                                <Avatar alt={props.user.name} src="/static/images/avatar/2.jpg"
                                                        sx={{width: 50, height: 50, fontSize: 30}}/>
                                            </div>
                                            <div>
                                                <h2 className="mt-3 ms-2 text-gray-600"
                                                    style={{fontSize: 18}}>{props.user.name}</h2>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            {(() => {
                                                if (props.auth.user.id !== props.user.id) {
                                                    return (
                                                        <Button variant="contained" color="info"
                                                                startIcon={<FavoriteBorderIcon/>}>
                                                            フォロー
                                                        </Button>
                                                    );
                                                } else {
                                                    return (<div style={{marginTop: "57px"}}></div>);
                                                }
                                            })()}

                                        </div>
                                    </div>

                                    <div>
                                        <BottomNavigation
                                            showLabels
                                            value={nav}
                                            onChange={(event, newValue) => {
                                                setNav(newValue);
                                            }}
                                        >
                                            <BottomNavigationAction label="自己紹介" icon={<ThreePIcon/>}/>
                                            <BottomNavigationAction label="夢" icon={<MovingIcon/>}/>
                                            {(() => {
                                                if (props.auth.user.id === props.user.id) {
                                                    return (
                                                        <BottomNavigationAction
                                                            LinkComponent={Link}
                                                            label="編集"
                                                            icon={<ManageAccountsIcon/>}
                                                            href={route("auth.profile.edit")}
                                                        />
                                                    )
                                                }
                                            })()
                                            }

                                        </BottomNavigation>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <div className="text-left w-full" style={{minHeight: "65vh"}}>
                                    <div className="p-5">
                                        <p>自己紹介</p>
                                        <div className="mt-3 text-gray-700">
                                            <p>{props.user.profile.introduction}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Divider orientation="vertical"/>
                                </div>
                            </div>
                        </Card>
                    </div>
                    </Container>
                </Box>

                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <div className="mx-6 text-center mt-2">
                        <Card sx={{minHeight: "85vh"}}>
                            <div className="flex justify-center mt-4">
                                <Avatar alt={props.user.name} src="/static/images/avatar/2.jpg"
                                        sx={{width: 50, height: 50, fontSize: 30}}/>
                            </div>
                            <div className="text-center">
                                <h2 className="mt-1 text-gray-600"
                                    style={{fontSize: 18}}>{props.user.name}</h2>
                                <div className="mt-4">
                                    {(() => {
                                        if (props.auth.user.id !== props.user.id) {
                                            return (
                                                <Button variant="contained" color="info"
                                                        startIcon={<FavoriteBorderIcon/>}>
                                                    フォロー
                                                </Button>
                                            );
                                        }else {
                                            return(
                                                <div style={{marginTop: "52px"}}></div>
                                            )
                                        }
                                    })()}
                                </div>
                                <div>
                                    aa
                                </div>
                            </div>
                        </Card>
                    </div>
                </Box>
            </Authenticated>
        </>
    );
}
