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
} from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../core/firebase";
import { CATEGORY_COLLECTION, USER_DATA_COLLECTION } from "./categories";

const PRODUCT_COLLECTION = "products";

export class Product {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt: number;
  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    createdAt: number
  ) {
    this.id = id;
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
      data.name,
      data.price,
      data.description,
      data.createdAt
    );
  },
};

export function getProductDocumentReference(
  userId: string,
  categoryId: string,
  productId: string
) {
  return doc(
    db,
    USER_DATA_COLLECTION,
    userId,
    CATEGORY_COLLECTION,
    categoryId,
    PRODUCT_COLLECTION,
    productId
  ).withConverter(productConverter);
}

export function getProductCollectionReference(
  userId: string,
  categoryId: string
) {
  return collection(
    db,
    USER_DATA_COLLECTION,
    userId,
    CATEGORY_COLLECTION,
    categoryId,
    PRODUCT_COLLECTION
  ).withConverter(productConverter);
}

export interface CreateProductResult {
  id: string;
  createdAt: number;
}

export interface CreateProductData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  userId: string;
}

export async function createProduct(
  data: CreateProductData
): Promise<CreateProductResult> {
  const col = getProductCollectionReference(data.userId, data.categoryId);
  const snapshot = await getCountFromServer(col);
  const productCount = snapshot.data().count;
  if (productCount >= PRODUCT_LIMIT) {
    throw new Error("Max limit reached");
  }
  const newProductId = v4();
  const currentTimestamp = Date.now();
  await setDoc(
    getProductDocumentReference(data.userId, data.categoryId, newProductId),
    {
      id: newProductId,
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      createdAt: currentTimestamp,
    }
  );
  return {
    id: newProductId,
    createdAt: currentTimestamp,
  };
}

export async function countProducts(userId: string, categoryId: string) {
  const col = getProductCollectionReference(userId, categoryId);
  const snapshot = await getCountFromServer(col);
  return snapshot.data().count;
}

export interface UpdateProductData {
  name: string;
  price: string;
  description: string;
  productId: string;
  userId: string;
  categoryId: string;
}

export async function updateProduct(data: UpdateProductData) {
  await updateDoc(
    getProductDocumentReference(data.userId, data.categoryId, data.productId),
    {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
    }
  );
}

export async function getProductsInCategory(
  categoryId: string,
  userId: string
) {
  const q = query(
    getProductCollectionReference(userId, categoryId),
    orderBy("createdAt")
  );
  const querySnapshot = await getDocs(q);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => products.push(doc.data()));
  return products;
}

export interface DeleteData {
  userId: string;
  categoryId: string;
  productId: string;
}

export async function deleteProduct(data: DeleteData) {
  await deleteDoc(
    getProductDocumentReference(data.userId, data.categoryId, data.productId)
  );
}

export interface SwapData {
  id1: string;
  id2: string;
  userId: string;
  categoryId: string;
}

export async function swap(data: SwapData) {
  const productSnap1 = await getDoc(
    getProductDocumentReference(data.userId, data.categoryId, data.id1)
  );
  const productSnap2 = await getDoc(
    getProductDocumentReference(data.userId, data.categoryId, data.id2)
  );
  const product1 = productSnap1.data();
  const product2 = productSnap2.data();

  if (product1 && product2) {
    await updateDoc(
      getProductDocumentReference(data.userId, data.categoryId, data.id1),
      {
        createdAt: product2.createdAt,
      }
    );
    await updateDoc(
      getProductDocumentReference(data.userId, data.categoryId, data.id2),
      {
        createdAt: product1.createdAt,
      }
    );
  }
}
