import { MenuViewer } from "@/components/design-menu/menuViewer";
import { getMenuViewData, MenuViewData } from "@/lib/data/menu-view";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<
  MenuViewData,
  { id: string }
> = async (context) => {
  if (!context.params) {
    throw new Error("Invalid request");
  }
  const data = await getMenuViewData(context.params.id);
  return {
    props: data,
  };
};

export default function MenuView({
  menu,
  categories,
  productMap,
  brand,
}: MenuViewData) {
  return (
    <>
      <Head>
        <title>Deinlog</title>
        <meta
          name="description"
          content="Create the online menu for your business"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuViewer
        categories={categories}
        productMap={productMap}
        menu={menu}
        brand={brand}
      />
    </>
  );
}
