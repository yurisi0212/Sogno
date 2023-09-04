import React, {useState} from "react";
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import {CircularProgress, Divider, Fab, Modal, TextareaAutosize, TextField} from "@mui/material";
import axios from "axios";
import Dream from "@/Components/Dream";
import InfiniteScroll from "react-infinite-scroller";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {Inertia} from "@inertiajs/inertia";
import {yupResolver} from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";

interface DreamData {
    id: number;
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

interface FormInput {
    title: string;
    content: string;
}


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
    const [load_content, setLoadContent] = useState(false);
    const [view_contents, setViewContents] = useState([]);
    const [hasMore, setHasMore] = useState(true);  //再読み込み判定
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const [modal_open, setModalOpen] = React.useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleModalChange = (newValue: boolean) => {
        setModalOpen(newValue);
    };

    const onSubmit: SubmitHandler<FormInput> = (data: any) => {
        Inertia.post(route('auth.dream.store'), data, {
            onSuccess: (response) => {
                setLoadContent(false)
                setOffset(0);
                setViewContents([]);
                setHasMore(true);
                handleModalClose();
                resetForm();
                init(false,0, []);
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

    React.useEffect(() => {
        init()
    }, []);

    const init = (new_load_content = load_content, new_offset = offset, new_view_content = view_contents) => {
        setOffset(0)
        setViewContents([]);
        if (!new_load_content) {
            setTimeout(function () {
                setLoadContent(true);
            }, 300)
        }
        getContains(new_offset, new_view_content)
    }

    const item = (
        view_contents.map((value: DreamData, index) => {
                return (
                    <div key={index}>
                        <Dream title={value.title} content={value.content}/>
                    </div>
                );
            }
        )
    );

    const loader = (
        <div className="mt-12 text-center" key={0}>
            <CircularProgress color="secondary"/>
        </div>
    );

    const loadMore = async () => {
        if (loading) return;
        setLoading(true);
        setTimeout(function () {
            getContains();
        }, 300)
    }

    const getContains = (new_offset = offset, new_view_content = view_contents) => {
        axios.post(route('ajax.auth.get-dreams'), {
            offset: new_offset,
        }).then(function (response) {
            if (response.data.length < 20) {
                setHasMore(false);
            }
            let content = [...new_view_content, ...response.data];
            // @ts-ignore
            setViewContents(content);
            setOffset(new_offset + 20);
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            setLoading(false);
        });
    }

    return (
        <>
            <Authenticated
                auth={props.auth}
                header="home"
                flash={props.flash}
                handleModalChange={handleModalChange}
            >
                <Head title="Sogno - ホーム"/>

                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <div className="fixed w-full">
                        <div className="mx-auto w-full" style={{"height": "85vh"}}>
                            <div className="absolute" style={{"bottom": 40, "right": 30}}>
                                <Fab color="primary" aria-label="add" onClick={handleModalOpen}>
                                    <AddIcon/>
                                </Fab>
                            </div>
                        </div>
                    </div>
                </Box>

                {/*content*/}
                {(() => {
                        if (!load_content) {
                            return (
                                <>
                                    {loader}
                                </>
                            );
                        }

                        if (view_contents.length === 0) {
                            return (
                                <div className="pt-5">
                                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                            <div className="text-center">
                                                <p className="p-8">まだ投稿されていません</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={loadMore}
                                hasMore={hasMore}
                                loader={loader}
                            >
                                <div>
                                    {item}
                                </div>
                            </InfiniteScroll>
                        );
                    }
                )()}

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
            </Authenticated>
        </>
    );
}
