import { useContext } from 'react';
import { ToastNotificationContext } from '../context/ToastNotificationContext';

const useToastNotification = () => {
  const context = useContext(ToastNotificationContext);
  if (!context) {
    throw new Error(
      'useToastNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

export default useToastNotification;
