import { annualInflationRange } from "@/constants";
import { useInvestmentStore } from "@/store/investmentStore";
import { Cog } from "lucide-react";
import type { FC } from "react";
import { FormattedNumber } from "./FormattedNumber";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export const SettingsDialog: FC = () => {
  const annualInflationCent = useInvestmentStore(
    (state) => state.annualInflationCent,
  );
  const setAnnualInflationCent = useInvestmentStore(
    (state) => state.setAnnualInflationCent,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Cog className="size-6" />
          <span className="sr-only">Advanced Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Advanced Settings</DialogTitle>
          <DialogDescription>
            Customize the simulation with advanced settings.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <fieldset>
            <legend className="sr-only">Set annual inflation rate</legend>
            <div className="mb-6 flex flex-col gap-4">
              <Label>Annual Inflation Rate</Label>
              <div className="font-medium text-xl">
                <FormattedNumber
                  value={annualInflationCent / 100}
                  style="percent"
                />
              </div>
            </div>
            <Slider
              min={annualInflationRange[0]}
              max={annualInflationRange[1]}
              value={[annualInflationCent]}
              onValueChange={([v]) => setAnnualInflationCent(v)}
            />
          </fieldset>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
