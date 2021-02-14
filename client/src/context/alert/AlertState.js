import React, { useState } from 'react';
import AlertContext from './alertContext';

const AlertState = props => {
  const [alert, setAlertState] = useState(null); // Since we have only 1 state, we can simply use the state by itself as the alert state.

  // Set Alert
  const setAlert = (message, type) => {
    setAlertState({ message, type });

    setTimeout(() => setAlertState(null), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
