import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import Icons from '../organisms/Icons';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import Typography from './Typography';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';

interface CustomHeaderProps {
  iconColor?: string;
  label: string;
  onPress: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  iconColor,
  label,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Icons
          family="Octicons"
          name="arrow-left"
          size={normalizeSize(25)}
          color={iconColor}
        />
      </TouchableOpacity>

      <Typography
        label={label}
        fontSize={normalizeSize(24)}
        fontFamily={Fonts.Bold}
        color={Colors.green}
        marginTop={normalizeSize(30)}
        top={normalizeSize(20)}
      />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  backArrow: {
    marginTop: Platform.OS === 'ios' ? normalizeSize(10) : normalizeSize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalizeSize(15),
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    alignItems: 'center',
  },
});
