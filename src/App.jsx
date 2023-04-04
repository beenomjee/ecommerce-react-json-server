import React from 'react'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import { BrowserRouter as BrowserRouterProvider, Route, Routes } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import Product from './pages/Products/Product';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import Cart from './pages/Cart/Cart';
import ErrorPage from './pages/ErrorPage/ErrorPage';
const App = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouterProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />

            <Route path="products/" >
              <Route index element={<Product />} />
              <Route path=':id' element={<SingleProduct />} />
            </Route>


            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouterProvider></ReduxProvider>
  )
}

export default App