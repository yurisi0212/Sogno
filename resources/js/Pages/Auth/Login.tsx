import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import {TextField} from "@mui/material";
import {LoginRounded} from "@mui/icons-material";

interface Props {
    status: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as "email" | "password" | "remember", event.target.type === 'checkbox' ? event.target.checked + '' : event.target.value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <Guest>
            <Head title="ログイン" />
            <h1 className="text-center">ログイン</h1>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <ValidationErrors errors={errors} />

            <div className="text-right">
                <Link
                    href={route("register")}
                    className="underline mb-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    新規登録はこちら
                </Link>
            </div>

            <form onSubmit={submit}>
                <div>
                    <TextField label="Email" name="email" className="mt-1 block w-full" type="email" onChange={onHandleChange} autoComplete="username" variant="filled" />
                </div>

                <div className="mt-4">
                    <TextField label="Password" name="password" className="mt-1 block w-full" type="password" onChange={onHandleChange} autoComplete="current-password" variant="filled" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            ログイン情報を記憶する
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            パスワードを忘れた方はこちら
                        </Link>
                    )}
                    </div>
                    <div>
                        <Button type="submit" variant="contained" className="ml-4 bg-gray-900"
                                processing={processing.toString()} endIcon={<LoginRounded />}>
                            ログイン
                        </Button>
                    </div>
                </div>
            </form>
        </Guest>
    );
}
