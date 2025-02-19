import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { CustomButton } from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import CalendarPicker from 'react-native-calendar-picker';

interface CustomDatePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;
  onDateChange: (date: Date, type: 'END_DATE' | 'START_DATE') => void;
  selectedStartDate: Date;
  selectedEndDate: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  isVisible,
  onClose,
  onSave,
  onDateChange,
  selectedStartDate,
  selectedEndDate,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <CalendarPicker
                onDateChange={onDateChange}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                startFromMonday={true}
                allowRangeSelection={true}
                todayBackgroundColor={Colors.PrimaryColor}
                selectedDayColor={Colors.PrimaryColor}
                selectedDayTextColor={Colors.white}
                minDate={new Date()}
              />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <CustomButton
                  title="Close"
                  height={55}
                  width={'45%'}
                  onPress={onClose}
                  backgroundColor={Colors.white}
                  borderColor={Colors.SecondaryColor}
                  color={Colors.SecondaryColor}
                  fontFamily={Fonts.Medium}
                  marginTop={normalizeSize(20)}
                />
                <CustomButton
                  title="Save"
                  height={55}
                  width={'50%'}
                  onPress={onSave}
                  backgroundColor={Colors.SecondaryColor}
                  borderColor={Colors.SecondaryColor}
                  fontFamily={Fonts.Medium}
                  marginTop={normalizeSize(20)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: normalizeSize(20),
    backgroundColor: 'white',
    borderRadius: normalizeSize(10),
    alignItems: 'center',
  },
  dateDisplay: {
    marginVertical: normalizeSize(10),
  },
});

export default CustomDatePicker;
