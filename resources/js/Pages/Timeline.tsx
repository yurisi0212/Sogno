import React, {useState} from "react";
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Timeline(props: any) {
    return (
        <>
            <Authenticated
                auth={props.auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard"/>


            </Authenticated>

            <div className="fixed w-full">
                <div className="mx-auto w-full"  style={{"height": "85vh"}}>
                    <div className="absolute" style={{"bottom": "40px", "right": "40px"}}>
                        <Fab color="primary" aria-label="add">
                            <AddIcon/>
                        </Fab>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
