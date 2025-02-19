import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Typography } from '@crowdcareaid-frontend/native-components';

type IconWithLabel = {
  label: string;
  RightIcon: React.ReactNode;
};

const IconWithLabel: React.FC<IconWithLabel> = ({ label, RightIcon }) => {
  return (
    <View style={styles.parent}>
      {RightIcon}
      <Typography label={label} marginLeft={15} fontSize={16} />
    </View>
  );
};

export default IconWithLabel;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
