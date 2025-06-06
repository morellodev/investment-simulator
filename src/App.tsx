import { type FC, Suspense, lazy } from "react";
import { Footer } from "./components/Footer";
import { InvestmentInputs } from "./components/InvestmentInputs";
import { InvestmentOutlook } from "./components/InvestmentOutlook";
import { PortfolioComposer } from "./components/PortfolioComposer";
import { PortfolioPreview } from "./components/PortfolioPreview";
import { ProjectionDetails } from "./components/ProjectionDetails";
import { SettingsDialog } from "./components/SettingsDialog";
import { Card } from "./components/ui/card";
import { Separator } from "./components/ui/separator";

const ProjectionChartLazy = lazy(() => import("./components/ProjectionChart"));

export const App: FC = () => {
  return (
    <div className="min-h-svh">
      <main className="py-6 md:py-10 lg:py-20">
        <div className="container">
          <div className="flex items-end justify-between gap-2">
            <div className="lg:w-1/2">
              <h1 className="text-balance font-bold text-3xl leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Simulate your investment return
              </h1>
            </div>
            <div className="shrink-0">
              <SettingsDialog />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:gap-6 lg:mt-20 lg:gap-8">
            <section className="col-span-full">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
                <InvestmentInputs />
              </Card>
            </section>

            <section className="col-span-full lg:col-span-1">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
                <PortfolioComposer />
                <PortfolioPreview />
              </Card>
            </section>

            <section className="col-span-full lg:col-span-1">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
                <InvestmentOutlook />
                <Separator />
                <ProjectionDetails />
              </Card>
            </section>

            <section className="col-span-full">
              <Card className="h-full px-4 py-5 lg:px-9 lg:py-8">
                <div className="h-48 md:h-64 lg:h-80">
                  <Suspense
                    fallback={
                      <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
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

      <Footer />
    </div>
  );
};
