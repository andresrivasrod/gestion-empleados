import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [availability, setAvailability] = useState('Available');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/employees', { name, position, availability });
    router.push('/');
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
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
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default NewEmployee;
