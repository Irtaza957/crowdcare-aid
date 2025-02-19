import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Typography from './Typography';
import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
interface DatePickerProps {
  title: string;
  marginTop?: number;
  fontSize: number;
  onPress: () => void;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  isVisible: boolean;
  color: string;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  maximumDate?: Date;
  minimumDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  marginTop,
  fontSize,
  onPress,
  onConfirm,
  onCancel,
  isVisible,
  color,
  alignSelf,
  minimumDate,
  maximumDate,
}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Typography
            label={title}
            marginTop={marginTop}
            fontSize={fontSize}
            color={color}
            alignSelf={alignSelf}
            marginLeft={normalizeSize(20)}
          />
        </TouchableOpacity>
      </View>
      <DateTimePicker
        isVisible={isVisible}
        onConfirm={onConfirm}
        onCancel={onCancel}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: normalizeSize(10),
    elevation: 4,
    height: normalizeSize(53),
  },
});
