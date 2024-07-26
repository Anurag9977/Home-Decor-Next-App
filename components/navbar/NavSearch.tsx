"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function NavSearch() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search");
  const navigate = useRouter();

  const [search, setSearch] = useState<string>(searchText?.toString() || "");

  const handleSearch = useDebouncedCallback((value: string) => {
    const urlParams = new URLSearchParams(searchParams);
    if (value) {
      urlParams.set("search", value);
    } else {
      urlParams.delete("search");
    }
    navigate.replace(`/products?${urlParams.toString()}`);
  }, 300);

  useEffect(() => {
    if (searchText) {
      setSearch(searchText as string);
    } else {
      setSearch("");
    }
  }, [searchText]);

  return (
    <Input
      name="search"
      type="search"
      placeholder="Search products..."
      className="max-w-80 bg-muted tracking-wide"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}
export default NavSearch;
