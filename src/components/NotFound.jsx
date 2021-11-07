import React from 'react';
import { StopOutlined } from '@ant-design/icons';

const NotFound = ({ isLoaded }) => {
  return (
    <div className='not-found'>
      <StopOutlined />{' '}
      {isLoaded
        ? 'По данному адресу никто не живет'
        : 'Не выбран адрес для просмотра'}
    </div>
  );
};

export default NotFound;
