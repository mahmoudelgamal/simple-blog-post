import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { BlogCard } from "../../components/BlogCard";
import { BlogHeader } from "../../components/BlogHeader";

export interface Blog {
  id: number;
  title: string;
  body: string;
  date: string;
  datetime: string;
  category: {
    title: string;
    href: string;
  };
  author: {
    name: string;
    role: string;
    href: string;
    imageUrl: string;
  };
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const apiBaseUrl = "http://localhost:8080";
  const itemsCount = 6;

  const fetchBlogs = async ({ pageParam = 1 }) => {
    const response = await axios.get<{ data: Blog[] }>(
      `${apiBaseUrl}/blogs?_page=${pageParam}&_per_page=${itemsCount}`
    );
    return response.data?.data;
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["postsData"],
    queryFn: fetchBlogs,
    getNextPageParam: (lastPage, allPages) => {
      console;
      return lastPage.length === 6 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const combinedBlogs = data?.pages.flat();

  const filteredBlogs = combinedBlogs?.filter(
    (blog) =>
      blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog?.body?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loaderRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (loaderRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      // Only trigger fetch if scrolled to the bottom
      if (scrollHeight - scrollTop <= clientHeight * 1.1) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return <div className="bg-white py-24 sm:py-32 "> Loading...</div>;

  if (error)
    return (
      <div className="bg-white py-24 sm:py-32 ">
        An error has occurred {(error as Error).message}
      </div>
    );

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BlogHeader onSearch={handleSearch} />
        <div className="mx-auto mt-10">
          {filteredBlogs?.map((blog) => (
            <div key={blog.id} className="mb-8 pb-8">
              <BlogCard blog={blog} />
            </div>
          ))}
          {!filteredBlogs?.length && searchQuery && (
            <p>Ops No Result. try another search param</p>
          )}
          {isFetchingNextPage && <p>Loading more...</p>}
          <div ref={loaderRef} className="h-1"></div>
        </div>
      </div>
    </div>
  );
}
