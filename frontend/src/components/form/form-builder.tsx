import ArrayHolder from "./array-holder";

export default function FormBuilder({ obj }: { obj: any }) {
  if (!obj) {
    return <div>no form</div>;
  }
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      return <ArrayHolder />;
    }
    if (typeof value === "object") {
      return <FormBuilder obj={value} />;
    }
    if (value === "String") {
      return;
    }
  });

  return <div>hello</div>;
}
