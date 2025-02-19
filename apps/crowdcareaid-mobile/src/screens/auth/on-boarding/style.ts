import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryColor,
  },
  container: {
    flex: 0.8,
    backgroundColor: Colors.white,
    borderBottomRightRadius: normalizeSize(50),
    borderBottomLeftRadius: normalizeSize(50),
  },
  itemContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalizeSize(20),
  },
  image: {
    height: Platform.OS === 'ios' ? height * 0.4 : height * 0.5,
    width: width * 0.9,
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalizeSize(20),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: normalizeSize(25),
    width: '100%',
    bottom: normalizeSize(33),
  },
  dot: {
    height: normalizeSize(13),
    width: normalizeSize(13),
    borderRadius: 10,
    backgroundColor: Colors.PrimaryColor,
    marginHorizontal: normalizeSize(4),
  },
});
