import {Head} from "@inertiajs/inertia-react";
import {Inertia} from '@inertiajs/inertia'
import Authenticated from "@/Layouts/Authenticated";
import {Card, CardContent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from 'react-hook-form'

interface FormInput {
    name: string;
    introduction: string;
}

const schema = yup.object({
    name: yup
        .string()
        .required('名前は必須です')
        .min(3, '名前は３文字以上入力してください')
        .max(15, '名前は15文字以下で入力してください'),
    introduction: yup.string().max(255, '自己紹介は255文字以下で入力してください'),
});


export default function Edit(props: any) {

    const onSubmit: SubmitHandler<FormInput> = (data: any) => {
        Inertia.patch(route('auth.profile.update', {
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
        <Authenticated
            auth={props.auth}
            header="profile"
            flash={props.flash}
            default_tab={3}
        >
            <Head title="プロフィール - 編集"/>

            <div className="mx-6 mt-10 text-center">
                <Card>
                    <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            基本情報
                        </Typography>
                        <form>
                            <div className="text-left">
                                <div className="my-5">
                                    <TextField id="name" label="名前" variant="outlined"
                                               required
                                               style={{maxWidth: '400px', width: '100%'}}
                                               {...register('name')}
                                               defaultValue={props.user.name}
                                               name="name"
                                               error={'name' in errors}
                                               helperText={errors.name?.message}
                                    />
                                </div>
                                <div className="my-5">
                                    <TextField
                                        id="introduction"
                                        label="自己紹介" variant="outlined"
                                        multiline
                                        rows={4}
                                        {...register('introduction')}
                                        style={{'width': '100%'}}
                                        name="introduction"
                                        defaultValue={props.user.profile.introduction}
                                        inputProps={{maxLength: 2000}}
                                        error={'introduction' in errors}
                                        helperText={errors.introduction?.message}
                                    />
                                </div>
                            </div>
                            <input type="hidden" name="csrf_token" value={props.csrf_token}/>
                            <Button onClick={handleSubmit(onSubmit)} variant="contained">保存</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    )
};
