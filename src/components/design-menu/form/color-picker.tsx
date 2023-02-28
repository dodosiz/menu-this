import { Input } from "@chakra-ui/react";
import { ChromePicker, SwatchesPicker } from "react-color";
import { useState } from "react";
import styles from "@/styles/components/design-menu/form/color-picker.module.css";

interface ColorPickerProps {
  value: string;
  setValue: (v: string) => void;
}

export function ColorPicker({ value, setValue }: ColorPickerProps) {
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
  return (
    <>
      <div className={styles.desktop}>
        <Input
          backgroundColor={value}
          value={value}
          focusBorderColor={value}
          onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
        />
        {showTitleColorPicker && (
          <ChromePicker
            color={value}
            onChangeComplete={(c) => setValue(c.hex)}
          />
        )}
      </div>
      <div className={styles.mobile}>
        <Input
          backgroundColor={value}
          value={value}
          focusBorderColor={value}
          onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
        />
        {showTitleColorPicker && (
          <SwatchesPicker
            color={value}
            onChangeComplete={(c) => setValue(c.hex)}
          />
        )}
      </div>
    </>
  );
}
