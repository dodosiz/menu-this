import { CATEGORY_LIMIT } from "@/constants";
import {
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../core/firebase";

const CATEGORY_COLLECTION = "categories";
const USER_DATA_COLLECTION = "userData";

export class Category {
  id: string;
  title: string;
  createdAt: number;
  background: string | null;
  constructor(
    id: string,
    title: string,
    createdAt: number,
    background: string | null
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.background = background;
  }
}

const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore: (cat) => {
    return {
      id: cat.id,
      title: cat.title,
      createdAt: cat.createdAt,
      background: cat.background,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Category(data.id, data.title, data.createdAt, data.background);
  },
};

export function getCategoryDocumentReference(
  userId: string,
  categoryId: string
) {
  return doc(
    db,
    USER_DATA_COLLECTION,
    userId,
    CATEGORY_COLLECTION,
    categoryId
  ).withConverter(categoryConverter);
}

export function getCategoryCollectionReference(userId: string) {
  return collection(
    db,
    USER_DATA_COLLECTION,
    userId,
    CATEGORY_COLLECTION
  ).withConverter(categoryConverter);
}

export async function getCategories(userId: string) {
  const q = query(getCategoryCollectionReference(userId), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  const categories: Category[] = [];
  querySnapshot.forEach((doc) => categories.push(doc.data()));
  return categories;
}

export interface CreateCategoryResult {
  id: string;
  createdAt: number;
}

export interface CreateCategoryData {
  userId: string;
  title: string;
}

export async function createCategory(
  data: CreateCategoryData
): Promise<CreateCategoryResult> {
  const col = getCategoryCollectionReference(data.userId);
  const snapshot = await getCountFromServer(col);
  const categoryCount = snapshot.data().count;
  if (categoryCount >= CATEGORY_LIMIT) {
    throw new Error("Max limit reached");
  }
  const newCategoryId = v4();
  const currentTimestamp = Date.now();
  await setDoc(getCategoryDocumentReference(data.userId, newCategoryId), {
    id: newCategoryId,
    title: data.title,
    createdAt: currentTimestamp,
    background: null,
  });
  return { id: newCategoryId, createdAt: currentTimestamp };
}

export interface UpdateCategoryData {
  categoryId: string;
  title: string;
  userId: string;
}

export async function updateCategory(data: UpdateCategoryData) {
  await updateDoc(getCategoryDocumentReference(data.userId, data.categoryId), {
    title: data.title,
  });
}

export interface DeleteData {
  userId: string;
  categoryId: string;
}

export async function deleteCategory(data: DeleteData) {
  await deleteDoc(getCategoryDocumentReference(data.userId, data.categoryId));
}

export interface SwapData {
  id1: string;
  id2: string;
  userId: string;
}

export async function swap(data: SwapData) {
  const categorySnap1 = await getDoc(
    getCategoryDocumentReference(data.userId, data.id1)
  );
  const categorySnap2 = await getDoc(
    getCategoryDocumentReference(data.userId, data.id2)
  );

  const category1 = categorySnap1.data();
  const category2 = categorySnap2.data();

  if (category1 && category2) {
    await updateDoc(getCategoryDocumentReference(data.userId, data.id1), {
      createdAt: category2.createdAt,
    });
    await updateDoc(getCategoryDocumentReference(data.userId, data.id2), {
      createdAt: category1.createdAt,
    });
  }
}
