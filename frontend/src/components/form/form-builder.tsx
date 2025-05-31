import { parseAndCalculate } from "@/lib/input-parser";
import TextInput from "../input/text-input";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import ArrayHolder from "./array-holder";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";

export default function FormBuilder({ obj }: { obj: any }) {
  const form = useForm({
    defaultValues: obj,
  });

  const values = useWatch({
    control: form.control,
  });

  if (!obj) {
    return <div>no form</div>;
  }

  return (
    <Form {...form}>
      <form>
        {Object.entries(obj).map(([key, value]) => {
          if (Array.isArray(value)) {
            return <ArrayHolder key={key} />;
          }

          if (typeof value === "object" && value !== null) {
            return <FormBuilder key={key} obj={value} />;
          }
          if (typeof value === "string" && value.includes("formula:")) {
            const formula = value.replace("formula:", "");
            const calculatedValue = useMemo(() => {
              return parseAndCalculate(formula, values);
            }, [values, formula]);

            return (
              <Input key={key} name={key} disabled value={calculatedValue} />
            );
          }

          return <TextInput key={key} control={form.control} name={key} />;
        })}
      </form>
    </Form>
  );
}
