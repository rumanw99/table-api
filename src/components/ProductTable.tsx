import React from 'react';
import { ProductTableProps } from '../types';



const ProductTable: React.FC<ProductTableProps> = ({ visibleProducts }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>price</th>
                    <th>brand</th>
                    <th>category</th>
                    <th>description</th>
                    <th>discountPercentage</th>
                    <th>rating</th>
                    <th>stock</th>
                    <th>thumbnail</th>
                    
                </tr>
            </thead>
            <tbody>
                {visibleProducts.length === 0 ? (
                    <p>Not Existing Row</p>
                ):
                visibleProducts.map((product) => (
                    <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td>{product.discountPercentage}</td>
                        <td>{product.rating}</td>
                        <td>{product.stock}</td>
                        <td>{product.thumbnail}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
