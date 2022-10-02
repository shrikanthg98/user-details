import { Card } from 'antd';
import { Formik, ErrorMessage } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'

const bottom = {
  marginBottom: '20px',
};

const UserForm = ({ initialUserValues, userFormSchema, submitHandler }) => {
  return (
    <Card title='User Form' bordered={false} style={{ width: '100%', backgroundColor: '#232023', marginTop: 80 }}>
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
  );
}

export default UserForm;