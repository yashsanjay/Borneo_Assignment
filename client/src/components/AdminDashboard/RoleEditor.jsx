import React, { useState } from 'react';
import api from '../../utils/api';

const RoleEditor = () => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('User');
  const [status, setStatus] = useState('active');
  const [message, setMessage] = useState('');

  const handleRoleChange = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${userId}/role`, { role, status });
      setMessage('Role updated successfully!');
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setMessage('Error updating role. Please try again.');
    }
  };

  return (
    <div>
      <h2>Assign or Edit Role with User ID</h2>
      <form onSubmit={handleRoleChange}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit">Update Role</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RoleEditor;
