import { Colors } from '@crowdcareaid-frontend/assets';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  MainContainer: { alignItems: 'center', marginTop: normalizeSize(40) },
  content: {
    position: 'relative',
    flex: 1,
    bottom: normalizeSize(35),
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
    flexDirection: 'row',
    marginVertical: normalizeSize(12),
  },
  ShowDetail: {
    justifyContent: 'space-between',
  },

  Main: { paddingHorizontal: normalizeSize(12), alignSelf: 'center' },
  location: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '75%',
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
});
