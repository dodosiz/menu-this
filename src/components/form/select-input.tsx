import { Select } from "@chakra-ui/react";

interface SelectProps {
  options: string[];
  value: string;
  setValue: (v: string) => void;
}

export function SelectInput({ options, value, setValue }: SelectProps) {
  return (
    <Select value={value} onChange={(e) => setValue(e.target.value)}>
      {options.map((o) => (
        <option value={o} key={o}>
          {o}
        </option>
      ))}
    </Select>
  );
}
