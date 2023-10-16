import React from 'react';
import { UserTableProps } from '../types';



const UserTable: React.FC<UserTableProps> = ({ visibleUsers }) => {
   

    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>maidenName</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>Email</th>
                    <th>username</th>
                    <th>bloodGroup</th>
                    <th>eyeColor</th>
                    <th>phone</th>
                    <th>ssn</th>
                    <th>height</th>
                </tr>
            </thead>
            <tbody>
                {visibleUsers.length === 0 ? (
                    <p>Not Existing Row</p>
                ):
                visibleUsers.map((user) => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.maidenName}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.bloodGroup}</td>
                        <td>{user.eyeColor}</td>
                        <td>{user.phone}</td>
                        <td>{user.ssn}</td>
                        <td>{user.height}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    );
};

export default UserTable;
