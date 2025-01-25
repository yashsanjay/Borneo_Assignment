import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import UserList from './UserList';
import ActivityLog from './ActivityLog';
import NormalLog from './NormalLog';
import RoleEditor from './RoleEditor';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [normalLogs, setNormalLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, activityLogResponse, normalLogResponse] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/activity-logs'),
          api.get('/admin/login-history'),
        ]);
        setUsers(userResponse.data);
        setActivityLogs(activityLogResponse.data);
        setNormalLogs(normalLogResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserList users={users} />
      <RoleEditor />
      <ActivityLog logs={activityLogs} />
      <NormalLog logs={normalLogs} />
    </div>
  );
};

export default AdminDashboard;
