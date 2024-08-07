import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
};

function FormInput({ name, type, label, defaultValue }: FormInputProps) {
  return (
    <div>
      <Label htmlFor={name} className="capitalize tracking-wide">
        {label || name}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        className="mt-1 tracking-wide"
      />
    </div>
  );
}
export default FormInput;
