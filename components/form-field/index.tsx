import React, { cloneElement, isValidElement } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface CustomFormFieldProps {
  label?: string;
  name: string;
  children: React.ReactElement;
  required?: boolean;
  className?: string;
  maxLength?: number;
  [key: string]: any;
}

const CustomFormField = ({ label, name, required, children, className, maxLength, ...rest }: CustomFormFieldProps) => {
  const { control } = useFormContext();
  const currentLength = useWatch({ name, control })?.length || 0;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("relative", className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            {isValidElement(children) ? cloneElement(children, { ...field, ...rest }) : children}
          </FormControl>
          <div className="flex justify-between items-center mt-4">
            <FormMessage />
            {maxLength && (
              <span className={cn("text-sm ml-auto", currentLength > maxLength && "text-red-500")}>
                {currentLength} / {maxLength}
              </span>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

