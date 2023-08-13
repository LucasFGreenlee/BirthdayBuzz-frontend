'use client';
import { useState, useEffect } from 'react';

function OptionsBar({ users }) {
  const [filter, setFilter] = useState('Upcoming');
  const [sortBy, setSortBy] = useState('Friend');
  const [columns, setColumns] = useState('firstName');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    let result = [...users];

    // Filter By logic
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetting time to ensure only date comparison
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    if (filter === 'Upcoming') {
      result = result.filter(user => {
        const birthday = new Date(user.birthday);
        return (birthday >= today) && (birthday < thirtyDaysFromNow);
      });
    } else {
      result = result.filter(user => {
        const month = new Date(user.birthday).getMonth();
        return month === new Date(Date.parse(`01 ${filter} 2000`)).getMonth();
      });
    }

    // Sort By logic
    result = result.filter(user => user.relationshipType === sortBy);

    // Set the resulting filtered array
    setFilteredUsers(result);

  }, [filter, sortBy, users]);

  return (
    <div className="p-4 bg-gray-200 rounded-md">
      <h2 className="mb-2 font-bold">Options</h2>

      <div className="flex space-x-4">
        <div>
          <label htmlFor="filter" className="block mb-1 text-sm">Filter By:</label>
          <select 
            id="filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="Upcoming">Upcoming</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="block mb-1 text-sm">Sort By:</label>
          <select 
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md"
          >
            {['Friend', 'Family', 'Lover', 'Pet'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="columns" className="block mb-1 text-sm">Columns:</label>
          <select 
            id="columns"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            className="p-2 border rounded-md"
          >
            {['firstName', 'lastName', 'birthday', 'email', 'phone'].map(column => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 font-bold">Filtered Users</h3>
        {filteredUsers.map(user => (
          <div key={user.id} className="p-4 border rounded mb-4 bg-white">
            {columns === 'firstName' && <p className="text-black">{user.firstName}</p>}
            {columns === 'lastName' && <p className="text-black">{user.lastName}</p>}
            {columns === 'birthday' && <p className="text-black">Birthday: {user.birthday}</p>}
            {columns === 'email' && <p className="text-black">Email: {user.email}</p>}
            {columns === 'phone' && <p className="text-black">Phone: {user.phone}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsBar;
