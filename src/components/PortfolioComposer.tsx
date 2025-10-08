import { type FC, useId } from "react";
import { useShallow } from "zustand/shallow";
import { portfolios } from "@/data/portfolios";
import { useAppStore } from "@/store/appStore";
import { ReturnRate } from "./ReturnRate";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "./ui/field";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export const PortfolioComposer: FC = () => {
  const idPrefix = useId();
  const descriptionId = `${idPrefix}-description`;

  const { portfolioId, setPortfolioId } = useAppStore(
    useShallow((state) => ({
      portfolioId: state.portfolioId,
      setPortfolioId: state.setPortfolioId,
    })),
  );

  return (
    <div className="flex flex-col gap-2">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Select Portfolio</FieldLegend>
          <RadioGroup
            aria-describedby={descriptionId}
            className="flex @md/field-group:flex-row flex-col"
            value={portfolioId}
            onValueChange={setPortfolioId}
          >
            {portfolios.map(({ id, name }) => {
              const radioId = `${idPrefix}-${id}`;
              return (
                <FieldLabel key={id} htmlFor={radioId}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{name}</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value={id} id={radioId} />
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
      <FieldDescription id={descriptionId}>
        <ReturnRate />
      </FieldDescription>
    </div>
  );
};
