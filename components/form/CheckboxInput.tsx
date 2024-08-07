import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type CheckboxInputProps = {
  name: string;
  label?: string;
  defaultChecked?: boolean;
};

function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <Label htmlFor={name} className="capitalize tracking-wide">
        {label || name}
      </Label>
    </div>
  );
}
export default CheckboxInput;
