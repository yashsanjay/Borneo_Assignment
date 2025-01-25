import React from 'react';

const NormalLog = ({ logs }) => {
  return (
    <div>
      <h2>Normal Logs</h2>
      <table>
        <thead>
          <tr>
            <th>User Email</th>
            <th>IP Address</th>
            <th>Device</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.userId?.email || 'N/A'}</td>
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

export default NormalLog;
