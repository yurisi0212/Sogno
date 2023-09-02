import React, {useState} from "react";
import {Head} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import {CircularProgress, Fab} from "@mui/material";
import axios from "axios";
import Dream from "@/Components/Dream";


interface DreamData {
    title: string;
    content: string;
    updated_at: string;
}



export default function Home(props: any) {

    const [exists_content, setExistsContent] = useState(false);
    const [load_content, setLoadContent] = useState(false);
    const [view_contents, setViewContents] = useState([]);


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
            >
                <Head title="Sogno - ホーム"/>

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
                            <div className="pt-6">
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

            </Authenticated>
        </>
    );
}
