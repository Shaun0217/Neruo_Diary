// src/SinglePost.js
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const q = query(collection(db, "posts"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setPost(querySnapshot.docs[0].data());
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="mb-4 rounded" />
      )}
      <p className="text-gray-600 mb-6">{post.summary}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
