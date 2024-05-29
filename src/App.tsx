import { FC } from "react";
import { Card } from "./components/Card";
import { Field, Label } from "./components/Field";
import { InvestmentInputs } from "./components/InvestmentInputs";
import { InvestmentOutlook } from "./components/InvestmentOutlook";
import { PortfolioSelect } from "./components/PortfolioSelect";
import { ReturnRate } from "./components/ReturnRate";
import { ProjectionDetails } from "./components/ProjectionDetails";

export const App: FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-6 md:p-10 lg:p-20">
        <div className="lg:w-1/2">
          <h1 className="text-balance text-3xl md:text-4xl lg:text-5xl font-semibold">
            Returns, performance and fees
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-8 md:mt-10 lg:mt-20">
          <section className="col-span-full">
            <Card>
              <InvestmentInputs />
            </Card>
          </section>

          <section className="col-span-full lg:col-span-1">
            <Card>
              <Field>
                <Label>Select Portfolio</Label>
                <PortfolioSelect />
              </Field>
              <div className="my-4" />
              <ReturnRate />
            </Card>
          </section>

          <section className="col-span-full lg:col-span-1">
            <Card>
              <InvestmentOutlook />
              <hr className="my-6 border-t-zinc-200" />
              <ProjectionDetails />
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
