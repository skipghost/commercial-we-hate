import { Option } from "@/types";

import { FormControl, FormItem, FormLabel } from "../ui/form";
import { RadioGroupItem, RadioGroup as ShadCnRadioGroup } from "../ui/radio-group";

interface RadioGroupProps {
  options: Option[];
  onChange?: (value: string) => void;
}

const RadioGroup = ({ options, onChange, ...rest }: RadioGroupProps) => {
  return (
    <ShadCnRadioGroup
      className="grid sm:grid-cols-2 gap-x-6 gap-y-4"
      onValueChange={onChange}
      {...rest}
    >
      {options.map((option, index) => (
        <FormItem
          key={index}
          className="relative flex gap-2 items-start w-full"
        >
          <FormControl className="mt-3">
            <RadioGroupItem value={option.value} />
          </FormControl>
          <FormLabel className="cursor-pointer flex-1">
            <h3 className="text-sm font-medium text-primary-dark capitalize mt-2.5 flex gap-1 items-start">
              {option.label}
            </h3>
          </FormLabel>
        </FormItem>
      ))}
    </ShadCnRadioGroup>
  );
};

export default RadioGroup;

