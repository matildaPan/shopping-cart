// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';
import { seedItemData } from './seed-data';
import { mergeSchemas } from '@graphql-tools/schema';
import { calculateDiscounts } from './utils/calculateDiscounts';

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./keystone.db',
      async onConnect(context) {
        let shouldExit = false;
  
        if(process.argv.includes('--reset-db')){
          await seedItemData(context)
          shouldExit = true;
        }
        // The admin operations should be run once and then it's ok to run the dev watch mode
        if (shouldExit) {
          process.exit(0);
        }
  
      }
    },
    lists,
    session,
    extendGraphqlSchema: schema => 
      mergeSchemas({
        schemas: [schema],
        typeDefs: `
          type Discount {
            discountedAmount: Float
            freeRaspberry: Int
          }
          input calculateDiscountsInput {
            name: String
            qty: Int
          }
          type Query {
            calculateDiscounts(orders: [calculateDiscountsInput]): Discount
          }
        `,
        resolvers: {
          Query: {
            calculateDiscounts: (root, {orders}, context) => {
              return calculateDiscounts({orders})
            }
          }
        }
      })

  })
);
