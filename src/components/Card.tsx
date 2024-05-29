import { FC, PropsWithChildren } from "react";

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full rounded-lg px-4 py-5 lg:px-9 lg:py-8 bg-zinc-100">
      {children}
    </div>
  );
};
