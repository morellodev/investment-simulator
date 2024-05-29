import { FC } from "react";
import { Field, Label } from "./components/Field";
import { InvestmentInputs } from "./components/InvestmentInputs";
import { InvestmentOutlook } from "./components/InvestmentOutlook";
import { PortfolioSelect } from "./components/PortfolioSelect";

export const App: FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-20">
        <div className="w-1/2">
          <h1 className="text-balance text-5xl font-semibold">
            Returns, performance and fees
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-20">
          <section className="rounded-lg px-9 py-8 bg-zinc-100 col-span-2">
            <InvestmentInputs />
          </section>

          <section className="rounded-lg px-9 py-8 bg-zinc-100">
            <Field>
              <Label>Select Portfolio</Label>
              <PortfolioSelect />
            </Field>
          </section>

          <section className="rounded-lg px-9 py-8 bg-zinc-100">
            <InvestmentOutlook />
          </section>
        </div>
      </div>
    </div>
  );
};
