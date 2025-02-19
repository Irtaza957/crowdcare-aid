import { TouchableOpacity, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { Typography } from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';

interface ReadMoreProps {
  description: string;
  isShow: boolean;
}

const ReadMore: React.FC<ReadMoreProps> = ({ description, isShow }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePressExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <SafeAreaView>
      <Typography
        label={description}
        fontSize={14}
        alignSelf="center"
        width={'90%'}
        numberOfLines={expanded ? null : 3}
        color={Colors.lightGray}
        marginTop={10}
      />
      {isShow && (
        <TouchableOpacity
          onPress={handlePressExpand}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: Colors.PrimaryColor,
              marginRight: normalizeSize(8),
            }}
          />
          <Typography
            label={expanded ? 'Read Less' : 'Read More'}
            color={Colors.PrimaryColor}
            fontFamily={Fonts.Medium}
            marginLeft={normalizeSize(12)}
            marginBottom={normalizeSize(25)}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ReadMore;
