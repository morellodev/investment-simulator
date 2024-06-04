import { FC, Suspense, lazy } from "react";

const ProjectionChartLazy = lazy(() =>
  import("./LazyProjectionChart").then((module) => ({
    default: module.ProjectionChartLazy,
  }))
);

export const ProjectionChart: FC = () => {
  return (
    <div className="h-48 md:h-64 lg:h-80">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            Loading chart...
          </div>
        }
      >
        <ProjectionChartLazy />
      </Suspense>
    </div>
  );
};
