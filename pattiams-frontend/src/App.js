import Navigationbar from "./Components/Navigationbar";
import Footer from "./Components/Footer";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import SingleProduct from "./Screens/SingleProduct";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import AdminOrderListScreen from "./Screens/AdminOrderListScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import WishlistScreen from "./Screens/WishlistScreen";
import AdminDashboard from "./Screens/AdminDashboard";
import AdminUsersListScreen from "./Screens/AdminUsersListScreen";
import AdminUserEditScreen from "./Screens/AdminUserEditScreen";
import AdminProductListScreen from "./Screens/AdminProductListScreen";
import AdminProductEditScreen from "./Screens/AdminProductEditScreen";
import MyOrdersScreen from "./Screens/MyOrdersScreen";
import PrivacyPolicy from "./Screens/PrivacyPolicy";
import AboutPattiams from "./Screens/Aboutpattiams";
import ChairMessage from "./Screens/ChairMessage";
import AyurvedaProductsPage from "./Screens/AyurvedaProductsPage";
import CareersScreen from "./Screens/CareersScreen";
import ContactScreen from "./Screens/ContactScreen";
import TermsScreen from "./Screens/TermsScreen";
import Directors from "./Screens/Directors";

function App() {
  return (
    <HashRouter>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-userslist" element={<AdminUsersListScreen />} />
        <Route path="/admin-orderlist" element={<AdminOrderListScreen />} />
        <Route path="/admin-productlist" element={<AdminProductListScreen />} />
        <Route path="/admin-userslist/:id/edit" element={<AdminUserEditScreen />} />
        <Route path="/admin-productlist/:id/edit" element={<AdminProductEditScreen />} />
        <Route path="/product/:cat/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/myorders" element={<MyOrdersScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/productlist/:cat" element={<ProductListScreen />} />
        <Route path="/productlist/:cat/:pageNumber" element={<ProductListScreen />} />
        <Route path="/ayurveda/:catslug" element={<AyurvedaProductsPage />} />
        <Route path="/wishlist" element={<WishlistScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/aboutpattiams" element={<AboutPattiams />} />
        <Route path="/message" element={<ChairMessage />} />
        <Route path="/careers" element={<CareersScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/terms" element={<TermsScreen />} />
        <Route path="/directors" element={<Directors />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
