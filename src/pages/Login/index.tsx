import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Titles from '../../components/Titles';
import { Input } from '../../components/Input';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Buttom';
import { useAuth } from '../../hooks/useAuth';

const validations = yup.object({
    email: yup.string().required('E-mail é obrigatório'),
    password: yup
        .string()
        .min(6, 'Minímo 6 caracteres')
        .required('Senha é obrigatório'),
});

interface IFormProps {
    email: string;
    password: string;
}

export default function Login() {
    const { signIn } = useAuth();
    const { register, handleSubmit, formState } = useForm<IFormProps>({
        resolver: yupResolver(validations),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSignIn: SubmitHandler<IFormProps> = async ({
        email,
        password,
    }) => {
        signIn(email, password);
    };

    return (
        <div className="w-screen h-screen md:p-20">
            <div className="w-full h-full flex justify-center rounded-xl shadow-2xl">
                <div className="hidden md:block w-3/4 h-full md:bg-[url('../assets/e-commerce-technology.gif')] bg-no-repeat bg-cover bg-center rounded-l-xl opacity-95" />
                <div className="w-full h-full flex flex-col justify-center items-center p-6">
                    <Titles>MyStore</Titles>
                    <span className="font-montserra font-semibold text-slate-600">
                        Acesse sua conta
                    </span>
                    <form
                        className="w-full space-y-3 flex flex-col justify-center items-center"
                        onSubmit={handleSubmit(handleSignIn)}
                    >
                        <Input
                            label="E-mail"
                            {...register('email', {
                                required: true,
                            })}
                            addClassName="xl:w-3/4"
                            error={formState.errors.email}
                        />
                        <Input
                            label="Senha"
                            {...register('password', {
                                required: true,
                            })}
                            type="password"
                            autoComplete="off"
                            addClassName="xl:w-3/4"
                            error={formState.errors.password}
                        />
                        <Button
                            pattern="primary"
                            type="submit"
                            addClassName="w-full xl:w-3/4 text-white"
                        >
                            Entrar
                        </Button>
                        <div className="w-full md:w-3/4 flex justify-center md:justify-end items-center">
                            <Link to="/register" className="text-xs">
                                Você ainda não possui conta ? {''}
                                <strong className="text-theme-blue-50 underline">
                                    Então criei uma!
                                </strong>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
