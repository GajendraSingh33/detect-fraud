export function randChoice<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function randomTransactionFor(userId = `u${Math.floor(Math.random() * 5)}`) {
  const merchants = ['Amazon', 'Uber', 'Airline', 'LocalCafe', 'GiftCardHub', 'CryptoX']
  const cats = ['grocery', 'transport', 'travel', 'restaurant', 'giftcard', 'crypto', 'gambling']
  return {
    userId,
    amount: Number((Math.random() * 3000).toFixed(2)),
    currency: 'INR',
    merchant: randChoice(merchants),
    category: randChoice(cats),
    lat: 12 + Math.random() * 10,
    lon: 72 + Math.random() * 10,
    deviceId: Math.random() < 0.8 ? 'dev1' : 'dev-' + Math.floor(Math.random() * 9999),
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`
  }
}
