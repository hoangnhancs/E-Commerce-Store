import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ProductDetails from "../features/products/ProductDetails";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import ProductCatalog from "../features/products/ProductCatalog";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: '/catalog', element: <ProductCatalog />},
            {path: '/catalog/:id', element: <ProductDetails />},
            {path: '/about', element: <AboutPage />},
            {path: '/contact', element: <ContactPage />},
        ]
    }
])