import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Cog } from "lucide-react";
import { type ComponentProps, type FC, useState } from "react";
import { CurrencySelect } from "./CurrencySelect";
import { InflationRateSlider } from "./InflationRateSlider";
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

const OpenButton: FC<ComponentProps<"button">> = (props) => (
  <Button {...props} size="icon" variant="outline" className="size-10">
    <Cog className="size-6" />
    <span className="sr-only">Advanced Settings</span>
  </Button>
);

const CloseButton: FC<ComponentProps<"button">> = (props) => (
  <Button {...props} variant="outline">
    Close
  </Button>
);

const SettingsForm: FC<{ className?: string }> = ({ className }) => {
  return (
    <form className={cn("grid gap-8 py-4", className)}>
      <Label className="flex flex-col items-stretch gap-4">
        <span>Annual Inflation Rate</span>
        <InflationRateSlider />
      </Label>

      <Label className="flex flex-col items-stretch gap-4">
        <span>Currency</span>
        <CurrencySelect />
      </Label>
    </form>
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
    <Drawer autoFocus open={open} onOpenChange={setOpen}>
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
