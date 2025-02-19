import { Platform } from 'react-native';
import React from 'react';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastProps,
} from 'react-native-toast-message';
import { Colors } from '@crowdcareaid-frontend/assets';

interface ToastConfigProps extends ToastProps {
  text1Style?: object;
  text2Style?: object;
}

export const toastConfig = {
  success: ({ text1Style, text2Style, ...props }: ToastConfigProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.ToastColor,
        borderLeftColor: Colors.PrimaryColor,
        marginTop: Platform.OS === 'ios' ? 10 : -30,
        width: '90%',
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.white,
        ...text1Style,
      }}
      text2Style={{
        fontSize: 12,
        color: Colors.white,
        ...text2Style,
      }}
    />
  ),
  error: ({ text1Style, text2Style, ...props }: ToastConfigProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: 'red',
        borderLeftColor: 'red',
        marginTop: Platform.OS === 'ios' ? 10 : -30,
        width: '90%',
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.white,
        ...text1Style,
      }}
      text2Style={{
        fontSize: 12,
        color: Colors.white,
        ...text2Style,
      }}
    />
  ),
  info: ({ text1Style, text2Style, ...props }: ToastConfigProps) => (
    <InfoToast
      {...props}
      style={{
        backgroundColor: Colors.lightGray,
        borderLeftColor: Colors.lightGray,
        marginTop: Platform.OS === 'ios' ? 10 : -30,
        width: '90%',
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.white,
        ...text1Style,
      }}
      text2Style={{
        fontSize: 12,
        color: Colors.white,
        ...text2Style,
      }}
    />
  ),
};

export const showToast = (
  type: 'success' | 'error' | 'info',
  heading: string,
  description?: string
) => {
  Toast.show({
    type: type,
    text1: heading,
    text2: description,
  });
};

const ToastComponent: React.FC = () => {
  return null;
};

export default ToastComponent;
