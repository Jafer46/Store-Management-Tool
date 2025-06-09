import { parseAndCalculate } from "@/lib/input-parser";
import TextInput from "../input/text-input";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import ArrayHolder from "./array-holder";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

export default function FormBuilder({ obj }: { obj: any }) {
  const [isSaved, setIsSaved] = useState(false);
  const form = useForm({
    defaultValues: obj,
  });

  const values = useWatch({
    control: form.control,
  });

  useEffect(() => {
    setIsSaved(false);
  }, [values]);

  const onSubmit = () => {
    setIsSaved(true);
  };

  if (!obj) {
    return <div>no form</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {Object.entries(obj).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <ArrayHolder key={key} obj={value[0]} control={form.control} />
            );
          }

          if (value?.type === "String") {
            return <TextInput key={key} control={form.control} name={key} />;
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

        <Button type="submit" disabled={isSaved}>
          Save
        </Button>
      </form>
    </Form>
  );
}


