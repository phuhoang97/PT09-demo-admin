import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  // Sử dụng navigate để làm chức năng quay lại
  const navigate = useNavigate();

  // Lấy param trên đường dẫn URL
  const param = useParams();
  const { id } = param;

  // Khai báo state dùng để lưu trữ các giá trị của các ô input
  const [formInput, setFormInput] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  // Khai báo hàm để gọi dữ liệu từ API
  const loadUser = async () => {
    await axios
      .get(`http://localhost:8000/users/${id}`)
      .then((data) => setFormInput(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUser();
  }, []);

  // U - PUT / PATCH => Cần có id => url/:id

  const { name, age, email, phone } = formInput;

  // Khai báo hàm handleChangeInput để lấy các giá trị trong các ô input
  const handleChangeInput = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  // console.log(formInput);

  // Khai báo hàm handleSubmit để xử lý sự kiện submit của form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/users/${id}`, formInput);
    navigate("/");
  };

  return (
    <div>
      <div className='w-70 p-5 shadow mx-auto'>
        {/* Tạo chức năng quay lại */}
        <button onClick={() => navigate(-1)}>Bách</button>

        <h3>Edit User</h3>

        {/* Tạo form */}
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={handleChangeInput}
          />
          <br />

          <label>Age: </label>
          <input
            type='text'
            name='age'
            value={age}
            onChange={handleChangeInput}
          />
          <br />

          <label>Email: </label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={handleChangeInput}
          />
          <br />

          <label>Phone: </label>
          <input
            type='text'
            name='phone'
            value={phone}
            onChange={handleChangeInput}
          />
          <br />

          <button type='submit' className='btn btn-success'>
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
