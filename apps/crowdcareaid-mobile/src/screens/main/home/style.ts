import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.PrimaryColor,
    paddingHorizontal: normalizeSize(20),
    borderBottomLeftRadius: normalizeSize(20),
    borderBottomRightRadius: normalizeSize(20),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.PrimaryColor,
    alignItems: 'center',
    paddingVertical: normalizeSize(15),
  },
  dataWrapper: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  backgroundImage: {
    marginHorizontal: normalizeSize(20),
    marginVertical: normalizeSize(20),
    overflow: 'hidden',
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: Colors.PrimaryColor,
    opacity: 0.9,
  },
  content: {
    paddingHorizontal: normalizeSize(20),
    paddingVertical: normalizeSize(20),
  },
  image: {
    marginLeft: normalizeSize(20),
    marginVertical: normalizeSize(20),
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    borderRadius: normalizeSize(11),
    overflow: 'hidden',
    // width: '50%',
  },
  TopCampaign: {
    flexDirection: 'row',
    paddingHorizontal: normalizeSize(15),
    justifyContent: 'space-between',
    marginVertical: normalizeSize(10),
    alignItems: 'center',
  },
  profileImage: { height: 40, width: 40, borderRadius: 30 },
  Title: { flexDirection: 'row', gap: 10 },
});
