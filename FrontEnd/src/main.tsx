import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@/index.css";

import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/reset-password';
import Profile from './pages/settings/profile';
import { DashboardAuthProvider } from './providers/dashboard-provider';
import Password from './pages/settings/password';
import Appearance from './pages/settings/appearance';
import Auth from './components/auth-routes';
import axiosClient from './axios-client';
import { Guest } from './components/guest-routes';
import CreateCategory from './pages/dashboard/categories/categories.create';
import CategoriesIndex from './pages/dashboard/categories/categories.index';
import { CategoriesProvider } from './providers/categories-provider';
import EditCategory from './pages/dashboard/categories/categories.edit';
import ProductsIndex from './pages/dashboard/products/products.index';
import CreateProduct from './pages/dashboard/products/products.create';
import EditProduct from './pages/dashboard/products/products.edit';
import { ProductsProvider } from './providers/products-provider';
import { TagsProvider } from './providers/tags-provider';
import { StoresProvider } from './providers/stores-provider';
import StoresIndex from './pages/dashboard/stores/stores.index';
import CreateStore from './pages/dashboard/stores/stores.create';
import EditStore from './pages/dashboard/stores/stores.edit';
import RolesIndex from './pages/dashboard/roles/roles.index';
import CreateRole from './pages/dashboard/roles/roles.create';
import EditRole from './pages/dashboard/roles/roles.edit';
import RolesProvider from './providers/roles-provider';


createRoot(document.getElementById('root')!).render(
    <DashboardAuthProvider>
        <CategoriesProvider>
            <StoresProvider>
                <ProductsProvider>
                    <TagsProvider>
                        <RolesProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path='/admin'>
                                        <Route element={<Auth />} path={'dashboard'}>
                                            <Route path='' element={<Dashboard />} />
                                            <Route path={'settings/profile'} element={<Profile />} />
                                            <Route path={'settings/password'} element={<Password />} />
                                            <Route path={'settings/appearance'} element={<Appearance />} />


                                            <Route path={'categories'} >
                                                <Route path={''} element={<CategoriesIndex />} />
                                                <Route path={'create'} element={<CreateCategory />} />
                                                <Route path={':id/edit'} element={<EditCategory />} />
                                            </Route>

                                            <Route path={'products'} >
                                                <Route path={''} element={<ProductsIndex />} />
                                                <Route path={'create'} element={<CreateProduct />} />
                                                <Route path={':id/edit'} element={<EditProduct />} />
                                            </Route>
                                            <Route path={'stores'} >
                                                <Route path={''} element={<StoresIndex />} />
                                                <Route path={'create'} element={<CreateStore />} />
                                                <Route path={':id/edit'} element={<EditStore />} />
                                            </Route>

                                            <Route path={'roles'} >
                                                <Route path={''} element={<RolesIndex />} />
                                                <Route path={'create'} element={<CreateRole />} />
                                                <Route path={':id/edit'} element={<EditRole />} />
                                            </Route>
                                        </Route>
                                        <Route element={<Guest />}>
                                            <Route path={'login'} element={<Login canResetPassword />} />
                                            <Route path={'forgot-password'} element={<ForgotPassword />} />
                                            <Route path={'register'} element={<Register />} />
                                            <Route path={'forgot-password'} element={<ResetPassword />} />
                                        </Route>
                                    </Route>
                                </Routes >
                            </BrowserRouter >
                        </RolesProvider>
                    </TagsProvider>
                </ProductsProvider>
            </StoresProvider>
        </CategoriesProvider>
    </DashboardAuthProvider >
)
