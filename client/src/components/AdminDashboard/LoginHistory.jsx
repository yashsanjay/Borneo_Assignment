import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const LoginHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/admin/login-history');
        setLogs(response.data);
      } catch (err) {
        console.error('Error fetching login history:', err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Login History</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>IP Address</th>
            <th>Device</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.userId.email}</td>
              <td>{log.ip}</td>
              <td>{log.device}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginHistory;
