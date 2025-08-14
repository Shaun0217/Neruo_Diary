import React, { useEffect, useState } from "react";
import { getPosts } from "./getPosts";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Blog</h1>
      {posts.map(post => (
        <div key={post.id} className="mb-6 border-b pb-4">
          <Link to={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold text-blue-500 hover:underline">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600">{post.summary}</p>
        </div>
      ))}
    </div>
  );
}
