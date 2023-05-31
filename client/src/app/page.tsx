import Head from "next/head";
import { gql } from "@ts-gql/tag/no-transform";
import { fetchGraphQL } from "./fetch-graphql";

export const getItemListQuery = gql`
  query getItems {
    items(orderBy: { name: desc }) {
      id
      inventoryQty
      name
      price
      sku
    }
  }
` as import("../../__generated__/ts-gql/getItems").type;

export const getItems = async () => {
  const result = await fetchGraphQL(getItemListQuery);

  if (!result?.items) {
    throw new Error("query failed");
  }
  return result.items;
};

export default async function Home() {
  const items = await getItems();
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <>
        {items?.map((item) => (
          <>
            <div className="p-2 -mt-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="py-10 text-center rounded-2xl bg-gray-50 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="max-w-xs px-8 mx-auto">
                  <p className="text-base font-semibold text-gray-600">
                    {item.name}
                  </p>
                  <p className="flex items-baseline justify-center mt-6 gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      ${item.price}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </>
    </>
  );
}
