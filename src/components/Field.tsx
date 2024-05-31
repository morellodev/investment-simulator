import {
  ComponentProps,
  FC,
  PropsWithChildren,
  createContext,
  use,
  useId,
} from "react";

type FieldContext = {
  id: string;
};

const FieldContext = createContext<FieldContext | null>(null);

const useFieldContext = () => {
  const context = use(FieldContext);

  if (!context) {
    throw new Error("Field components must be used within a FieldContext");
  }

  return context;
};

export const Field: FC<PropsWithChildren> = ({ children }) => {
  const id = useId();

  return (
    <FieldContext value={{ id }}>
      <div className="flex flex-col gap-2">{children}</div>
    </FieldContext>
  );
};

export const Label: FC<PropsWithChildren> = ({ children }) => {
  const { id } = useFieldContext();

  return (
    <label htmlFor={id} className="block font-medium leading-6 text-zinc-900">
      {children}
    </label>
  );
};

export const Input: FC<ComponentProps<"input">> = (props) => {
  const { id } = useFieldContext();

  return (
    <input
      id={id}
      {...props}
      className="block w-full p-4 border-0 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900"
    />
  );
};
