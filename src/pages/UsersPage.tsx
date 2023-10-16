import UserTable from '../components/UserTable';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import { useDataContext } from '../context/DataContext';
const UserPage: React.FC = () => {
  
    const {
        totalUsers,
        setPageSizeUser,
        fetchUsers,
        setSearchQueryUser,
        setTotalUsers,
        pageSizeUser,
        users,
        searchQueryUser,
    } = useDataContext();
    const [currentPageUser, setCurrentPageUser] = useState<number>(1);
    const [visibleUsers, setVisibleUsers] = useState(
        users.slice(0, pageSizeUser)
    );

    const [selectedFilterUser, setSelectedFilterUser] = useState('all');
    const handleFilterChangeUser = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedFilterUser(e.target.value);
        setSearchQueryUser('');
    };

    const setPageUser = (page: number) => {
        setCurrentPageUser(page);
    };

    useEffect(() => {
        const newTotalPages = Math.ceil(users.length / pageSizeUser);
        setTotalUsers(newTotalPages);

        const searchPattern = new RegExp(`\\b${searchQueryUser}\\b`, 'i');

        const filteredProducts = users.filter((product) => {
            const productValues = Object.values(product).join(' ');
            const searchMatch = searchPattern.test(productValues);
            if (selectedFilterUser === 'all') {
                return searchMatch;
            } else if (selectedFilterUser === 'firstname') {
                return (
                    searchMatch ||
                    product.firstName
                        .toLowerCase()
                        .includes(searchQueryUser.toLowerCase())
                );
            } else if (selectedFilterUser === 'email') {
                return (
                    searchMatch ||
                    product.email
                        .toLowerCase()
                        .includes(searchQueryUser.toLowerCase())
                );
            } else if (selectedFilterUser === 'gender') {
                return (
                    searchMatch ||
                    product.gender.toLowerCase() ===
                        searchQueryUser.toLowerCase()
                );
            }
        });

        const startIndex = (currentPageUser - 1) * pageSizeUser;
        const endIndex = startIndex + pageSizeUser;
        const pageUsers = filteredProducts.slice(startIndex, endIndex);
        setVisibleUsers(pageUsers);
    }, [
        users,
        currentPageUser,
        pageSizeUser,
        selectedFilterUser,
        searchQueryUser,
        setTotalUsers,
    ]);

    const handlePageSizeUserChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSizeUser(newSize);
        setPageUser(1); // Reset to the first page when changing page size
        fetchUsers();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryUser(event.target.value);
    };

    const handlePrevPage = () => {
        if (currentPageUser > 1) {
            setPageUser(currentPageUser - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPageUser < totalUsers) {
            setPageUser(currentPageUser + 1);
        }
    };

    const [isSearchVisible, setSearchVisible] = useState(false);

    const toggleSearchInput = () => {
        setSearchVisible(!isSearchVisible);
        if (!isSearchVisible) {
            setSearchQueryUser('');
        }
    };

    return (
        <div>
            <h1>User Page</h1>

            <div className="search-and-filters">
                <div className="selectOption">
                    <select
                        value={pageSizeUser}
                        onChange={handlePageSizeUserChange}
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
                                value={searchQueryUser}
                                onChange={handleSearchChange}
                                placeholder="Search users..."
                            />
                            <span className="search" onClick={fetchUsers}>
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
                        value={selectedFilterUser}
                        onChange={handleFilterChangeUser}
                    >
                        <option value="all">All</option>
                        <option value="firstname">firstname</option>
                        <option value="email">Email</option>
                        <option value="gender">Gender</option>
                    </select>
                </div>
            </div>

            <UserTable visibleUsers={visibleUsers} />

            <div className="pagination">
                <span className="arrow" onClick={handlePrevPage}>
                    <BsArrowLeft />
                </span>
                {Array.from({ length: totalUsers }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setPageUser(index + 1)}
                        className={
                            index + 1 === currentPageUser
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

export default UserPage;
