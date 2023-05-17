import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalImage from "react-modal-image";
import "./crudStyle.css";

function Table() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Initialize with -1 to indicate no row is being edited
  const [selectedImage, setSelectedImage] = useState(null);

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    image: null,
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Invalid password format"
      ),
    image: Yup.mixed().required("Image is required"),
  });

  const onSubmit = (values) => {
    if (editIndex !== -1) {
      updateUser(values);
    } else {
      addUser(values);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  const addUser = (user) => {
    setUserData([...userData, user]);
    closeModal();
  };

  const deleteUser = (index) => {
    const updatedUsers = [...userData];
    updatedUsers.splice(index, 1);
    setUserData(updatedUsers);
  };

  const editUser = (index) => {
    const userToEdit = userData[index];
    setEditIndex(index);
    formik.setValues(userToEdit);
    openModal();
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = [...userData];
    updatedUsers[editIndex] = updatedUser;
    setUserData(updatedUsers);
    setEditIndex(-1);
    closeModal();
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <button onClick={openModal}>Add User Data</button>
      {isModalOpen && (
        <div className="modal open">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First name"
                name="fname"
                value={formik.values.fname}
                onChange={formik.handleChange}
              />
              {formik.touched.fname && formik.errors.fname && (
                <div className="error">{formik.errors.fname}</div>
              )}
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last name"
                name="lname"
                value={formik.values.lname}
                onChange={formik.handleChange}
              />
              {formik.touched.lname && formik.errors.lname && (
                <div className="error">{formik.errors.lname}</div>
              )}

              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}

              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}

              <input
                type="file"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="error">{formik.errors.image}</div>
              )}

              {editIndex !== -1 ? (
                <button type="submit">Update User</button>
              ) : (
                <button type="submit">Add User</button>
              )}

              <button type="button" onClick={closeModal}>
                Close Modal
              </button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td className="image-cell">
                {user.image && (
                  <ModalImage
                    small={URL.createObjectURL(user.image)}
                    large={URL.createObjectURL(user.image)}
                    alt="User Profile"
                    onClick={() => openImageModal(user.image)}
                  />
                )}
              </td>
              <td>
                <button onClick={() => deleteUser(index)}>Delete</button>
                <button onClick={() => editUser(index)}>Edit User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedImage && (
        <div className="modal open">
          <div className="modal-overlay" onClick={closeImageModal}></div>
          <div className="modal-content">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="User Profile"
              className="enlarged-image"
            />
            <button type="button" onClick={closeImageModal}>
              Close Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
