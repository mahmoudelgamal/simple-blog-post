import React, { useState } from "react";
import { Blog } from "../../pages/Blog/Blog";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <article className="flex flex-col sm:flex-row items-start justify-between mb-8 border-b border-gray-200 pb-8">
      <div className="flex flex-col sm:w-1/2 items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={blog.datetime} className="text-gray-500">
            {blog.date}
          </time>
          <a
            href="#"
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {blog.category.title}
          </a>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            {blog.title}
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600">
            {isExpanded
              ? blog.body
              : blog.body.length > 120
              ? blog.body.substring(0, 120) + "..."
              : blog.body}
          </p>
          {blog.body.length > 150 && (
            <button
              onClick={handleToggle}
              className="mt-2 text-indigo-600 hover:text-indigo-800"
            >
              {isExpanded ? "Show less" : "See more"}
            </button>
          )}
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            alt=""
            src={blog.author.imageUrl}
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href={blog.author.href}>
                <span className="absolute inset-0" />
                {blog.author.name}
              </a>
            </p>
            <p className="text-gray-600">{blog.author.role}</p>
          </div>
        </div>
      </div>
      <div className="relative h-56 sm:h-80 w-full sm:w-1/2 overflow-hidden rounded-lg bg-white mt-4 sm:mt-0 sm:ml-4">
        <img
          alt={blog.author.imageUrl}
          src={blog.author.imageUrl}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </article>
  );
};

export { BlogCard };
