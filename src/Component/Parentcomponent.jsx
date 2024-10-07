import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UpdateForm from './Updateform';
import axios from 'axios';

function Updating() {
    const { UserId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${UserId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                alert('User not found');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [UserId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <div className="form-container">
            <h2>Edit User</h2>
            <UpdateForm user={user} onClose={() => navigate('/users')} />
        </div>
    );
}

export default Updating;
