import React, {useState} from "react";
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import {Card, CardContent, TextField, Typography} from "@mui/material";

export default function Edit(props: any) {
    return (
        <div>
            <div>
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
            </div>
            <div className="container mx-auto mt-10 text-center">
                <Card>
                    <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            基本情報
                        </Typography>
                        <TextField id="filled-basic" label="名前" variant="filled" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};
