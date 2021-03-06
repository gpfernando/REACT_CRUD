import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts, deletePost, isAuthenticated }) => (
  <article className="posts container">
    <h1>Customers</h1>
    <ul>
      {posts.length < 1 && <li key="empty">No Customer Information yet!</li>}
      {posts.map(post => (
        <li key={post.key}>
          <h2>
            <Link to={`/post/${post.slug}`}>{post.name}</Link>
          </h2>
          {isAuthenticated && (
            <p>
              <Link to={`/edit/${post.slug}`}>Edit</Link>
              {" | "}
              <button
                className="linkLike"
                onClick={e => {
                  e.preventDefault();
                  deletePost(post);
                }}
              >
                Delete
              </button>
            </p>
          )}
        </li>
      ))}
    </ul>
  </article>
);

export default Posts;
