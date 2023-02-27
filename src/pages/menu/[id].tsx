import { DesignMenuViewer } from "@/components/designMenuViewer";
import { getMenuViewData, MenuViewData } from "@/lib/menu-view";
import { Container } from "@chakra-ui/react";
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
}: MenuViewData) {
  return (
    <>
      <Head>
        <title>Menu This</title>
        <meta
          name="description"
          content="Create the online menu for your business"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <DesignMenuViewer
          categories={categories}
          productMap={productMap}
          menu={menu}
        />
      </Container>
    </>
  );
}
