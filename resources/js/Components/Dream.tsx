import React from 'react';
import {Divider} from "@mui/material";

interface Props{
    title: string;
    content: string;
}
export default function Dream({title, content}: Props) {
    return(
        <>
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-center">
                            <h3 className="mb-3">{title}</h3>
                            <Divider/>
                            <p className="p-8 whitespace-pre">{content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
