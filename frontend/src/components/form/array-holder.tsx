import TableInput from "../input/table-input";
import TextInput from "../input/text-input";

export default function ArrayHolder({
  obj,
  control,
}: {
  obj: any;
  control: any;
}) {
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => {
        return <TextInput key={key} control={control} name={key} />;
      })}
      <TableInput />
    </div>
  );
}
