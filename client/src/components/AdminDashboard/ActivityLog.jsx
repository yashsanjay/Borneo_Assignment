import React from 'react';

const ActivityLog = ({ logs }) => {
  return (
    <div>
      <h2>Activity Logs by Admin</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
            <th>Resource Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.userId?.email || 'N/A'}</td>
              <td>{log.action}</td>
              <td>{log.resourceType}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLog;
