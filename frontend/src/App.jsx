import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roll: "",
    department: "",
    email: ""
  });

  // READ
  const fetchStudents = async () => {
    const res = await fetch("http://127.0.0.1:5000/students");
    const data = await res.json();
    setStudents(data);
  };

  // CREATE
  const addStudent = async () => {
    await fetch("http://127.0.0.1:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchStudents();
  };

  // DELETE
  const deleteStudent = async (id) => {
    await fetch(`http://127.0.0.1:5000/delete/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h2>Student Management System</h2>

      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Roll No"
        onChange={(e) => setForm({ ...form, roll: e.target.value })} />

      <input placeholder="Department"
        onChange={(e) => setForm({ ...form, department: e.target.value })} />

      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <button onClick={addStudent}>Add Student</button>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Roll</th>
            <th>Dept</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s[0]}>
              <td>{s[0]}</td>
              <td>{s[1]}</td>
              <td>{s[2]}</td>
              <td>{s[3]}</td>
              <td>{s[4]}</td>
              <td>
                <button onClick={() => deleteStudent(s[0])}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;