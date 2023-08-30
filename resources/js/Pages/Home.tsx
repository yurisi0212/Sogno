import React, {useState} from "react";
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import {Divider, Fab, Modal, TextareaAutosize, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Inertia} from "@inertiajs/inertia";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface FormInput {
    title: string;
    content: string;
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
    name: yup
        .string()
        .required('')
        .min(3, '')
        .max(400, ''),
});

export default function Home(props: any) {

    const [modal_open, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const onSubmit: SubmitHandler<FormInput> = (data: any) => {
        Inertia.patch(route('profile.update', {
            "id": props.user.id
        }), data)
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
            <Authenticated
                auth={props.auth}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Home
                    </h2>
                }
                flash={props.flash}
                errors={props.errors}
            >
                <Head title="Sogno - ホーム"/>


                <div className="fixed w-full">
                    <div className="mx-auto w-full" style={{"height": "85vh"}}>
                        <div className="absolute" style={{"bottom": "40px", "right": "40px"}}>
                            <Fab color="primary" aria-label="add" onClick={handleModalOpen}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </div>
                </div>

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
                                    <TextField id="name" label="達成したい夢" variant="outlined"
                                               required
                                               style={{width: '100%'}}
                                               {...register('title')}
                                               defaultValue=""
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
                                        defaultValue=""
                                        inputProps={{maxLength: 2000}}
                                        error={'content' in errors}
                                        InputProps={{
                                            inputProps: {
                                                style: {maxHeight: "60vh", minHeight: "30vh", overflow: "auto"}
                                            },
                                            inputComponent: TextareaAutosize,

                                        }}
                                        helperText={errors.title?.message}
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

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="text-center">
                                <p className="p-8">まだ投稿されていません</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
