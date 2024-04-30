import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import { MainContent } from './Components/MainContent';
import User from './Components/User';
import Invoice from './Components/Invoice';
import CreateInvoice from './Components/CreateInvoice'

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
        </Route>

        <Route path='' element={<Navigate to='home' />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
