import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Employee = () => {
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [availability, setAvailability] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`http://localhost:3001/employees/${id}`);
      setEmployee(response.data);
      setName(response.data.name);
      setPosition(response.data.position);
      setAvailability(response.data.availability);
    };
    if (id) fetchEmployee();
  }, [id]);

  const handleUpdate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/employees/${id}`, { name, position, availability });
    router.push('/');
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/employees/${id}`);
    router.push('/');
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
          <option value="On Vacation">On Vacation</option>
        </select>
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Employee;
