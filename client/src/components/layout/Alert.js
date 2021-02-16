import React from 'react';
import { useAlert } from '../../context/alert/AlertState';

const Alert = () => {
  const alerts = useAlert()[0];

  return alerts.length > 0
    ? alerts.map(alert => (
        <div className={`alert alert-${alert.type}`}>
          {' '}
          <i className='fa fa-info-circle'></i> {alert.msg}
        </div>
      ))
    : null;
};

export default Alert;
