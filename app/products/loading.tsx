"use client";

import LoadingProductsContainer from "@/components/global/LoadingProductsContainer";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <Skeleton className="h-10 w-full" />
      <div className="mt-8">
        <LoadingProductsContainer />
      </div>
    </>
  );
}
export default loading;
