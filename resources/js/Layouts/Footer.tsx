import React from 'react';

export default function Footer() {
    return (
        <>
            <footer className="mt-5 bg-white text-center pt-4 pb-1">
                <div className="container mx-auto">
                    <h1 className="text-3xl">Sogno</h1>
                    <div className="flex justify-center pt-3">
                        <div className="mr-10 block">
                            <h1 className="text-2xl">会員</h1>
                            <div>
                                <div><a href={route("register")}>会員登録</a></div>
                                <div><a href={route("login")}>ログイン</a></div>
                            </div>
                        </div>
                        <div>
                            <h1 className="block text-2xl">ガイド</h1>
                            <div>
                                <div><a href="#">利用規約</a></div>
                                <div><a href="#">プライバシーポリシー</a></div>
                                <div><a href="#">お問い合わせ</a></div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 mb-0">Copyright © 2023-{(new Date).getFullYear()} yurisi All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}
