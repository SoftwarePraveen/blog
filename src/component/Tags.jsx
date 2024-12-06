import React from "react";
import { Link } from "react-router-dom";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="tags">
      <div className="blog-heading text-start pt-3 py-2 mb-4">Tags</div>
        {tags?.map((tag, index) => (
          <p className="tag" key={index}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
            >
              {tag}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tags;