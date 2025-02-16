import { annualInflationRange } from "@/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useInvestmentStore } from "@/store/investmentStore";
import { Cog } from "lucide-react";
import { type FC, useState } from "react";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const OpenButton: FC = () => (
  <Button size="icon" variant="outline" className="size-10">
    <Cog className="size-6" />
    <span className="sr-only">Advanced Settings</span>
  </Button>
);

const CloseButton: FC = () => <Button variant="outline">Close</Button>;

const SettingsForm: FC<{ className?: string }> = ({ className }) => {
  const annualInflationCent = useInvestmentStore(
    (state) => state.annualInflationCent,
  );
  const setAnnualInflationCent = useInvestmentStore(
    (state) => state.setAnnualInflationCent,
  );

  return (
    <div className={cn("grid gap-4 py-4", className)}>
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
  );
};

export const SettingsDialog: FC = () => {
  const [open, setOpen] = useState(false);

  const isAboveBreakpointSm = useMediaQuery("(min-width: 40rem)");

  return isAboveBreakpointSm ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <OpenButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Advanced Settings</DialogTitle>
          <DialogDescription>
            Customize the simulation with advanced settings.
          </DialogDescription>
        </DialogHeader>
        <SettingsForm />
        <DialogFooter>
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <OpenButton />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Advanced Settings</DrawerTitle>
          <DrawerDescription>
            Customize the simulation with advanced settings.
          </DrawerDescription>
        </DrawerHeader>
        <SettingsForm className="px-4" />
        <DrawerFooter>
          <DrawerClose asChild>
            <CloseButton />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
