import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ProductDetails from "../features/products/ProductDetails";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import ProductCatalog from "../features/products/ProductCatalog";
import Counter from "../features/counter/Counter";
import Error from "../features/error/Error";
import ServerError from "../features/error/ServerError";
import NotFound from "../features/error/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: '/products', element: <ProductCatalog />},
            {path: '/products/:id', element: <ProductDetails />},
            {path: '/about', element: <AboutPage />},
            {path: '/contact', element: <ContactPage />},
            {path: '/counter', element: <Counter />},
            {path: '/error', element: <Error />},
            {path: '/server-error', element: <ServerError />},
            {path: '/not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])