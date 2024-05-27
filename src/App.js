import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import { MainContent } from './Components/MainContent';
import User from './Components/User/User';
import Invoice from './Components/Invoice/Invoice';
import CreateInvoice from './Components/Invoice/CreateInvoice'
import Newuser from './Components/User/Newuser';
import Edituser from './Components/User/Edituser';
import Product from './Components/Product/Product';
import Newproduct from './Components/Product/Newproduct';
import Editproduct from './Components/Product/Editproduct';
import Viewinvoice from './Components/Invoice/Viewinvoice';
import Order from './Components/User/Order';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='home' element={<Home />}>
          <Route path='dashboard' element={<MainContent />}></Route>
          <Route path='user' element={<User />}></Route>
          <Route path='' element={<Navigate to='dashboard'/>}></Route>
          <Route path='invoice' element={<Invoice />}></Route>
          <Route path='invoice/newinvoice' element={<CreateInvoice />}></Route>
          <Route path='user/newuser' element={<Newuser />}></Route>
          <Route path='user/edituser/:id' element={<Edituser />}></Route>
          <Route path='product' element={<Product />}></Route>
          <Route path='product/newproduct' element={<Newproduct />}></Route>
          <Route path='product/editproduct/:id' element={<Editproduct />}></Route>
          <Route path='invoice/viewinvoice/:id' element={<Viewinvoice />}></Route>
          <Route path='order' element={<Order />}></Route>
        </Route>
        <Route path='' element={<Navigate to='home' />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
