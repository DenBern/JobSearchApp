import { Skeleton } from "@mantine/core";

import "./Skeleton.css";

export const SkeletonVacancy = () => {
  return (
    <div className="skeleton">
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </div> 
  )
}