import { FC } from "react";
import { InvestmentInputs } from "./components/InvestmentInputs";
import { InvestmentOutlook } from "./components/InvestmentOutlook";
import { PortfolioSelect } from "./components/PortfolioSelect";
import { ProjectionChart } from "./components/ProjectionChart";
import { ProjectionDetails } from "./components/ProjectionDetails";
import { Card } from "./components/ui/card";

export const App: FC = () => {
  return (
    <main className="container">
      <div className="p-6 md:p-10 lg:p-20">
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
              <ProjectionChart />
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};
