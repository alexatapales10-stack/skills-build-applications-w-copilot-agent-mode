import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched data:', results);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.rank}</td>
              <td>{entry.user}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;
