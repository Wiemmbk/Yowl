import { Route, Routes } from 'react-router-dom';
import './App.css';
//ici on importe les components en tant que routes
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Loading from './pages/Loading';
import Index from './pages/AfterLogin/Index';
import Book from './pages/AfterLogin/Book';
import Account from './pages/AfterLogin/Account/Account';
import AllComments from './pages/AfterLogin/Account/AllComments';



function App() {
    return (
        <div className="App">
            <Routes>
                {/* path = '/' quand on est à la racine du site on veut afficher un element 'home' */}
                <Route path='/'element={<Home/>}/>
                <Route path='/Index'element={<Index/>}/>
                <Route path='/Login'element={<Login/>}/>
                <Route path='/SignUp'element={<SignUp/>}/>
                <Route path='/Loading'element={<Loading/>}/>
                <Route path='/Book/:id'element={<Book/>}/>
                <Route path='/Account'element={<Account/>}/>
                <Route path='/AllComments/:id/:book_id'element={<AllComments/>}/>
            </Routes>
        </div>
    );
}

export default App;