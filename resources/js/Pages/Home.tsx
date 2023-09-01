import React, {useState} from "react";
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import {CircularProgress, Divider, Fab, Modal, TextareaAutosize, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Inertia} from "@inertiajs/inertia";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import Dream from "@/Components/Dream";

interface FormInput {
    title: string;
    content: string;
}

interface DreamData {
    title: string;
    content: string;
    updated_at: string;
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

export default function Home(props: any) {

    const [modal_open, setModalOpen] = React.useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [exists_content, setExistsContent] = useState(false);
    const [load_content, setLoadContent] = useState(false);
    const [view_contents, setViewContents] = useState([]);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const onSubmit: SubmitHandler<FormInput> = (data: any) => {
        Inertia.post(route('auth.dream.store'), data, {
            onSuccess: (response) => {
                handleModalClose();
                resetForm();
                getContains();
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

    React.useEffect(() => getContains(), [])

    const getContains = () => {
        axios.post(route('ajax.auth.get-dreams'), {
            offset: 0,
        })
            .then(function (response) {
                setLoadContent(true);
                if (response.data.length == 0) {
                    setExistsContent(false);
                    return;
                }
                setExistsContent(true);
                setViewContents(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
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

                {/*Add Icon*/}
                <div className="fixed w-full">
                    <div className="mx-auto w-full" style={{"height": "85vh"}}>
                        <div className="absolute" style={{"bottom": "40px", "right": "40px"}}>
                            <Fab color="primary" aria-label="add" onClick={handleModalOpen}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </div>
                </div>

                {/*content*/}
                {(() => {
                    if (!load_content) {
                        return (
                            <div className="mt-12 text-center">
                                <CircularProgress color="secondary"/>
                            </div>
                        );
                    }

                    if (exists_content) {
                        return (
                            <div className="pt-12">
                                {view_contents.map((value: DreamData, index) => {
                                    return (
                                        <Dream key={index} title={value.title} content={value.content}/>
                                    );
                                })}
                            </div>
                        );
                    }
                    return (
                        <div className="pt-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="text-center">
                                        <p className="p-8">まだ投稿されていません</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                })()}


                {/*modal*/}
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
            </Authenticated>
        </>
    );
}
