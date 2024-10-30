// src/services/products.js
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export const fetchProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
  const newProduct = {
    ...product,
    category: product.category, // Add the category property
  };
  await addDoc(productsCollection, newProduct);
};

export const updateProduct = async (id, product) => {
  const updatedProduct = {
    ...product,
    category: product.category, // Add the category property
  };
  await updateDoc(doc(productsCollection, id), updatedProduct);
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  await deleteDoc(productDoc);
};
