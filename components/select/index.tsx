import React, { SelectHTMLAttributes, forwardRef, memo, useState } from "react";

import { FieldError } from "react-hook-form";

import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  id: string;
  label?: string;
  options: Option[];
  error?: FieldError;
  required?: boolean;
  inputClassName?: string;
  messageClassName?: string;
  arrow?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { className, id, label, options, error, required, messageClassName, inputClassName, arrow, ...rest } = props;

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label
          htmlFor={id}
          className={"input-label"}
        >
          {label}
          {required && <span className="text-red-700"> *</span>}
        </label>
      )}

      <div>
        <select
          id={id}
          className={cn("input cursor-pointer", inputClassName, arrow && "select-arrow")}
          ref={ref}
          {...rest}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={cn("input-error-message", messageClassName)}>{error.message}</p>}
    </div>
  );
});

export default Select;

