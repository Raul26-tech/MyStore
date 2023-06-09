import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Titles from '../../components/Titles';
import { Input } from '../../components/Input';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Container from '../../components/Container';
import Button from '../../components/Buttom';

const validations = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    password: yup.string().required('Senha obrigatória'),
    passwordConfirm: yup
        .string()
        .required('Confirmação de senha obrigatória')
        .oneOf(
            [yup.ref('password')],
            'Senha e confirmação de senha não conferem'
        ),

    email: yup.string().required('E-mail obrigatório'),
    emailConfirm: yup
        .string()
        .required('Confirmação de e-mail é obrigatório')
        .oneOf(
            [yup.ref('email')],
            'E-mail e confirmação de e-mail não conferem'
        ),
    address: yup.object({
        postalCode: yup.string().required('CEP é obrigatório'),
        number: yup.string().required('Número é obrigatório'),
    }),
});

interface IViaCep {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

interface IRegisterProps {
    id: string;
    name: string;
    email: string;
    emailConfirm: string;
    password: string;
    passwordConfirm: string;
    address: {
        postalCode: string;
        street: string;
        number: string;
        uf: string;
        district?: string;
        city: string;
    };
}

export default function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState, reset, getValues, setFocus } =
        useForm<IRegisterProps>({
            resolver: yupResolver(validations),
            defaultValues: {
                name: '',
                email: '',
                password: '',
                address: {
                    postalCode: '',
                    street: '',
                    number: '',
                    district: '',
                    city: '',
                    uf: '',
                },
            },
        });

    const handleSaveRegister: SubmitHandler<IRegisterProps> = async (
        submitData
    ) => {
        try {
            const response = await api.post('/users', {
                ...submitData,
            });
            console.log(response.data);
            navigate('/login', { replace: true });
        } catch (e) {
            console.log(e);
        }
    };

    const handleGetPostalCode = useCallback(() => {
        const postalCode = getValues('address.postalCode');

        if (postalCode && postalCode.length === 8) {
            api.get<IViaCep>(`https://viacep.com.br/ws/${postalCode}/json/`)
                .then((response) => {
                    reset({
                        address: {
                            street: response.data.logradouro,
                            district: response.data.bairro,
                            city: response.data.localidade,
                            uf: response.data.uf,
                        },
                    });
                    setFocus('address.number');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <div className="w-full h-full">
            <Container addClassName="w-full h-full flex flex-col justify-center items-center md:p-20">
                <Titles>MyStore</Titles>
                <form
                    onSubmit={handleSubmit(handleSaveRegister)}
                    className="grid md:grid-cols-4 xl:grid-cols-4  p-3 gap-1 space-y-3"
                >
                    <Input
                        label="Nome completo"
                        {...register('name')}
                        error={formState.errors.name}
                        addClassName="md:col-span-4 xl:col-span-4"
                    />
                    <Input
                        label="E-mail"
                        {...register('email')}
                        error={formState.errors.email}
                        addClassName="md:col-span-2 xl:col-span-2"
                    />
                    <Input
                        label="Confirmação de E-mail"
                        {...register('emailConfirm')}
                        error={formState.errors.emailConfirm}
                        addClassName="md:col-span-2 xl:col-span-2"
                    />
                    <Input
                        label="Senha"
                        {...register('password')}
                        error={formState.errors.password}
                        type="password"
                        addClassName="md:col-span-2 xl:col-span-2"
                    />
                    <Input
                        label="Confirmação de senha"
                        {...register('passwordConfirm')}
                        error={formState.errors.passwordConfirm}
                        type="password"
                        addClassName="md:col-span-2 xl:col-span-2"
                    />
                    <Input
                        label="CEP"
                        placeholder="Digite seu Cep"
                        {...register('address.postalCode', {
                            onBlur: handleGetPostalCode,
                        })}
                        error={formState.errors.address?.postalCode}
                        addClassName="md:col-span-2 xl:col-span-1"
                    />
                    <Input
                        label="Rua"
                        {...register('address.street')}
                        error={formState.errors.address?.street}
                        addClassName="md:col-span-2 xl:col-span-3"
                        disabled
                    />
                    <Input
                        label="Número"
                        {...register('address.number')}
                        error={formState.errors.address?.number}
                        addClassName="md:col-span-2 xl:col-span-1"
                    />
                    <Input
                        label="Bairro"
                        {...register('address.district')}
                        error={formState.errors.address?.district}
                        addClassName="md:col-span-2 xl:col-span-1"
                        disabled
                    />
                    <Input
                        label="Cidade"
                        {...register('address.city')}
                        error={formState.errors.address?.city}
                        addClassName="md:col-span-2 xl:col-span-1"
                        disabled
                    />
                    <Input
                        label="UF"
                        {...register('address.uf')}
                        error={formState.errors.address?.uf}
                        addClassName="md:col-span-2 xl:col-span-1"
                        disabled
                    />
                    <div className="md:col-span-4 flex justify-between items-center md:grid-cols-3 lg:grid-cols-4 md:p-3 gap-1 space-y-3">
                        <Link
                            to="/login"
                            className="text-[10px] md:text-sm text-theme-blue-50 underline font-semibold"
                        >
                            Voltar para página de login
                        </Link>
                        <Button
                            addClassName="text-white p-2"
                            pattern="primary"
                            type="submit"
                        >
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    );
}
