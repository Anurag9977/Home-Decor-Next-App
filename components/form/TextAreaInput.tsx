import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
};

function TextAreaInput({
  name,
  label,
  placeholder,
  defaultValue,
}: TextAreaProps) {
  return (
    <div>
      <Label htmlFor={name} className="capitalize tracking-wide">
        {label || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={5}
        required
        className="mt-1 leading-relaxed text-justify h-max"
      />
    </div>
  );
}
export default TextAreaInput;
