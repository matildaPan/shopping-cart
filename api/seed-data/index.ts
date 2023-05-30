import { ITEM_DATA } from './item-data';

export type Context = import('@keystone-6/core/types').KeystoneContext;

export async function seedItemData({db}:Context): Promise<void> {
  const itemCount = await db.Item.count();
  if(!itemCount){
    console.log(`🌱 Seeding Dev Data: ${ITEM_DATA.length} Items`)
    await db.Item.createMany({data: ITEM_DATA})
    console.log(`✅ Dev Data Ready`)
  }else{
    console.log(`❌ Dev Data already exists`)
  }
}