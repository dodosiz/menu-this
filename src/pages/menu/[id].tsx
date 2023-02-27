import { DesignMenuViewer } from "@/components/designMenuViewer";
import { getMenuIds } from "@/lib/menu";
import { getMenuViewData, MenuViewData } from "@/lib/menu-view";
import { Container } from "@chakra-ui/react";
import Head from "next/head";

export async function getStaticPaths() {
  const ids = await getMenuIds();
  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const data = await getMenuViewData(params.id);
  return {
    props: data,
  };
}

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
