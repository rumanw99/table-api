import { ProductData } from "./ProductData";
import { UserData } from "./UserData";

export type DataContextType = {
    users: UserData[];
    products: ProductData[];
    pageSizeProduct: number;
    pageSizeUser: number;
    totalItemsProduct: number;
    totalUsers: number;
    searchQueryProduct: string;
    searchQueryUser: string;
    setPageSizeProduct: (size: number) => void;
    setPageSizeUser: (size: number) => void;
    setSearchQueryProduct: (query: string) => void;
    setSearchQueryUser: (query: string) => void;
    fetchUsers: () => void;
    fetchProducts: () => void;
    setTotalUsers: (user: number) => void;
    setTotalItemsProduct: (prodct: number) => void;
};

export type UserTableProps = {
    visibleUsers: UserData[];
}

export type ProductTableProps ={
    visibleProducts: ProductData[];
}