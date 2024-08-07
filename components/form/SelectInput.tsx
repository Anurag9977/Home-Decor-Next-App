import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectInputProps = {
  id?: string;
  name: string;
  label?: string;
  placeholder: string;
  items: string[];
};

function SelectInput({
  id,
  name,
  label,
  placeholder,
  items,
}: SelectInputProps) {
  return (
    <div>
      <Select name={name} required>
        <Label htmlFor={id || name} className="capitalize tracking-wide">
          {label || name}
        </Label>
        <SelectTrigger
          id={id || name}
          className="mt-1 capitalize tracking-wide"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item, index) => {
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
export default SelectInput;
