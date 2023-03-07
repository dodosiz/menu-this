import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RxEyeClosed } from "react-icons/rx";

interface PasswordInputProps {
  password?: string;
  isRepeat?: boolean;
  value: string;
  setValue: (v: string) => void;
}

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const isInvalid =
    (props.password?.length &&
      props.value.length &&
      props.value !== props.password) ||
    (props.value.length && props.value.length < 6);
  const handleClick = () => setShow(!show);
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        focusBorderColor={isInvalid ? "red.200" : "teal.200"}
        type={show ? "text" : "password"}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        placeholder={props.isRepeat ? "Repeat password" : "Enter password"}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          icon={show ? <MdOutlineRemoveRedEye /> : <RxEyeClosed />}
          aria-label={show ? "Hide" : "Show"}
          h="1.75rem"
          size="sm"
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  );
}
