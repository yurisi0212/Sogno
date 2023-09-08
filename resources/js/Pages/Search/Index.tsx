import Authenticated from "@/Layouts/Authenticated";
import {IconButton, InputBase, Paper} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Index(props: any) {
    return (
        <>
            <Authenticated auth={props.auth} header="search" flash={props.flash}>
                <Container>
                    <div className="pt-5">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="text-center">
                                    <Paper
                                        component="form"
                                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
                                    >
                                        <InputBase
                                            sx={{ml: 1, flex: 1}}
                                            placeholder="検索"
                                            inputProps={{'aria-label': '検索'}}
                                        />
                                        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                                            <SearchIcon/>
                                        </IconButton>
                                    </Paper>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Authenticated>
        </>
    );
}
