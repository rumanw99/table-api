import React, { createContext, useContext, ReactNode } from 'react';
import { UserData } from '../types/UserData';
import { ProductData } from '../types/ProductData';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { DataContextType } from '../types';



const DataContext = createContext<DataContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
};

interface DataContextProviderProps {
    children: ReactNode;
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({
    children,
}) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [searchQueryUser, setSearchQueryUser] = useState<string>('');
    const [pageSizeUser, setPageSizeUser] = useState<number>(5);
    const [totalUsers, setTotalUsers] = useState<number>(
        Math.ceil(users.length / pageSizeUser)
    );

    const [products, setProducts] = useState<ProductData[]>([]);
    const [searchQueryProduct, setSearchQueryProduct] = useState<string>('');
    const [pageSizeProduct, setPageSizeProduct] = useState<number>(5);
    const [totalItemsProduct, setTotalItemsProduct] = useState<number>(
        Math.ceil(products.length / pageSizeProduct)
    );

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://dummyjson.com/users/search?q=${searchQueryUser}`
            );

            setUsers(response.data.users);
            setTotalUsers(response.headers['x-total-count']); // Set total users from response headers
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [searchQueryUser]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://dummyjson.com/products/search?q=${searchQueryProduct}`
            );
         
            setProducts(response.data.products);
            setTotalItemsProduct(response.headers['x-total-count']); // Set total items from response headers
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [searchQueryProduct]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <DataContext.Provider
            value={{
                users,

                products,

                pageSizeUser,
                totalUsers,
                searchQueryUser,
                pageSizeProduct,
                searchQueryProduct,
                totalItemsProduct,
                setSearchQueryUser,
                setPageSizeUser,
                setTotalUsers,
                fetchUsers,
                setSearchQueryProduct,
                setTotalItemsProduct,
                fetchProducts,
                setPageSizeProduct,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;
