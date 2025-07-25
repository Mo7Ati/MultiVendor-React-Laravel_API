import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import "@/index.css";
import './i18n';
import { LanguageProvider } from './providers/LanguageProvider';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import Profile from './pages/Store/settings/profile';
import { AdminDashboardAuthProvider } from './providers/admin-dashboard-provider';
import Password from './pages/Store/settings/password';
import Appearance from './pages/Store/settings/appearance';
import CreateCategory from './pages/Store/dashboard/categories/categories.create';
import CategoriesIndex from './pages/Store/dashboard/categories/categories.index';
import EditCategory from './pages/Store/dashboard/categories/categories.edit';
import CreateProduct from './pages/Store/dashboard/products/products.create';
import EditProduct from './pages/Store/dashboard/products/products.edit';

import StoresIndex from './pages/Admin/dashboard/stores/stores.index';
import CreateStore from './pages/Admin/dashboard/stores/stores.create';
import EditStore from './pages/Admin/dashboard/stores/stores.edit';
import RolesIndex from './pages/Admin/dashboard/roles/roles.index';
import CreateRole from './pages/Admin/dashboard/roles/roles.create';
import EditRole from './pages/Admin/dashboard/roles/roles.edit';
import AdminsIndex from './pages/Admin/dashboard/admins/admins.index';
import CreateAdmin from './pages/Admin/dashboard/admins/admins.create';
import EditAdmin from './pages/Admin/dashboard/admins/admins.edit';
import StoreCategoriesIndex from './pages/Admin/dashboard/store-categories/store-categories.index';
import StoreCategoryCreate from './pages/Admin/dashboard/store-categories/store-categories.create';
import StoreCategoryEdit from './pages/Admin/dashboard/store-categories/store-categories.edit';
import Dashboard from './pages/dashboard';
import AdminLogin from './pages/Admin/auth/login';
import Login from './pages/Store/auth/login';
import ForgotPassword from './pages/Admin/auth/forgot-password';
import Register from './pages/Admin/auth/register';
import ResetPassword from './pages/Admin/auth/reset-password';
import { StoreDashboardAuthProvider } from './providers/store-dashboard-provider';
import AdminAuth from './hooks/auth/admin-auth-routes';
import { AdminGuestRoutes } from './hooks/guest/admin-guest-routes';
import StoreAuth from './hooks/auth/store-auth-routes';
import { StoreGuestRoutes } from './hooks/guest/store-guest-routes';
import AdminProviderLayout from './components/AdminProviderLayout';
import StoreProviderLayout from './components/StoreProviderLayout';
import ProductsIndex from './pages/Admin/dashboard/products/products.index';


createRoot(document.getElementById('root')!).render(
    <LanguageProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<AdminProviderLayout />} >
                    <Route element={<AdminAuth />} path={'dashboard'}>
                        <Route path='' element={<Dashboard />} />
                        <Route path={'settings/profile'} element={<Profile />} />
                        <Route path={'settings/password'} element={<Password />} />
                        <Route path={'settings/appearance'} element={<Appearance />} />

                        <Route path={'products'} >
                            <Route path={''} element={<ProductsIndex />} />
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
                        <Route path={'admins'} >
                            <Route path={''} element={<AdminsIndex />} />
                            <Route path={'create'} element={<CreateAdmin />} />
                            <Route path={':id/edit'} element={<EditAdmin />} />
                        </Route>

                        <Route path={'store-categories'} >
                            <Route path={''} element={<StoreCategoriesIndex />} />
                            <Route path={'create'} element={<StoreCategoryCreate />} />
                            <Route path={':id/edit'} element={<StoreCategoryEdit />} />
                        </Route>

                    </Route>
                    <Route element={<AdminGuestRoutes />}>
                        <Route path={'login'} element={<AdminLogin canResetPassword />} />
                        <Route path={'forgot-password'} element={<ForgotPassword />} />
                        <Route path={'register'} element={<Register />} />
                        <Route path={'forgot-password'} element={<ResetPassword />} />
                    </Route>
                </Route>

                <Route path='/store' element={<StoreProviderLayout />}>
                    <Route element={<StoreAuth />} path={'dashboard'}>
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
                    </Route>
                    <Route element={<StoreGuestRoutes />}>
                        <Route path={'login'} element={<Login canResetPassword />} />
                        <Route path={'forgot-password'} element={<ForgotPassword />} />
                        <Route path={'register'} element={<Register />} />
                        <Route path={'forgot-password'} element={<ResetPassword />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    </LanguageProvider >
)
