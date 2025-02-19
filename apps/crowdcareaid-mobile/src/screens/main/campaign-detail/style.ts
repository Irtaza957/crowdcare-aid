import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  MainContainer: { flex: 1, backgroundColor: Colors.white },
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  imageList: {
    height: 300,
  },
  image: {
    height: normalizeSize(270),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconMain: {
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: normalizeSize(30),
    justifyContent: 'space-between',
  },
  back: {
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.white,
    zIndex: 1,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: normalizeSize(15),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
  },
  dot: {
    width: normalizeSize(12),
    height: normalizeSize(12),
    borderRadius: normalizeSize(20),
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginTop: normalizeSize(30),
  },
  MainStyle: {
    paddingHorizontal: normalizeSize(20),
  },
  ShowDetail: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: normalizeSize(20),
    bottom: normalizeSize(20),
  },
  ShowBar: {
    height: 5,
    borderRadius: 5,
    width: '100%',
  },
  showBarContainer: {
    width: '100%',
    marginTop: normalizeSize(10),
    marginBottom: normalizeSize(20),
  },
  BorderView: {
    // width: -30,
    borderWidth: 1,
    height: normalizeSize(7),
    borderRadius: normalizeSize(10),
    position: 'relative',
    backgroundColor: Colors.lightGray,
    marginTop: normalizeSize(5),
  },
  animatedView: {
    height: normalizeSize(7),
    borderRadius: 20,
    bottom: normalizeSize(3),
  },
});
