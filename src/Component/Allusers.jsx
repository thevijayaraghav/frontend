import React from 'react';
import { Table } from 'react-bootstrap';
import { MdEdit, MdDeleteSweep } from "react-icons/md";
import Container from 'react-bootstrap/Container';

function AllUsers({ users = [], onEdit, onDelete }) {
    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.UserId}>
                            <td onClick={() => onEdit(user)} style={{ cursor: 'pointer', color: 'blue' }}>{user.UserId}</td>
                            <td>{user.email}</td>
                            <td>
                                <MdEdit onClick={() => onEdit(user)} style={{ cursor: 'pointer' }} />
                            </td>
                            <td>
                                <MdDeleteSweep onClick={() => onDelete(user.UserId)} style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AllUsers;
