import {
  FlashList as FlashListComponent,
  FlashListProps as FlashListComponentTypes,
} from '@shopify/flash-list';
import { ViewStyle } from 'react-native';

interface FlashListProps<T> extends FlashListComponentTypes<T> {
  horizontal?: boolean;
  style?: ViewStyle;
  estimatedItemSize?: number;
}

const FlashList = <T,>({
  data,
  renderItem,
  horizontal,
  estimatedItemSize,
  style,
  ...restProps
}: FlashListProps<T>) => {
  return (
    <FlashListComponent
      data={data}
      estimatedItemSize={estimatedItemSize}
      renderItem={renderItem}
      horizontal={horizontal}
      contentContainerStyle={style}
      {...restProps}
    />
  );
};
export default FlashList;
