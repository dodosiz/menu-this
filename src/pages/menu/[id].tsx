import { MenuViewer } from "@/components/design-menu/menuViewer";
import { getMenuIds } from "@/lib/data/menu";
import { getMenuViewData, MenuViewData } from "@/lib/data/menu-view";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export const getStaticProps: GetStaticProps<
  MenuViewData,
  { id: string }
> = async (context) => {
  if (!context.params) {
    throw new Error("Invalid request");
  }
  const data = await getMenuViewData(context.params.id);
  return {
    props: data,
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getMenuIds();
  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: "blocking",
  };
};

export default function MenuView({
  menu,
  categories,
  products,
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
        products={products}
        menu={menu}
        brand={brand}
      />
    </>
  );
}
