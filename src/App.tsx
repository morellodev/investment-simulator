import { FC, Suspense, lazy } from "react";
import { InvestmentInputs } from "./components/InvestmentInputs";
import { InvestmentOutlook } from "./components/InvestmentOutlook";
import { PortfolioSelect } from "./components/PortfolioSelect";
import { ProjectionDetails } from "./components/ProjectionDetails";
import { Card } from "./components/ui/card";

const ProjectionChartLazy = lazy(() =>
  import("./components/ProjectionChart").then((module) => ({
    default: module.ProjectionChart,
  }))
);

export const App: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="py-6 md:py-10 lg:py-20">
        <div className="container">
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] text-balance">
              Simulate your investment return
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 md:mt-10 lg:mt-20">
            <section className="col-span-full">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
                <InvestmentInputs />
              </Card>
            </section>

            <section className="col-span-full lg:col-span-1">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
                <PortfolioSelect />
              </Card>
            </section>

            <section className="col-span-full lg:col-span-1">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
                <InvestmentOutlook />
                <hr className="my-6 border-t-zinc-200" />
                <ProjectionDetails />
              </Card>
            </section>

            <section className="col-span-full">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
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
              </Card>
            </section>
          </div>
        </div>
      </main>

      <footer className="pb-6">
        <div className="container">
          <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://morello.dev"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Dennis Morello
            </a>{" "}
            for educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};
