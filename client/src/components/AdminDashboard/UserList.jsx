import React, { useState } from 'react';
import api from '../../utils/api';

const UserList = ({ users }) => {
  const [editUser, setEditUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        setMessage('User deleted successfully!');
        window.location.reload();
      } catch (err) {
        setMessage('Error deleting user');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${editUser._id}`, editUser);
      setMessage('User updated successfully!');
      setEditUser(null);
      window.location.reload();
    } catch (err) {
      setMessage('Error updating user');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ marginLeft: '8px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <form onSubmit={handleUpdate} style={{display: 'inline'}}>
          <h3>Edit User</h3>
          <label>Email:</label>
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <label>Role:</label>
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <label>Status:</label>
          <select
            value={editUser.status}
            onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditUser(null)} type="button" style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UserList;
