import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Users = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Users endpoint:', endpoint);
        console.log('Fetched data:', results);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr key={idx}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
