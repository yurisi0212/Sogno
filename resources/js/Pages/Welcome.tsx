import React from "react";
import {Link, Head} from "@inertiajs/inertia-react";
import UnauthenticatedHeader from "@/Layouts/UnauthenticatedHeader";
import Button from "@mui/material/Button";
import {Card, CardContent} from "@mui/material";
import Footer from "@/Layouts/Footer";

export default function Welcome(props: any) {
    return (
        <div className="overflow-hidden">
            <Head title="Welcome"/>
            <UnauthenticatedHeader/>

            <div id="top-background" className="top-page flex justify-center items-center">
                <div>
                    <h1 id="top-title" className="text-5xl text-white font-bold mb-2">あなたの夢</h1>
                    <h1 id="top-title" className="text-5xl text-white font-bold mb-2 ml-16">「みんなで」</h1>
                    <h1 id="top-title" className="text-5xl text-white font-bold ml-32">叶えませんか？</h1>
                </div>
            </div>

            <div className="text-center bg-gray-100">
                <div className="container mx-auto py-10">
                    <Card>
                        <CardContent>
                            <div className="pt-10 pb-5">
                                <div>

                                    <h1 className="text-4xl mb-3">Sognoとは</h1>
                                    <p>Sogno(ソーニョ)はイタリア語で「夢」という意味</p>
                                    <p>このSNSはあなたの将来の夢を叶えるためのサポートをするだけでなく、</p>
                                    <p>他人の夢を応援することができます。</p>
                                </div>

                                <div className="mt-10">
                                    <h1 className="text-4xl mb-3">Sognoでできること</h1>
                                    <p>あなたの夢をみんなに共有しましょう。</p>
                                    <p>夢を叶えるためにやったことを日記のように記録していき、</p>
                                    <p>時には人の夢を応援したり、アドバイスをしてあげたり</p>
                                    <p>あなたの将来の夢を叶えるための、モチベーションアップに繋がるはずです。</p>
                                </div>
                                <div className="mt-10">
                                    <h1 className="text-4xl mb-3">あなたの夢はなんですか？</h1>
                                    <p>デザイナーになりたい...ブランド物の服がほしい...</p>
                                    <p>優秀な営業マンになりたい...趣味で世界一を取りたい...</p>
                                    <p>どれも素敵な夢だと思います。</p>
                                    <p>はたまた</p>
                                    <p>特に夢がない...という人も</p>
                                    <p>このSNSを使って夢をみつけてみませんか？</p>
                                    <div className="flex justify-center mt-5">
                                        <Link href={route('register')}>
                                            <Button
                                                variant="outlined"
                                                key="会員登録"
                                                sx={{mx: 1, display: 'block'}}>
                                                会員登録
                                            </Button>
                                        </Link>
                                        <Link href={route('login')}>
                                            <Button
                                                variant="contained"
                                                key="ログイン"
                                                sx={{mx: 1, display: 'block'}}>
                                                ログイン
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
