import {
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Category, getCategoryDocumentReference } from "./categories";
import { templateToMenu } from "./template-data";

const MENU_COLLECTION = "menu";

export type Variant = "none" | "inverse" | "bordered" | "underlined";

export class Menu {
  brandColor: string;
  titleColor: string;
  nameColor: string;
  descriptionColor: string;
  backgroundColor: string;
  brandMargin: number;
  titleMargin: number;
  nameMargin: number;
  nameTitleMargin: number;
  brandSize: string;
  titleSize: string;
  nameSize: string;
  descriptionSize: string;
  brandFont: string;
  titleFont: string;
  contentFont: string;
  categoryVariant: Variant;
  productVariant: Variant;
  template: string | null;
  constructor(
    brandColor: string,
    titleColor: string,
    nameColor: string,
    descriptionColor: string,
    backgroundColor: string,
    brandMargin: number,
    titleMargin: number,
    nameMargin: number,
    nameTitleMargin: number,
    brandSize: string,
    titleSize: string,
    nameSize: string,
    descriptionSize: string,
    brandFont: string,
    titleFont: string,
    contentFont: string,
    categoryVariant: Variant,
    productVariant: Variant,
    template: string | null
  ) {
    this.brandColor = brandColor;
    this.titleColor = titleColor;
    this.nameColor = nameColor;
    this.descriptionColor = descriptionColor;
    this.backgroundColor = backgroundColor;
    this.brandMargin = brandMargin;
    this.titleMargin = titleMargin;
    this.nameMargin = nameMargin;
    this.nameTitleMargin = nameTitleMargin;
    this.brandSize = brandSize;
    this.titleSize = titleSize;
    this.nameSize = nameSize;
    this.descriptionSize = descriptionSize;
    this.brandFont = brandFont;
    this.titleFont = titleFont;
    this.contentFont = contentFont;
    this.categoryVariant = categoryVariant;
    this.productVariant = productVariant;
    this.template = template;
  }
}

const menuConverter: FirestoreDataConverter<Menu> = {
  toFirestore: (menu) => {
    return {
      brandColor: menu.brandColor,
      titleColor: menu.titleColor,
      nameColor: menu.nameColor,
      descriptionColor: menu.descriptionColor,
      backgroundColor: menu.backgroundColor,
      brandMargin: menu.brandMargin,
      titleMargin: menu.titleMargin,
      nameMargin: menu.nameMargin,
      nameTitleMargin: menu.nameTitleMargin,
      brandSize: menu.brandSize,
      titleSize: menu.titleSize,
      nameSize: menu.nameSize,
      descriptionSize: menu.descriptionSize,
      brandFont: menu.brandFont,
      titleFont: menu.titleFont,
      contentFont: menu.contentFont,
      categoryVariant: menu.categoryVariant,
      productVariant: menu.productVariant,
    };
  },
  fromFirestore: (snapshot, options) => {
    const menu = snapshot.data(options);
    return new Menu(
      menu.brandColor,
      menu.titleColor,
      menu.nameColor,
      menu.descriptionColor,
      menu.backgroundColor,
      menu.brandMargin,
      menu.titleMargin,
      menu.nameMargin,
      menu.nameTitleMargin,
      menu.brandSize,
      menu.titleSize,
      menu.nameSize,
      menu.descriptionSize,
      menu.brandFont,
      menu.titleFont,
      menu.contentFont,
      menu.categoryVariant,
      menu.productVariant,
      menu.template
    );
  },
};

export function getMenuDocumentReference(userId: string) {
  return doc(db, MENU_COLLECTION, userId).withConverter(menuConverter);
}

export async function getMenu(userId: string): Promise<Menu | null> {
  const document = await getDoc(getMenuDocumentReference(userId));
  const menu = document.data();
  return menu ? menu : null;
}

export async function getMenuIds(): Promise<string[]> {
  const q = query(collection(db, MENU_COLLECTION));
  const querySnapshot = await getDocs(q);
  const ids: string[] = [];
  querySnapshot.forEach((d) => ids.push(d.id));
  return ids;
}

export async function getMenuOrThrow(userId: string): Promise<Menu> {
  const document = await getDoc(getMenuDocumentReference(userId));
  const menu = document.data();
  if (!menu) {
    throw new Error("Mnu not found");
  }
  return menu;
}

export interface MenuDTO {
  brandColor: string;
  titleColor: string;
  nameColor: string;
  descriptionColor: string;
  backgroundColor: string;
  brandMargin: number;
  titleMargin: number;
  nameMargin: number;
  nameTitleMargin: number;
  brandSize: string;
  titleSize: string;
  nameSize: string;
  descriptionSize: string;
  brandFont: string;
  titleFont: string;
  contentFont: string;
  categoryVariant: Variant;
  productVariant: Variant;
  userId: string;
}

export async function createMenu(data: MenuDTO) {
  const document: Menu = {
    brandColor: data.brandColor,
    titleColor: data.titleColor,
    nameColor: data.nameColor,
    descriptionColor: data.descriptionColor,
    backgroundColor: data.backgroundColor,
    brandMargin: data.brandMargin,
    titleMargin: data.titleMargin,
    nameMargin: data.nameMargin,
    nameTitleMargin: data.nameTitleMargin,
    brandSize: data.brandSize,
    titleSize: data.titleSize,
    nameSize: data.nameSize,
    descriptionSize: data.descriptionSize,
    brandFont: data.brandFont,
    titleFont: data.titleFont,
    contentFont: data.contentFont,
    categoryVariant: data.categoryVariant,
    productVariant: data.productVariant,
    template: null,
  };
  await setDoc(doc(db, MENU_COLLECTION, data.userId), document);
}

export interface UpdateDesignData {
  menu: MenuDTO;
  template: string | null;
  categories: Category[];
}

export async function updateDesign(data: UpdateDesignData) {
  const menu = data.template ? templateToMenu[data.template] : {};
  await updateDoc(getMenuDocumentReference(data.menu.userId), {
    ...menu,
    template: data.template,
    brandColor: data.menu.brandColor,
    titleColor: data.menu.titleColor,
    nameColor: data.menu.nameColor,
    descriptionColor: data.menu.descriptionColor,
    backgroundColor: data.menu.backgroundColor,
    brandMargin: data.menu.brandMargin,
    titleMargin: data.menu.titleMargin,
    nameMargin: data.menu.nameMargin,
    nameTitleMargin: data.menu.nameTitleMargin,
    brandSize: data.menu.brandSize,
    titleSize: data.menu.titleSize,
    nameSize: data.menu.nameSize,
    descriptionSize: data.menu.descriptionSize,
    brandFont: data.menu.brandFont,
    titleFont: data.menu.titleFont,
    contentFont: data.menu.contentFont,
    categoryVariant: data.menu.categoryVariant,
    productVariant: data.menu.productVariant,
  });
  // update background images
  for (const c of data.categories) {
    await updateDoc(getCategoryDocumentReference(data.menu.userId, c.id), {
      background: c.background,
    });
  }
}

export async function deleteMenu(userId: string) {
  await deleteDoc(getMenuDocumentReference(userId));
}
