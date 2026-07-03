import donationsData from '../../../../frontuser/src/data/donations.json'
import { paymentLogos } from '../../../../frontuser/src/assets/payment-logos'
import type { DonationPaymentMethodRecord, DonationSettingsRecord } from '../../types'

export const donationCurrencyChoices = [
  { id: 'USD', name: 'USD — Dollar' },
  { id: 'CDF', name: 'CDF — Franc congolais' },
]

export const donationTypeChoices = [
  { id: 'mobile', name: 'Mobile Money' },
  { id: 'bank', name: 'Banque / carte' },
]

export function buildDonationSettingsSeed(): DonationSettingsRecord[] {
  return [
    {
      id: 'current',
      spiritualIntro: 'Votre générosité participe à la mission de l\'Église',
      spiritualTitle: donationsData.spiritualText.title,
      spiritualMessage: donationsData.spiritualText.message,
      thankYou:
        'Merci pour votre offrande. Que le Seigneur vous bénisse abondamment pour votre générosité au service de sa Paroisse.',
      receiptNote:
        'Un reçu vous sera délivré sur demande auprès du secrétariat paroissial après confirmation de votre don.',
      verses: donationsData.spiritualText.verses,
      accountDisplayName: donationsData.accountDisplayName,
    },
  ]
}

export function buildDonationPaymentMethodsSeed(): DonationPaymentMethodRecord[] {
  const mobile = donationsData.mobileMoney.map((m, i) => ({
    id: m.id,
    name: m.name,
    accountName: m.accountName,
    number: m.number,
    currency: m.currency as 'USD' | 'CDF',
    type: 'mobile' as const,
    order: (i + 1) * 10,
    imageUrl: paymentLogos[m.id] ?? '',
    imageSource: 'url' as const,
  }))
  const bank = donationsData.bank.map((m, i) => ({
    id: m.id,
    name: m.name,
    accountName: m.accountName,
    number: m.number,
    currency: m.currency as 'USD' | 'CDF',
    type: 'bank' as const,
    order: (mobile.length + i + 1) * 10,
    imageUrl: paymentLogos[m.id] ?? '',
    imageSource: 'url' as const,
  }))
  return [...mobile, ...bank]
}
