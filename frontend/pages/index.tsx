import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get('http://localhost:3001/employees');
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      <Link href="/employees/new">Add Employee</Link>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <Link href={`/employees/${employee.id}`}>
              {employee.name} - {employee.position} - {employee.availability}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
