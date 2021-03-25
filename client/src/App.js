import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import FormControl from "react-bootstrap/FormControl";
import { Form, Button, Col, Row, Card, Table, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [userdata, setUserdata] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [show, setshow] = useState(false);
  const [userId, setuserID] = useState("");

  const handleClose = () => {
    setshow(false);
  };

  const handleModal = (data) => {
    setfirstName(data.firstName);
    setlastName(data.lastName);
    setemail(data.email);
    setmobile(data.mobile);
    setuserID(data._id);
    setshow(true);
  };
  const saveNewuser = () => {
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
    };
    axios
      .post("http://localhost:5000/api/user/userModel", newUser)
      .then(res => handleGetdata())
      .catch((err) => console.log(err));
  };

  const handleEdit = (data) => {
    let editBody = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
    };
    axios
      .post("http://localhost:5000/api/user/Updatedata", editBody)
      .then((res) => setshow(false))
      .catch((err) => console.log(err));
  };
  const handleDelete = (data) => {
    let deleteId = {
      id: data._id,
    };
    axios
      .post("http://localhost:5000/api/user/Removedata", deleteId)
      .then(res => handleGetdata())
      .catch((err) => console.log(err));
  };
const handleGetdata = () => {
  axios
  .get("http://localhost:5000/api/user/getdata")
  .then((res) => setUserdata(res.data))
  .catch((err) => console.log(err));
}
  useEffect(() => {
   handleGetdata()
  }, [show]);
  return (
    <div className="App">
      <div style={{textAlign:"-webkit-center" , marginBottom:"3rem", marginTop:"3rem"}}>
      <Card style={{ width: "50rem" }}>
        <Card.Header>New User Register</Card.Header>
        <Card.Body>
          <Form>
            <Row style={{ justifyContent: "center" }}>
              <Col md={4}>
                <FormControl
                  placeholder="First Name"
                  type="text"
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <FormControl
                  placeholder="Last Name"
                  type="text"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Row style={{ justifyContent: "center" }}>
              <Col md={4}>
                <FormControl
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <FormControl
                  placeholder="Mobile Number"
                  type="number"
                  onChange={(e) => setmobile(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Button variant="primary" type="submit" onClick={saveNewuser}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userdata &&
            userdata.map((data) => (
              <tr key={data._id}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.mobile}</td>
                <td>
                  <Button onClick={() => handleModal(data)}>Edit</Button>
                </td>
                <td>
                  <Button onClick={() => handleDelete(data)}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Row style={{ justifyContent: "center" }}>
              <Col md={4}>
                <FormControl
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <FormControl
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Row style={{ justifyContent: "center" }}>
              <Col md={4}>
                <FormControl
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <FormControl
                  placeholder="Mobile Number"
                  type="number"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
