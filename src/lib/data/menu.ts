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
  descriptionColor: string;
  backgroundColor: string;
  brandMargin: number;
  titleMargin: number;
  brandFont: string;
  contentFont: string;
  categoryVariant: Variant;
  template: string | null;
  constructor(
    descriptionColor: string,
    backgroundColor: string,
    brandMargin: number,
    titleMargin: number,
    brandFont: string,
    contentFont: string,
    categoryVariant: Variant,
    template: string | null
  ) {
    this.descriptionColor = descriptionColor;
    this.backgroundColor = backgroundColor;
    this.brandMargin = brandMargin;
    this.titleMargin = titleMargin;
    this.brandFont = brandFont;
    this.contentFont = contentFont;
    this.categoryVariant = categoryVariant;
    this.template = template;
  }
}

const menuConverter: FirestoreDataConverter<Menu> = {
  toFirestore: (menu) => {
    return {
      descriptionColor: menu.descriptionColor,
      backgroundColor: menu.backgroundColor,
      brandMargin: menu.brandMargin,
      titleMargin: menu.titleMargin,
      brandFont: menu.brandFont,
      contentFont: menu.contentFont,
      categoryVariant: menu.categoryVariant,
    };
  },
  fromFirestore: (snapshot, options) => {
    const menu = snapshot.data(options);
    return new Menu(
      menu.descriptionColor,
      menu.backgroundColor,
      menu.brandMargin,
      menu.titleMargin,
      menu.brandFont,
      menu.contentFont,
      menu.categoryVariant,
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
  descriptionColor: string;
  backgroundColor: string;
  brandMargin: number;
  titleMargin: number;
  brandFont: string;
  contentFont: string;
  categoryVariant: Variant;
  userId: string;
}

export async function createMenu(data: MenuDTO) {
  const document: Menu = {
    descriptionColor: data.descriptionColor,
    backgroundColor: data.backgroundColor,
    brandMargin: data.brandMargin,
    titleMargin: data.titleMargin,
    brandFont: data.brandFont,
    contentFont: data.contentFont,
    categoryVariant: data.categoryVariant,
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
    descriptionColor: data.menu.descriptionColor,
    backgroundColor: data.menu.backgroundColor,
    brandMargin: data.menu.brandMargin,
    titleMargin: data.menu.titleMargin,
    brandFont: data.menu.brandFont,
    contentFont: data.menu.contentFont,
    categoryVariant: data.menu.categoryVariant,
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
