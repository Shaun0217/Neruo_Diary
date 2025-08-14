// src/AdminPanel.js
import React, { useState } from "react";
import { db, storage } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";
    try {
      if (image) {
        const imageRef = ref(storage, `blog-images/${Date.now()}-${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        title,
        slug,
        summary,
        content,
        imageUrl,
        created_at: serverTimestamp()
      });

      setTitle("");
      setSlug("");
      setSummary("");
      setContent("");
      setImage(null);
      alert("Post added!");
    } catch (error) {
      console.error("Error adding post: ", error);
      alert("Error adding post. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <textarea
          className="border p-2 w-full h-40"
          placeholder="Content (HTML or Markdown)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          disabled={uploading}
          className={`px-4 py-2 rounded text-white ${uploading ? "bg-gray-400" : "bg-blue-500"}`}
          type="submit"
        >
          {uploading ? "Uploading..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
