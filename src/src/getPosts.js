// src/getPosts.js
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("created_at", "desc"));
  const querySnapshot = await getDocs(q);

  let posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });

  return posts;
}
