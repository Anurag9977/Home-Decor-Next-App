import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ImageInputProps = {
  name: string;
  label?: string;
};
function ImageInput({ name, label }: ImageInputProps) {
  return (
    <div>
      <Label htmlFor={name} className="capitalize tracking-wide">
        {label || name}
      </Label>
      <Input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        required
        className="mt-1"
      />
    </div>
  );
}
export default ImageInput;
