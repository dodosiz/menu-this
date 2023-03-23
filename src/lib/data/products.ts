import { PRODUCT_LIMIT } from "@/constants";
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
  where,
} from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../config/firebase";
import { USER_DATA_COLLECTION } from "./categories";

const PRODUCT_COLLECTION = "products";

export class Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  createdAt: number;
  constructor(
    id: string,
    categoryId: string,
    name: string,
    price: number,
    description: string,
    createdAt: number
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
    this.price = price;
    this.description = description;
    this.createdAt = createdAt;
  }
}

const productConverter: FirestoreDataConverter<Product> = {
  toFirestore: (product) => {
    return {
      id: product.id,
      categoryId: product.categoryId,
      name: product.name,
      price: product.price,
      description: product.description,
      createdAt: product.createdAt,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Product(
      data.id,
      data.categoryId,
      data.name,
      data.price,
      data.description,
      data.createdAt
    );
  },
};

export function getProductDocumentReference(userId: string, productId: string) {
  return doc(
    db,
    USER_DATA_COLLECTION,
    userId,
    PRODUCT_COLLECTION,
    productId
  ).withConverter(productConverter);
}

export function getProductCollectionReference(userId: string) {
  return collection(
    db,
    USER_DATA_COLLECTION,
    userId,
    PRODUCT_COLLECTION
  ).withConverter(productConverter);
}

export interface CreateProductData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  userId: string;
}

export async function createProduct(data: CreateProductData): Promise<Product> {
  const col = getProductCollectionReference(data.userId);
  const snapshot = await getCountFromServer(col);
  const productCount = snapshot.data().count;
  if (productCount >= PRODUCT_LIMIT) {
    throw new Error("Max limit reached");
  }
  const newProductId = v4();
  const currentTimestamp = Date.now();
  await setDoc(getProductDocumentReference(data.userId, newProductId), {
    id: newProductId,
    name: data.name,
    price: parseFloat(data.price),
    description: data.description,
    createdAt: currentTimestamp,
    categoryId: data.categoryId,
  });
  return {
    id: newProductId,
    categoryId: data.categoryId,
    name: data.name,
    price: parseFloat(data.price),
    description: data.description,
    createdAt: currentTimestamp,
  };
}

export async function countProducts(userId: string, categoryId: string) {
  const q = query(
    getProductCollectionReference(userId),
    where("categoryId", "==", categoryId)
  );
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

export interface UpdateProductData {
  name: string;
  price: string;
  description: string;
  productId: string;
  userId: string;
}

export interface UpdateProductResult {
  productId: string;
  name: string;
  price: number;
  description: string;
}

export async function updateProduct(
  data: UpdateProductData
): Promise<UpdateProductResult> {
  await updateDoc(getProductDocumentReference(data.userId, data.productId), {
    name: data.name,
    price: parseFloat(data.price),
    description: data.description,
  });
  return {
    productId: data.productId,
    name: data.name,
    price: parseFloat(data.price),
    description: data.description,
  };
}

export async function getProducts(userId: string) {
  const q = query(getProductCollectionReference(userId), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => products.push(doc.data()));
  return products;
}

export async function getProductsForCategory(
  userId: string,
  categoryId: string
) {
  const q = query(getProductCollectionReference(userId), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().categoryId === categoryId) {
      products.push(doc.data());
    }
  });
  return products;
}

export interface DeleteData {
  userId: string;
  productId: string;
}

export async function deleteProduct(data: DeleteData) {
  await deleteDoc(getProductDocumentReference(data.userId, data.productId));
}

export interface SwapData {
  id1: string;
  id2: string;
  userId: string;
}

export interface SwapResult {
  id1: string;
  id2: string;
  createdAt1: number;
  createdAt2: number;
}

export async function swap(data: SwapData): Promise<SwapResult | undefined> {
  const productSnap1 = await getDoc(
    getProductDocumentReference(data.userId, data.id1)
  );
  const productSnap2 = await getDoc(
    getProductDocumentReference(data.userId, data.id2)
  );
  const product1 = productSnap1.data();
  const product2 = productSnap2.data();

  if (product1 && product2) {
    await updateDoc(getProductDocumentReference(data.userId, data.id1), {
      createdAt: product2.createdAt,
    });
    await updateDoc(getProductDocumentReference(data.userId, data.id2), {
      createdAt: product1.createdAt,
    });
    return {
      id1: data.id1,
      id2: data.id2,
      createdAt1: product2.createdAt,
      createdAt2: product1.createdAt,
    };
  }
  return;
}
