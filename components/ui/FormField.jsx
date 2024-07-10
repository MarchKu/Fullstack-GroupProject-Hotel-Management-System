import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/formComponent";
import { Input } from "@/components/ui/inputRegisterForm";

function FormFieldComponent({
  control,
  name,
  label,
  placeholder,
  description,
  type,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex relative ">
              <Input
                type={type}
                placeholder={placeholder}
                hasError={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && (
                <img
                  src="/img/error-trigger.svg"
                  className="absolute right-3 top-3"
                />
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldComponent;
