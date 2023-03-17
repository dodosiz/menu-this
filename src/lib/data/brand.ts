import {
  doc,
  setDoc,
  FirestoreDataConverter,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../core/firebase";

const BRANDS_COLLECTION = "brands";

export class Brand {
  title: string;
  constructor(title: string) {
    this.title = title;
  }
}

const brandConverter: FirestoreDataConverter<Brand> = {
  toFirestore: (brand) => {
    return {
      title: brand.title,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Brand(data.title);
  },
};

export function getBrandDocumentReference(userId: string) {
  return doc(db, BRANDS_COLLECTION, userId).withConverter(brandConverter);
}

export async function getBrand(userId: string) {
  const document = await getDoc(getBrandDocumentReference(userId));
  const brand = document.data();
  if (!brand) {
    throw new Error("Brand not found");
  }
  return brand;
}

export interface BrandDTO {
  title: string;
  userId: string;
}

export interface CreateBrandData {
  title: string;
  userId: string;
}

export async function createBrand(data: CreateBrandData) {
  const document: Brand = {
    title: data.title,
  };
  await setDoc(doc(db, BRANDS_COLLECTION, data.userId), document);
}

export interface UpdateBrandData {
  userId: string;
  title: string;
}

export async function updateBrand(data: UpdateBrandData) {
  await updateDoc(getBrandDocumentReference(data.userId), {
    title: data.title,
  });
}
