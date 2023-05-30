import { calculateDiscounts } from "./calculateDiscounts"

describe('calculateDiscounts', ()=>{
  it('shoud calculate discounts for macbook pro', ()=>{
    const discounts = calculateDiscounts({orders: [{name: 'MacBook Pro', qty: 4}]})
    expect(discounts).toEqual({discountedAmount: 0, freeRaspberry: 4})
  })
  it('shoud calculate discounts for Google Home when purchasing more than 3', ()=>{
    const discounts = calculateDiscounts({orders: [{name: 'Google Home', qty: 4}]})
    expect(discounts).toEqual({discountedAmount: 49.99, freeRaspberry: 0})
  })
  it('shoud calculate discounts for Google Home when purchasing less than 3', ()=>{
    const discounts = calculateDiscounts({orders: [{name: 'Google Home', qty: 2}]})
    expect(discounts).toEqual({discountedAmount: 0, freeRaspberry: 0})
  })
  it('shoud calculate discounts for Alexa Speaker when purchasing more than 3', ()=>{
    const discounts = calculateDiscounts({orders: [{name: 'Alexa Speaker', qty: 4}]})
    expect(discounts).toEqual({discountedAmount: 43.80, freeRaspberry: 0})
  })
  it('shoud calculate discounts for Alexa Speaker when purchasing less than 3', ()=>{
    const discounts = calculateDiscounts({orders: [{name: 'Alexa Speaker', qty: 2}]})
    expect(discounts).toEqual({discountedAmount: 0, freeRaspberry: 0})
  })
  it('shoud calculate discounts for mixed orders', ()=>{
    const discounts = calculateDiscounts({orders: [{name: 'MacBook Pro', qty: 4}, {name: 'Alexa Speaker', qty: 4}, {name: 'Google Home', qty: 4}]})
    expect(discounts).toEqual({discountedAmount: 93.79, freeRaspberry: 4})
  })

})