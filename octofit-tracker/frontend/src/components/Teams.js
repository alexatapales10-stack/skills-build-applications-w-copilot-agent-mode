import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Teams = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched data:', results);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teams</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, idx) => (
            <tr key={idx}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Teams;
