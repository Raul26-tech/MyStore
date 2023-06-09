import { Routes as RoutesApp, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import FormProduts from '../pages/Products/form';

export default function Routes() {
    return (
        <>
            <RoutesApp>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/form/:id" element={<FormProduts />} />
                <Route path="/users/:id" element={<Profile />} />
            </RoutesApp>
        </>
    );
}
