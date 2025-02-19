import { StyleSheet, View, Image, FlatList } from 'react-native';
import React from 'react';
import { Colors } from '@crowdcareaid-frontend/assets';
import {
  FlashList,
  Typography,
} from '@crowdcareaid-frontend/native-components';
import { normalizeSize } from '@crowdcareaid-frontend/utils';
import { CategoryItem } from '../../../types';

const Category = ({ categories }: { categories: CategoryItem[] }) => {
  return (
    <FlatList
      contentContainerStyle={styles.itemView}
      data={categories}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }: { item: CategoryItem }) => (
        <View style={styles.category}>
          <Image source={{ uri: item.img }} style={styles.Img} />
          <Typography label={item?.title} paddingTop={8} />
        </View>
      )}
    />
  );
};

export default Category;

const styles = StyleSheet.create({
  category: {
    backgroundColor: Colors.white,
    elevation: 4,
    height: normalizeSize(115),
    width: normalizeSize(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: normalizeSize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  Img: {
    height: normalizeSize(50),
    width: normalizeSize(50),
  },
  itemView: {
    paddingTop: normalizeSize(20),
    paddingBottom: normalizeSize(20),
    paddingHorizontal: normalizeSize(5),
  },
});
