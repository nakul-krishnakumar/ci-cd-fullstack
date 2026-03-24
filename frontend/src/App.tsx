import { useState } from 'react'
import './App.css'

interface StudentDetails {
  name: string;
  rollno: string;
  age: number;
  college: string;
  graduationYear: number;
}

function App() {
  const [name, setName] = useState<string>('');
  const [response, setResponse] = useState<StudentDetails | null>(null);

  async function handleSubmit() {
    const data = await fetch('http://localhost:8000/student-details?name=' + name, {
      method: 'GET',
    });
    const payload = await data.json();
    setResponse(payload.studentDetails);
    console.log(payload.studentDetails);
  }

  return (
    <div>
      <label htmlFor="name">Enter Name: </label>
      <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <div className='main'>
        <p><strong>Name:</strong> {response?.name}</p>
        <p><strong>Roll Number: </strong> {response?.rollno}</p>
        <p><strong>Age: </strong> {response?.age}</p>
        <p><strong>College: </strong> {response?.college}</p>
        <p><strong>Graduation Year: </strong> {response?.graduationYear}</p>
      </div>
    </div>
  )
}

export default App
