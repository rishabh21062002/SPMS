import { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Container() {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [handle, setHandle] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/add-user', {
        email,
        PhoneNumber: mobile,
        handle
      });

      console.log("✅ Enrolled successfully:", response.data);
      alert("Student enrolled successfully!");
    } catch (err) {
      console.error("❌ Enrollment failed:", err.response?.data || err.message);
      alert("Failed to enroll student.");
    }
  };

  return (
    <div className="enroll-wrapper d-flex justify-content-center align-items-center">
      <div className="container-xl w-50">
        <h1 className="text-center mb-4">Enroll New Student</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="mobile" className="form-label mt-3">Mobile No</label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            placeholder="9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <label htmlFor="handle" className="form-label mt-3">Codeforces Handle</label>
          <input
            type="text"
            className="form-control"
            id="handle"
            placeholder="codeforces_handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-success mt-4 w-100"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Container;
