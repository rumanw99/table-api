import React from 'react';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import DataContextProvider from './context/DataContext';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <DataContextProvider>
                <div className="titlePage">
                    <NavLink to="/">
                        {({ isActive }) => (
                            <span
                                style={{
                                    backgroundColor: isActive ? '#fdc936' : '',
                                    color: isActive ? '#322625' : '',
                                    fontWeight: isActive ? 'bold' : '',
                                }}
                            >
                                User
                            </span>
                        )}
                    </NavLink>

                    <span>/</span>

                    <NavLink to="/products">
                        {({ isActive }) => (
                            <span
                                style={{
                                    backgroundColor: isActive ? '#fdc936' : '',
                                    color: isActive ? '#322625' : '',
                                    fontWeight: isActive ? 'bold' : '',
                                }}
                            >
                                Product
                            </span>
                        )}
                    </NavLink>
                </div>
                <Routes>
                    <Route path="/" element={<UsersPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                </Routes>
            </DataContextProvider>
        </BrowserRouter>
    );
};

export default App;
