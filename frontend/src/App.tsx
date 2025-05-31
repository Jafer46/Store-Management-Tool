import FormBuilder from "./components/form/form-builder";
import { MRole } from "./constants/models";

export default function App() {
  return (
    <div className="bg-red-400">
      <h1>hello</h1>
      <FormBuilder obj={MRole} />
    </div>
  );
}
