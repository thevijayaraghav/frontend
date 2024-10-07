import React, { useEffect, useState } from 'react';
import AllUsers from './Allusers';
import axios from 'axios';
import { useNavigate ,Link } from 'react-router-dom';
import '../../src/App.css'


function UserManagement() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (UserId) => {
        
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return; 

        try {
            await axios.delete(`http://localhost:3001/delete/${UserId}`);
            setUsers(users.filter(user => user.UserId !== UserId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (<>
        <div>
            <h2 className='headings'>User Management</h2>
            <AllUsers users={users} onEdit={(user) => navigate(`/update/${user.UserId}`)} onDelete={handleDelete} />
        </div>

        <p className='links-container'>
            <Link to="/" >Home</Link> | <Link to="/register" >Register</Link>
          </p>
        </>
    );
}

export default UserManagement;
