import React, { useEffect, useState } from "react";
import LayoutNavbar from "../layouts/LayoutNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function HomePage() {
  // State dùng để chứa dữ liệu trả về từ API
  const [users, setUsers] = useState([]);

  // Khai báo hàm dùng để gọi và xử lý API
  const loadUser = async () => {
    await axios
      .get("http://localhost:8000/users")
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    loadUser();
  };

  // Sử dụng useEffect để khi component được render sẽ có dữ liệu
  useEffect(() => {
    loadUser();
  }, []);

  // Modals
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <LayoutNavbar />
      <h3 style={{ textAlign: "center" }}>Homepage</h3>

      {/* Form tìm kiếm và Chức năng thêm user */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#faf8f8",
        }}
      >
        <Link to={"/add-user"}>
          <button type='button' className='btn btn-outline-success'>
            AddUser
          </button>
        </Link>

        <form className='d-flex' role='search'>
          <input
            className='form-control me-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
          />
          <button className='btn btn-outline-success' type='submit'>
            Search
          </button>
        </form>
      </div>

      {/* Hiển thị dữ liệu */}
      <table className='table table-striped text-center mt-5'>
        <thead className='table-info'>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((element, index) => (
            <tr key={element.id}>
              <td>{index + 1}</td>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.age}</td>
              <td>{element.email}</td>
              <td>{element.phone}</td>
              <td>
                <Button variant='primary' onClick={handleShow}>
                  Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Link to={`/edit-user/${element.id}`}>
                  <button type='button' className='btn btn-outline-warning'>
                    Edit
                  </button>
                </Link>

                <button
                  type='button'
                  className='btn btn-outline-danger'
                  onClick={() => handleDeleteUser(element.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 
      Làm lại bài, 
      Làm chức năng view xem chi tiết
      Tìm hiểu cách sử dụng search sort, phân trang với json-server => lên trang chủ json-server đọc docx

      */}
    </div>
  );
}

export default HomePage;
