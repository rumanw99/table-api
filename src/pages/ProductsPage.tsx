import ProductTable from '../components/ProductTable';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useDataContext } from '../context/DataContext';
const ProductPage: React.FC = () => {
   

    const {
        products,
        setSearchQueryProduct,
        pageSizeProduct,
        setTotalItemsProduct,
        searchQueryProduct,
        totalItemsProduct,
        fetchProducts,
        setPageSizeProduct,
    } = useDataContext();
    const [currentPageProduct, setCurrentPageProduct] = useState<number>(1);

    const [visibleProducts, setVisibleProducts] = useState(
        products.slice(0, pageSizeProduct)
    );
    const [selectedFilterProduct, setSelectedFilterProduct] = useState('all');

    const handleFilterChangeProduct = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedFilterProduct(e.target.value);
        setSearchQueryProduct('');
    };

    const setPageProduct = (page: number) => {
        setCurrentPageProduct(page);
    };

    useEffect(() => {
        const newTotalPages = Math.ceil(products.length / pageSizeProduct);
        setTotalItemsProduct(newTotalPages);

        const searchPattern = new RegExp(`\\b${searchQueryProduct}\\b`, 'i');

        const filteredProducts = products.filter((product) => {
            const productValues = Object.values(product).join(' ');
            const searchMatch = searchPattern.test(productValues);
            if (selectedFilterProduct === 'all') {
                return searchMatch;
            } else if (selectedFilterProduct === 'title') {
                return (
                    searchMatch ||
                    product.title
                        .toLowerCase()
                        .includes(searchQueryProduct.toLowerCase())
                );
            } else if (selectedFilterProduct === 'price') {
                return searchMatch || product.price;
            } else if (selectedFilterProduct === 'brand') {
                return (
                    searchMatch ||
                    product.brand.toLowerCase() ===
                        searchQueryProduct.toLowerCase()
                );
            }
        });
        const startIndex = (currentPageProduct - 1) * pageSizeProduct;
        const endIndex = startIndex + pageSizeProduct;
        const pageProducts = filteredProducts.slice(startIndex, endIndex);
        setVisibleProducts(pageProducts);
    }, [
        products,
        currentPageProduct,
        pageSizeProduct,
        selectedFilterProduct,
        searchQueryProduct,
        setTotalItemsProduct,
    ]);

    const handlepageSizeProductChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSizeProduct(newSize);
        setPageProduct(1); // Reset to the first page when changing page size
        fetchProducts();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryProduct(event.target.value);
    };

    const handlePrevPage = () => {
        if (currentPageProduct > 1) {
            setPageProduct(currentPageProduct - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPageProduct < totalItemsProduct) {
            setPageProduct(currentPageProduct + 1);
        }
    };
    const [isSearchVisible, setSearchVisible] = useState(false);

    const toggleSearchInput = () => {
        setSearchVisible(!isSearchVisible);
        if (!isSearchVisible) {
            setSearchQueryProduct('');
        }
    };

    return (
        <div>
            <h1>Product Page</h1>
            <div className="search-and-filters">
                <div className="selectOption">
                    <select
                        value={pageSizeProduct}
                        onChange={handlepageSizeProductChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <p>Entries</p>
                <div className="line"></div>

                <div className="search-input">
                    {isSearchVisible ? (
                        <div>
                            <input
                                type="text"
                                id="search"
                                value={searchQueryProduct}
                                onChange={handleSearchChange}
                                placeholder="Search users..."
                            />
                            <span className="search" onClick={fetchProducts}>
                                <FaSearch />
                            </span>
                        </div>
                    ) : (
                        <span className="search" onClick={toggleSearchInput}>
                            <FaSearch />
                        </span>
                    )}
                </div>

                <div className="line"></div>
                <div className="filter-dropdown">
                    <label htmlFor="filter">Filter by:</label>
                    <select
                        id="filter"
                        value={selectedFilterProduct}
                        onChange={handleFilterChangeProduct}
                    >
                        <option value="all">All</option>
                        <option value="firstname">firstname</option>
                        <option value="email">Email</option>
                        <option value="gender">Gender</option>
                    </select>
                </div>
            </div>
            <ProductTable visibleProducts={visibleProducts} />

            <div className="pagination">
                <span className="arrow" onClick={handlePrevPage}>
                    <BsArrowLeft />
                </span>
                {Array.from({ length: totalItemsProduct }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setPageProduct(index + 1)}
                        className={
                            index + 1 === currentPageProduct
                                ? 'number active'
                                : 'number'
                        }
                    >
                        {index + 1}
                    </span>
                ))}
                <span className="arrow" onClick={handleNextPage}>
                    <BsArrowRight />
                </span>
            </div>
        </div>
    );
};

export default ProductPage;
