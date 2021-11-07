import React, { useState, useEffect, useRef } from 'react';
import { notification, Space } from 'antd';

import { connect } from 'react-redux';

const openNotificationWithIcon = (alert) => {
  notification[alert.alertType]({
    key: alert.id,
    message: alert.alertType,
    description: alert.msg,
  });
};

const Alert = ({ alerts }) => {
  const [alertList, setAlertList] = useState([]);
  const prevAlertList = useRef([]);

  useEffect(() => {
    prevAlertList.current = alertList;
  }, [alertList]);

  useEffect(() => {
    setAlertList(alerts);
  }, [alerts]);

  return (
    alertList !== null &&
    alertList.length > 0 &&
    alertList.length === prevAlertList.current.length + 1 && (
      <Space>
        {alertList.map((alert) => {
          return openNotificationWithIcon(alert);
        })}
      </Space>
    )
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);
