import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [],
      editing: false,
      adding: false,
      editid: null,
      name: '',
      email: '',
      newId: '',       
      newName: '',
      newEmail: ''
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    axios.get('http://localhost:3001/Students')
      .then(response => this.setState({ students: response.data }))
      .catch(error => console.error("Error fetching students:", error));
  }

    handleDelete = (id) => {
    axios.delete(`http://localhost:3001/Students/${id}`)
      .then(() => this.setState({ students: this.state.students.filter(student => student.id !== id) }))
      .catch(error => console.error("Error deleting student:", error));
  }

  handleUpdate = (student) => {
    this.setState({
      editing: true,
      adding: false,  
      editid: student.id,
      name: student.name,
      email: student.email
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { editid, name, email } = this.state;

    axios.put(`http://localhost:3001/Students/${editid}`, { id: editid, name, email })
      .then(response => {
        const updatedStudent = response.data;
        this.setState(prevState => ({
          students: prevState.students.map(student => 
            student.id === editid ? updatedStudent : student
          ),
          editing: false,
          editid: null,
          name: '',
          email: ''
        }));
      })
      .catch(error => console.error("Error updating student:", error));
  }

  handleCancelEdit = () => {
    this.setState({
      editing: false,
      editid: null,
      name: '',
      email: ''
    });
  }



  handleAddInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleAddFormSubmit = (event) => {
    event.preventDefault();
    const { newId, newName, newEmail, students } = this.state;

    // Check if newId already exists
    const idExists = students.some(student => student.id === Number(newId));
    if (idExists) {
      alert(`Student with ID ${newId} already exists!`);
      return;  // Don't proceed
    }

    // Add new student
    axios.post('http://localhost:3001/Students', { id: Number(newId), name: newName, email: newEmail })
      .then(response => {
        this.setState(prevState => ({
          students: [...prevState.students, response.data],
          newId: '',
          newName: '',
          newEmail: '',
          adding: false
        }));
      })
      .catch(error => console.error("Error adding student:", error));
  }

  handleAddCancel = () => {
    this.setState({
      adding: false,
      newId: '',
      newName: '',
      newEmail: ''
    });
  }

  handleShowAddForm = () => {
    this.setState({
      adding: true,
      editing: false
    });
  }

  render() {
    const { adding, editing } = this.state;

    return (
      <>
        <h1>Student Details</h1>

        {!adding && (
          <button onClick={this.handleShowAddForm}>Add Student</button>
        )}

        {adding && (
          <>
            <h3>Add New Student</h3>
            <form onSubmit={this.handleAddFormSubmit}>
              <label>ID: </label>
              <input
                type="number"
                name="newId"
                value={this.state.newId}
                onChange={this.handleAddInputChange}
                required
              /><br />

              <label>Name: </label>
              <input
                type="text"
                name="newName"
                value={this.state.newName}
                onChange={this.handleAddInputChange}
                required
              /><br />

              <label>Email: </label>
              <input
                type="email"
                name="newEmail"
                value={this.state.newEmail}
                onChange={this.handleAddInputChange}
                required
              /><br />

              <button type="submit">Add Student</button>
              <button type="button" onClick={this.handleAddCancel} style={{ marginLeft: '10px' }}>
                Cancel
              </button>
            </form>
          </>
        )}

        
<table border={1} style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <td><b>ID</b></td>
              <td><b>Name</b></td>
              <td><b>Email</b></td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={() => this.handleDelete(student.id)}>Delete</button>
                  <button onClick={() => this.handleUpdate(student)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editing && (
          <form onSubmit={this.handleFormSubmit} style={{ marginTop: '20px' }}>
            <h3>Edit Student</h3>
            <label>ID: </label>
            <input type="text" value={this.state.editid} readOnly /><br />

            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            /><br />

            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            /><br />

            <button type="submit">Update</button>
            <button type="button" onClick={this.handleCancelEdit}>Cancel</button>
          </form>
        )}
      </>
    );
  }
}

export default App;
