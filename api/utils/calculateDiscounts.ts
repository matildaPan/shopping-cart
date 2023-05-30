interface Discount {
  discountedAmount: number
  freeRaspberry: number
}

interface Order{
  name: string
  qty: number
}

const googleHomePrice = 49.99;
const alexaSpeakerPrice = 109.50;

export const calculateDiscounts = ({orders}: {orders: Order[]}):Discount=>{

  let counts = {googleHome: 0, macBookPro: 0, alexaSpeaker: 0}
  orders.map(order => {
    if(order.name === 'MacBook Pro') {
      counts['macBookPro'] += order.qty
    }
    if(order.name === 'Google Home'){
      counts['googleHome'] += order.qty
    }
    if(order.name === 'Alexa Speaker'){
      counts['alexaSpeaker'] += order.qty
    }
  })

  let discounts = {discountedAmount: 0, freeRaspberry: 0}

  if(counts.macBookPro){
    discounts.freeRaspberry = counts.macBookPro
  }
  if(counts.googleHome >= 3){
    const googleHomeDisount = Math.floor(counts.googleHome/3) * googleHomePrice
    discounts.discountedAmount += googleHomeDisount
  }

  if(counts.alexaSpeaker > 3){
    const alexaSpeakerDiscount = counts.alexaSpeaker * alexaSpeakerPrice * 0.1
    discounts.discountedAmount += alexaSpeakerDiscount
  }
  return {...discounts, discountedAmount: Math.round(discounts.discountedAmount*100)/100} 
}