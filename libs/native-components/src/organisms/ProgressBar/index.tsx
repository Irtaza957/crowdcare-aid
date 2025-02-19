import { Animated, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import Typography from '../../base/Typography';

interface ProgressBarProps {
  totalAmount: number;
  raisedAmount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalAmount,
  raisedAmount,
}) => {
  const [animatedWidth] = useState(new Animated.Value(0));

  const percentage = totalAmount > 0 ? (raisedAmount / totalAmount) * 100 : 0;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, percentage]);

  return (
    <View>
      <Typography
        label={`${percentage.toFixed(0)}%`}
        textAlign="right"
        width={'80%'}
      />
      <View
        style={[
          styles.BorderView,
          {
            borderColor: Colors.lightGray,
            marginBottom: normalizeSize(10),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.animatedView,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: Colors.PrimaryColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  BorderView: {
    width: '80%',
    borderWidth: 1,
    height: normalizeSize(5),
    borderRadius: normalizeSize(10),
    position: 'relative',
    backgroundColor: Colors.lightGray,
  },
  animatedView: {
    height: normalizeSize(5),
    borderRadius: 10,
    bottom: 1,
  },
});
