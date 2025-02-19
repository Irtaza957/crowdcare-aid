import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  DimensionValue,
  ViewStyle,
} from 'react-native';
interface CustomDatePickerProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  height: ViewStyle['height'] | '70%' | DimensionValue;
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
}
const CustomBottomSheet: React.FC<CustomDatePickerProps> = ({
  isVisible,
  onClose,
  children,
  height,
  justifyContent,
  alignItems,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.modalContainer,
            { justifyContent: justifyContent, alignItems: alignItems },
          ]}
        >
          <TouchableWithoutFeedback>
            <View style={[{ height: height || '70%' }]}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default CustomBottomSheet;
