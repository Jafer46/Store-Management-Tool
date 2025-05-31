import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  control: any;
  name: string;
  description?: string;
  placeholder?: string;

  type?: "text" | "number" | "email";
  displayName?: string;
  disabled?: boolean;
}

export default function TextInput({
  control,
  name,
  description,
  placeholder,
  type,
  displayName,
  disabled,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormLabel className="capitalize">{displayName ?? name}</FormLabel>
          <FormControl>
            <Input
              disabled={!!disabled}
              placeholder={placeholder ?? ""}
              type={type ?? "text"}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
