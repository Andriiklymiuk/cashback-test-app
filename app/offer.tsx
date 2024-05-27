import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, YStack } from 'tamagui';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Offer } from '@/types/offer';

export default function OfferDetailScreen() {
  const params = useLocalSearchParams();
  const {
    id,
    title,
    description,
    cashbackAmount,
    expirationDate,
    retailerLogo,
    termsAndConditions
  } = params as any as Offer;

  const onClaimOfferPressed = () => {
    console.log('TODO: Claim Offer Pressed')
  }

  return (
    <YStack flex={1} padding={20} alignItems="center" gap="$4">
      <Image src={retailerLogo} width={150} height={150} borderRadius={75} />
      <Text fontWeight="bold" fontSize="$6" color="$primary" textAlign="center">{title}</Text>
      <Text fontSize="$3">{description}</Text>
      <Text fontSize="$3" color="$gray8" textAlign="center">{termsAndConditions}</Text>
      <Text fontSize="$3" color="$gray10">Expires on: {expirationDate}</Text>
      <Button
        onPress={onClaimOfferPressed}
        theme="orange"
        size="$4"
      >
        Claim Offer
      </Button>
      <StatusBar style="auto" />
    </YStack>
  );
}
