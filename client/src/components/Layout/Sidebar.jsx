import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/users">User List</Link></li>
          <li><Link to="/admin/activity-log">Activity Log</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
