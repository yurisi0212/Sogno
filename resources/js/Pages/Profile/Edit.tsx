import React, {ChangeEvent, useState} from "react";
import {Head} from "@inertiajs/inertia-react";
import {Inertia} from '@inertiajs/inertia'
import Authenticated from "@/Layouts/Authenticated";
import {Card, CardContent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";


export default function Edit(props: any) {
    const [values, setValues] = useState({
        name: props.user.name,
        introduction: props.user.profile.introduction,
        _token: props.csrf_token,
        _method: "patch"
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        Inertia.patch(route('profile.update', {
            "id": props.user.id
        }), values)
    }

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
                    flash={props.flash}
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
                        <form onSubmit={handleSubmit}>
                            <div className="text-left">
                                <div className="my-5">
                                    <TextField id="name" label="名前" variant="outlined"
                                               style={{maxWidth: '400px', width: '100%'}}
                                               value={values.name}
                                               onChange={handleChange}
                                               name="name"
                                    />
                                </div>
                                <div className="my-5">
                                    <TextField
                                        id="introduction"
                                        label="自己紹介" variant="outlined"
                                        multiline
                                        rows={4}
                                        value={values.introduction}
                                        onChange={handleChange}
                                        style={{'width': '100%'}}
                                        name="introduction"
                                        inputProps={{maxLength: 2000}}
                                    />
                                </div>
                            </div>
                            <Button type="submit" variant="contained">保存</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};
