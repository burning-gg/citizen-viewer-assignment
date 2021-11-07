import React from 'react';
import { Modal, Form, Input } from 'antd';

const AddClientForm = ({ location, visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title='Добавить жильца'
      okText='Добавить'
      cancelText='Отмена'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='modalAddClient'
        className='form-client-main'
      >
        <div className='location-name'>{location}</div>
        <Form.Item
          name='phone'
          label='Телефон'
          className='form-client-phone'
          rules={[
            {
              required: true,
              message: 'Номер телефона - обязательное поле',
            },
          ]}
        >
          <Input addonBefore='+7' />
        </Form.Item>
        <Form.Item name='email' label='e-mail' className='form-client-email'>
          <Input />
        </Form.Item>
        <Form.Item name='name' label='Ф.И.О' className='form-client-name'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClientForm;
