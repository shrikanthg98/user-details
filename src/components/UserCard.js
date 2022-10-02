import { Card, Col, Popconfirm, Button } from "antd";
import { UserOutlined, MailOutlined } from '@ant-design/icons';

const UserCard = ({ deleteUser, displayDetails, ele, idx }) => {
  return (<Col>
    <Card
      hoverable
      bordered={false}
      style={{
        width: 300,
        marginBottom: 25,
        backgroundColor: '#232023',
        cursor: 'pointer',
      }}
      actions={[
        <Popconfirm
          title='Are you sure to delete this user?'
          onConfirm={() => deleteUser(idx)}
          placement='top'
          okText='Yes'
          cancelText='No'
        >
          <Button style={{ backgroundColor: 'red', width: '100%' }}>Delete</Button>
        </Popconfirm>
      ]}
    >
      <h2 onClick={() => displayDetails(ele, idx)}><UserOutlined /> {ele.name}</h2>
      <h2 onClick={() => displayDetails(ele, idx)}><MailOutlined /> {ele.email}</h2>
    </Card>
  </Col>)
}

export default UserCard;