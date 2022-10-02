import './homepage.css';
import { useState } from 'react';
import { Divider, Row, Modal } from 'antd';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import UserForm from '../UserForm'
import UserCard from '../UserCard';

const initialUserValues = {
  name: '',
  phoneNum: '',
  email: '',
  address: '',
}

const userFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('*Required'),
  phoneNum: Yup.number()
    .positive()
    .min(10, 'Minimum 10 digits required')
    .required('*Requried'),
  email: Yup.string().email('Invalid email').required('*Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(250, 'Too Long!')
    .required('*Required'),
});

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const submitHandler = (val, { resetForm }) => {
    setUsers([...users, val]);
    toast.success('User Added!', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
      autoClose: 2000,
    });
    resetForm();
  }

  const displayDetails = (val, idx) => {
    setIsModalOpen(true);
    setSelectedUser(val);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const deleteUser = (idx) => {
    const allUsers = [...users];
    allUsers.splice(idx, 1);
    toast.error('User Deleted', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
      autoClose: 2000,
    });
    setUsers(allUsers);
  }

  return (
    <div>
      <h1 className='heading'>Mangage User Details</h1>
      <div className='card'>
        <UserForm
          initialUserValues={initialUserValues}
          userFormSchema={userFormSchema}
          submitHandler={submitHandler}
        />
      </div>
      <br />
      {users && users.length > 0 && <Divider><h1>{'--- Users List ---'}</h1></Divider>}
      <Row style={{ margin: 60 }} gutter={[48, 16]}>{
        users && users.length > 0 && users.map((ele, idx) => {
          return <UserCard
            deleteUser={deleteUser}
            displayDetails={displayDetails}
            ele={ele}
            idx={idx}
          />
        })
      }</Row>
      <Row>
        <Modal
          title='User Info'
          open={isModalOpen}
          onOk={handleCancel}
          closable={false}
          maskStyle={{ backgroundColor: '#232023' }}
          onCancel={handleCancel}
          okButtonProps={{ backgroundColor: '#0E56E5' }}
        >
          <h2>Name: {selectedUser && selectedUser.name}</h2>
          <h2>Email: {selectedUser && selectedUser.email}</h2>
          <h2>Phone Number: {selectedUser && selectedUser.phoneNum}</h2>
          <h2>Address: {selectedUser && selectedUser.address}</h2>
        </Modal>
      </Row>
    </div>
  )
}

export default HomePage;