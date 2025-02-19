import { View } from 'react-native';
import React from 'react';

interface SpacerProps {
  height: number;
}

const Spacer: React.FC<SpacerProps> = ({ height }) => {
  return (
    <View style={{ height }}/>
  );
};

export default Spacer;
