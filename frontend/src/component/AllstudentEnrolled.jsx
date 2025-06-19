import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllstudentEnrolled() {
  const [students, setStudents] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null); // which user is expanded
  const [submissions, setSubmissions] = useState({}); // cache submissions

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/get-all-users');
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleMoreClick = async (handle) => {
    if (expandedUser === handle) {
      // Collapse if already opened
      setExpandedUser(null);
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5001/api/codeforces/user`, {
        handle: handle
      });
      setSubmissions(prev => ({ ...prev, [handle]: res.data.result }));
      setExpandedUser(handle);
    } catch (err) {
      console.error("Failed to fetch submission data:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">All Enrolled Students</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Codeforces Handle</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Rating</th>
              <th>Max Rating</th>
              <th>Rank</th>
              <th>Max Rank</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <React.Fragment key={student._id}>
                <tr>
                  <td>{student.handle}</td>
                  <td>{student.email || '-'}</td>
                  <td>{student.PhoneNumber || '-'}</td>
                  <td>{student.rating ?? '-'}</td>
                  <td>{student.maxRating ?? '-'}</td>
                  <td>{student.rank || '-'}</td>
                  <td>{student.maxRank || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => handleMoreClick(student.handle)}>
                      {expandedUser === student.handle ? 'Hide' : 'More'}
                    </button>
                  </td>
                </tr>

                {expandedUser === student.handle && submissions[student.handle] && (
                  <tr>
                    <td colSpan="8">
                      <div>
                        <h5>Submissions:</h5>
                        {submissions[student.handle].length === 0 ? (
                          <p>No submissions found.</p>
                        ) : (
                          <ul className="list-group">
                            {submissions[student.handle].map((sub, i) => (
                              <li key={i} className="list-group-item">
                                <strong>{sub.problem?.name}</strong> - {sub.verdict} - {sub.programmingLanguage} - {sub.problem?.rating ?? '-'} Rating
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllstudentEnrolled;
