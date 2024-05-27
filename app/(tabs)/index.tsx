import { StyleSheet } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import { useEffect } from 'react';
import { Text, Image, XStack, YStack } from 'tamagui';
import { useOffersStore } from '@/store/offersStore';
import { Offer } from '@/types/offer';
import { Link, router } from 'expo-router';

const OfferComponent: React.FC<Offer> = (offerProps) => {
  const {
    title,
    description,
    cashbackAmount,
    expirationDate,
    retailerLogo
  } = offerProps;

  const onOfferPressed = () => {
    router.push({
      pathname: '/offer',
      params: {
        ...offerProps
      }
    });
  }

  return (
    <YStack
      backgroundColor="$backgroundContrast"
      margin="$3"
      padding="$4"
      borderRadius="$4"
      onPress={onOfferPressed}
    >
      <XStack flexDirection="row" alignItems="center" gap="$4">
        <YStack flex={1} gap="$3">
          <Text fontWeight="bold" fontSize="$6" color="$primary">Title: {title}</Text>
          <Text fontSize="$4">{description}</Text>
          <Text color="$orange8" fontSize="$4" fontWeight="bold">Cashback: {cashbackAmount}%</Text>
          {/* <Text color="$gray4" fontSize="$2">{termsAndConditions}</Text> */}
          <Text color="$gray3" fontSize="$4">Expires: {expirationDate}</Text>
        </YStack>
        <Image src={retailerLogo} width={80} height={80} borderRadius={40} />
      </XStack>
    </YStack>
  );
}

export default function TabOneScreen() {
  const { offers, getOffers } = useOffersStore();

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <YStack flex={1}>
      <FlashList
        data={offers}
        renderItem={({ item }) => <OfferComponent {...item} />}
        keyExtractor={item => item.id.toString()}
        estimatedItemSize={160}
        ItemSeparatorComponent={() => <YStack height={0.5} width={1000} backgroundColor="$gray10Light" />}
      />
    </YStack>
  );
};