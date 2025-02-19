import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import {
  CustomButton,
  Icons,
  showToast,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { useCreateReportMutation } from '@crowdcareaid-frontend/store';

interface ReportRenderModalProps {
  setModalVisible?: (bolean) => void;
  campaignId: string;
}

const ReportRenderModal: React.FC<ReportRenderModalProps> = ({
  setModalVisible,
  campaignId,
}) => {
  const [createReport, { isLoading }] = useCreateReportMutation();
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const handleReport = async () => {
    try {
      const payload = {
        campaignId: campaignId,
        reason: selectedText,
      };
      closeModal();
      const res = await createReport(payload);
      console.log('CreatReport=========', res);
      showToast('success', res?.data?.message);
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleItemPress = (title: string) => {
    if (selectedText === title) {
      setSelectedText(null);
    } else {
      setSelectedText(title);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const data = [
    {
      id: 1,
      title: 'Identity fraud',
    },
    {
      id: 2,
      title: 'Undesirable or harmful',
    },
    {
      id: 3,
      title: 'Publication of inappropriate contents',
    },
    {
      id: 4,
      title: 'Harassment or bullying',
    },
    {
      id: 5,
      title: 'Other',
    },
  ];

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => handleItemPress(item.title)}
          style={styles.itemContainer}
          activeOpacity={0.7}
        >
          <Typography
            label={item.title}
            fontSize={14}
            fontFamily={Fonts.Regular}
          />
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  item.title === selectedText
                    ? Colors.PrimaryColor
                    : Colors.white,
              },
            ]}
          />
        </TouchableOpacity>
      );
    },
    [selectedText]
  );
  return (
    <View style={styles.modalContainer}>
      <View style={styles.handleBar} />
      <View style={styles.report}>
        <Typography
          label="Report the user"
          fontFamily={Fonts.Medium}
          fontSize={20}
          color={Colors.PrimaryColor}
        />
        <TouchableOpacity onPress={closeModal} activeOpacity={0.5}>
          <Icons
            family="Entypo"
            name="circle-with-cross"
            size={normalizeSize(30)}
          />
        </TouchableOpacity>
      </View>
      <Typography
        label="Please help us and select a reason to understand what is going on."
        fontFamily={Fonts.Regular}
        fontSize={12}
        color={Colors.lightGray}
        marginTop={normalizeSize(10)}
        marginBottom={normalizeSize(10)}
        paddingHorizontal={normalizeSize(20)}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <CustomButton
        title="Submit"
        width={'90%'}
        marginVertical={15}
        disabled={!selectedText}
        onPress={handleReport}
        loading={isLoading}
      />
    </View>
  );
};

export default ReportRenderModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignSelf: 'center',
  },
  report: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeSize(20),
  },
  handleBar: {
    height: 3,
    width: 70,
    alignSelf: 'center',
    backgroundColor: Colors.lightGray,
    marginVertical: normalizeSize(20),
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeSize(20),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    backgroundColor: Colors.white,
    marginVertical: 10,
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: normalizeSize(20),
    marginHorizontal: 20,
  },
  circle: {
    height: 20,
    width: 20,
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
    borderRadius: 30,
  },
});
