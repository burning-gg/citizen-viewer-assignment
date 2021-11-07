import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UpdateClientForm = ({
  updatingClient,
  location,
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      form.setFieldsValue({
        phone: updatingClient.phone,
        name: updatingClient.name,
        email: updatingClient.email,
      });
    }
  }, [form, updatingClient]);

  return (
    <Modal
      visible={visible}
      title='Редактировать информацию о жильце'
      okText='Редактировать'
      cancelText='Отмена'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            values.id = updatingClient.id;
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
          initialValue={updatingClient.phone}
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
        <Form.Item
          name='email'
          label='e-mail'
          initialValue={updatingClient.email}
          className='form-client-email'
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='name'
          label='Ф.И.О'
          initialValue={updatingClient.name}
          className='form-client-name'
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateClientForm;
