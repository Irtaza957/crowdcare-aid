import React, { ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Typography from '../../base/Typography';
import { Icons, Spacer } from '@crowdcareaid-frontend/native-components';
import { Colors, Fonts, SVGS } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';

type AuthWrapperProps = {
  children: ReactNode;
  headerText: string;
  onPress?: () => void;
  bottomOnPress?: () => void;
  backgroundColor?: string;
  iconShow?: boolean;
  text1?: string;
  text2?: string;
  bottomView?: boolean;
  statusBarColor?: string;
  iconColor?: string;
  textColor?: string;
  logo?: boolean;
  barStyle?: 'default' | 'light-content' | 'dark-content';
};
const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  headerText,
  onPress,
  iconShow,
  backgroundColor,
  text1,
  text2,
  bottomView,
  statusBarColor,
  bottomOnPress,
  iconColor,
  textColor,
  logo,
  barStyle,
}) => {
  const { height: mobileHeight } = useWindowDimensions();
  return (
    <View style={styles.MainContainer}>
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
      <View style={[styles.header, { backgroundColor: backgroundColor }]}>
        <View>
          {iconShow ? (
            <TouchableOpacity
              onPress={onPress}
              style={styles.backArrow}
              activeOpacity={0.7}
            >
              <Icons
                family="Octicons"
                name="arrow-left"
                size={normalizeSize(20)}
                color={iconColor}
              />
            </TouchableOpacity>
          ) : (
            <Spacer height={35} />
          )}
          <Typography
            label={headerText}
            color={textColor}
            fontSize={normalizeSize(25)}
            alignSelf="center"
            fontFamily={Fonts.Bold}
            marginTop={normalizeSize(40)}
            marginBottom={
              Platform.OS === 'ios' ? normalizeSize(35) : normalizeSize(50)
            }
          />
        </View>

        {logo && (
          <View style={styles.LogoView}>
            <SVGS.CrowdCareaidLogo style={styles.LogoImg} />
          </View>
        )}
      </View>
      <View style={{ paddingHorizontal: normalizeSize(20), flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
          {bottomView && (
            <View style={styles.signUp}>
              <Typography
                fontSize={14}
                label={text1 || ''}
                fontFamily={Fonts.Medium}
                color={Colors.lightGray}
              />
              <Typography
                fontSize={14}
                label={text2 || ''}
                color={Colors.SecondaryColor}
                fontFamily={Fonts.Medium}
                onPress={bottomOnPress}
              />
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
export default AuthWrapper;

export const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backArrow: {
    backgroundColor: Colors?.white,
    width: normalizeSize(30),
    marginTop: Platform.OS === 'ios' ? normalizeSize(60) : normalizeSize(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalizeSize(15),
    height: normalizeSize(30),
    borderRadius: 5,
  },
  header: {
    borderBottomRightRadius: normalizeSize(22),
    borderBottomLeftRadius: normalizeSize(22),
  },
  signUp: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? normalizeSize(55) : normalizeSize(5),
    paddingBottom: normalizeSize(20),
  },
  LogoView: {
    backgroundColor: Colors?.white,
    bottom: Platform.OS === 'ios' ? normalizeSize(2) : normalizeSize(3),
    marginLeft: Platform.OS === 'ios' ? normalizeSize(3) : normalizeSize(4),
    borderColor: Colors?.white,
    borderTopEndRadius: normalizeSize(20),
    borderBottomStartRadius: normalizeSize(20),
    width: '43%',
    height: normalizeSize(35),
    justifyContent: 'center',
  },
  LogoImg: {
    alignSelf: 'center',
  },
});
