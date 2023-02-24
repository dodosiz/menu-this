import { Input } from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import { useState } from "react";

interface ColorPickerProps {
  value: string;
  setValue: (v: string) => void;
}

export function ColorPicker({ value, setValue }: ColorPickerProps) {
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
  return (
    <>
      <Input
        backgroundColor={value}
        value={value}
        focusBorderColor={value}
        onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
      />
      {showTitleColorPicker && (
        <ChromePicker color={value} onChangeComplete={(c) => setValue(c.hex)} />
      )}
    </>
  );
}
