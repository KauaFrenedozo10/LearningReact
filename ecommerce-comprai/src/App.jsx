import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminProductsPage from "./pages/AdminProductsPage";
import CartPage from "./pages/CartPage";
import CatalogPage from "./pages/CatalogPage";
import CheckoutPage from "./pages/CheckoutPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import CustomersPage from "./pages/CustomersPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";

/** Layout (menu, conteúdo, rodapé) e todas as rotas da aplicação. */
export default function App() {
  return (
    <>
      <a className="visually-hidden-focusable" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="container my-4">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/produtos/:id" element={<ProductDetailPage />} />
          <Route path="/admin/produtos" element={<AdminProductsPage />} />
          <Route path="/admin/produtos/novo" element={<ProductFormPage />} />
          <Route path="/admin/produtos/:id/editar" element={<ProductFormPage />} />
          <Route path="/clientes" element={<CustomersPage />} />
          <Route path="/clientes/novo" element={<CustomerFormPage />} />
          <Route path="/clientes/:id/editar" element={<CustomerFormPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/pedidos/:id" element={<OrderDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="container py-3 text-muted border-top">
        Comprai — Sistema de Gestão de Pedidos
      </footer>
    </>
  );
}
