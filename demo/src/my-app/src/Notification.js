import { notification} from 'antd';

const openNotificationWithIcon = (type,message,description) => {
  notification[type]({
    message, 
    description,
  });
};

export const sucessNotificationWith=(message,description)=> openNotificationWithIcon('sucess',message,description);
export const errorNotificationWith=(message,description)=> openNotificationWithIcon('error',message,description);
export const warningNotificationWith=(message,description)=> openNotificationWithIcon('warning',message,description);
export const infoNotificationWith=(message,description)=> openNotificationWithIcon('info',message,description);