import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "../../components";

const LoadingNewIssuePage = () => {
  return (
    <Box>
      <Skeleton className="max-w-xl" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
