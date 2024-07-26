import React from "react";

interface BlogHeaderProps {
  onSearch: (query: string) => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mx-auto max-w-2xl lg:mx-0">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        From the blog
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Learn how to grow your business with our expert advice.
      </p>
      <div className="sm:col-span-3 mt-5">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search blogs
        </label>
        <div className="mt-2">
          <input
            id="first-name"
            name="first-name"
            type="text"
            placeholder="Ex. qui est esse"
            autoComplete="given-name"
            className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export { BlogHeader };
