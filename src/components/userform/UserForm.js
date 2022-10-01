import './userform.css';
import { useState } from 'react';
import { Card, Button, Divider, Row, Col, Modal, Popconfirm } from 'antd';
import { Form, Input, SubmitButton } from 'formik-antd'
import { Formik, ErrorMessage } from 'formik'
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const bottom = {
  marginBottom: '20px',
};

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
    .required("*Requried"),
  email: Yup.string().email('Invalid email').required('*Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(250, 'Too Long!')
    .required('*Required'),
});

const UserForm = () => {
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
    <div className=".main">
      <div className='card'>
        <Card title="User Form" bordered={false} style={{ width: '100%', backgroundColor: '#232023', marginTop: 80 }}>
          <Formik
            initialValues={initialUserValues}
            validationSchema={userFormSchema}
            onSubmit={submitHandler}
            render={() => (
              <Form style={{ color: 'white' }}>
                Name:<br />
                <ErrorMessage name='name' />
                <Input name='name' style={bottom} />
                Email:<br />
                <ErrorMessage name='email' />
                <Input name='email' style={bottom} />
                Phone no:<br />
                <ErrorMessage name='phoneNum' />
                <Input type='number' controls={false} name='phoneNum' style={bottom} />
                Address:<br />
                <ErrorMessage name='address' />
                <Input.TextArea name='address' style={{ marginBottom: 20, height: 100 }} />
                <SubmitButton style={{ backgroundColor: '#0E56E5' }}>Submit</SubmitButton>
              </Form>
            )} />
        </Card >
      </div>
      <br />
      {users && users.length > 0 && <Divider><h1>{'--- Users List ---'}</h1></Divider>}
      <Row style={{ margin: 60 }} gutter={[48, 16]}>{
        users.map((ele, idx) => {
          return <Col>
            <Card
              hoverable
              bordered={false}
              style={{ width: 300, marginBottom: 25, backgroundColor: '#232023', cursor: 'pointer' }}
              actions={[
                <Popconfirm
                  title="Are you sure to delete this user?"
                  onConfirm={() => deleteUser(idx)}
                  placement='bottom'
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={{ backgroundColor: 'red', width: '100%' }}>Delete</Button>
                </Popconfirm>
              ]}
            >
              <h2 onClick={() => displayDetails(ele, idx)}><UserOutlined /> {ele.name}</h2>
              <h2 onClick={() => displayDetails(ele, idx)}><MailOutlined /> {ele.email}</h2>
            </Card>
          </Col>
        })
      }</Row>
      <Row>
        <Modal
          title="User Info"
          open={isModalOpen}
          onOk={handleCancel}
          closable={false}
          maskStyle={{ backgroundColor: '#232023' }}
          onCancel={handleCancel}
          cancelButtonProps={{ disabled: true }}
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

export default UserForm;