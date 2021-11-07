import React, { useState, useEffect, Fragment } from 'react';
import { Card, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import NotFound from './NotFound';
import Loader from './Loader';
import AddClientForm from './AddClientForm';
import UpdateClientForm from './UpdateClientForm';

import { connect } from 'react-redux';
import { addClient, updateClient, deleteClient } from '../actions/clientAction';
import { setAlert } from '../actions/alertAction';

const { confirm } = Modal;

function showDeleteConfirm(client, addressId, deleteClient, setAlert) {
  confirm({
    title: 'Вы действительно хотите удалить данные этого жителя?',
    icon: <ExclamationCircleOutlined />,
    content: 'Данные не восстанавливаемы',
    onOk() {
      deleteClient(client, addressId);
    },
    onCancel() {
      setAlert('Удаление данных жителя отменено', 'warning');
    },
  });
}

const ShowPanel = ({
  addClient,
  updateClient,
  deleteClient,
  setAlert,
  search: { location, addressId, loading: searchLoading },
  clients: { clients, loading },
}) => {
  const [clientList, setClientList] = useState([]);
  const [visibleAddClient, setVisibleAddClient] = useState(false);
  const [visibleUpdateClient, setVisibleUpdateClient] = useState(false);
  const [updatingClient, setUpdatingClient] = useState({
    id: null,
    name: null,
    email: null,
    phone: null,
  });

  const onCreateNewClient = (values) => {
    addClient(values, addressId);
    setVisibleAddClient(false);
  };

  const onUpdateClient = (values) => {
    updateClient(values, addressId);
    setVisibleUpdateClient(false);
  };

  useEffect(() => {
    setClientList(clients);
  }, [clients]);

  return (
    <div className='main-content'>
      <div className='address-name'>
        {location === '' ? 'Выберите адрес для просмотра жильцов' : location}
        {location && (
          <Fragment>
            <UserAddOutlined
              className='add-client-icon'
              onClick={() => {
                setVisibleAddClient(true);
              }}
            />
            <AddClientForm
              location={location}
              visible={visibleAddClient}
              onCreate={onCreateNewClient}
              onCancel={() => {
                setVisibleAddClient(false);
              }}
            />
            <UpdateClientForm
              updatingClient={updatingClient}
              location={location}
              visible={visibleUpdateClient}
              onCreate={onUpdateClient}
              onCancel={() => {
                setVisibleUpdateClient(false);
              }}
            />
          </Fragment>
        )}
      </div>
      {loading && searchLoading && <Loader />}
      {loading && !searchLoading && <NotFound isLoaded={false} />}
      {!loading && clientList.length === 0 && <NotFound isLoaded={true} />}
      <div className='clients-list'>
        {!loading &&
          clientList.length > 0 &&
          clientList.map((client) => (
            <Card
              actions={[
                <DeleteOutlined
                  key='delete'
                  onClick={() =>
                    showDeleteConfirm(client, addressId, deleteClient, setAlert)
                  }
                />,
                <EditOutlined
                  key='edit'
                  onClick={() => {
                    setUpdatingClient(client);
                    setVisibleUpdateClient(true);
                  }}
                />,
              ]}
              key={client.id}
              className='client-card'
            >
              <UserOutlined className='card-icon' />
              <div className='card-content'>
                <div className='client-name'>{client.name}</div>
                <div className='client-phone'>
                  <PhoneOutlined className='phone-icon' />
                  {client.phone}
                </div>
                {client.email !== '' ? (
                  <div className='client-email'>
                    <MailOutlined className='email-icon' />
                    {client.email}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.searchReducer,
  clients: state.clientReducer,
});

export default connect(mapStateToProps, {
  addClient,
  updateClient,
  deleteClient,
  setAlert,
})(ShowPanel);
