import FormBuilder from "./components/form/form-builder";
import { MRole } from "./constants/models";

export default function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 border-2 shadow-2xl p-4">
        <h1>hello</h1>
        <FormBuilder obj={MRole} />
        {/* <TextInput control={undefined} name={""} /> */}
      </div>
    </div>
  );
}
