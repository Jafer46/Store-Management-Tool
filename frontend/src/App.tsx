import FormBuilder from "./components/form/form-builder";
import { Input } from "./components/ui/input";
import { MRole } from "./constants/models";

export default function App() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-80 h-80 border-2 shadow-2xl p-4">
        <h1>hello</h1>
        <FormBuilder obj={MRole} />
        <Input />
      </div>
    </div>
  );
}
