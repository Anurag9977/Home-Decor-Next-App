import { Input } from "../ui/input";
import { Label } from "../ui/label";

type PriceInputProps = {
  name?: string;
  defaultValue?: number;
};

function PriceInput({ name = "price", defaultValue }: PriceInputProps) {
  return (
    <div>
      <Label
        htmlFor={name}
        className="capitalize tracking-wide"
      >{`${name} (₹)`}</Label>
      <Input
        type="number"
        id={name}
        name={name}
        min={0}
        required
        defaultValue={defaultValue}
        className="mt-1 tracking-wider"
      />
    </div>
  );
}
export default PriceInput;
