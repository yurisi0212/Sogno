import React from 'react';
import UnauthenticatedHeader from "@/Layouts/UnauthenticatedHeader";
interface Props {
    children: React.ReactNode;
}

export default function Guest({children}: Props) {
    return (
        <>
            <UnauthenticatedHeader/>
            <div className="top-page flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </>
    );
}

