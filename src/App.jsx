import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile/Profile";
import Pending from "./pages/Orders/Pending";
import InProcess from "./pages/Orders/InProcess";
import OrdersLayout from "./components/OrdersLayout";
import Layout from "./components/Layout";
import UserContextProvider from "./context/userContext";
import OrderDetail from "./pages/Orders/OrderDetail/OrderDetail";
import PageNotFount from "./components/PageNotFount";
import Users from "./pages/Users/Users";
import UserDetail from "./pages/Users/UserDetail";
import ToDeliver from "./pages/Orders/ToDeliver";
import FinalDisposition from "./pages/Orders/FinalDisposition";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="orders" element={<OrdersLayout />}>
              <Route path="pending/:sector" element={<Pending />} />
              <Route path="in-process" element={<InProcess />} />
              <Route path="to-deliver" element={<ToDeliver />} />
              <Route path="final-disposition" element={<FinalDisposition />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>

            <Route path="*" element={<PageNotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
