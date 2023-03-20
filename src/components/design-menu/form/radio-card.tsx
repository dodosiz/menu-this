import {
  Box,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  VStack,
} from "@chakra-ui/react";

interface RadioCardProps {
  value: string | null;
  options: string[];
  setValue: (_s: string) => void;
}

export function RadioCard({ options, value, setValue }: RadioCardProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "template",
    value: value ?? undefined,
    onChange: setValue,
  });

  const group = getRootProps();

  return (
    <VStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCardItem key={value} {...radio}>
            <>{value}</>
          </RadioCardItem>
        );
      })}
    </VStack>
  );
}

interface RadioCardItemProps extends UseRadioProps {
  children: React.ReactElement;
}

function RadioCardItem(props: RadioCardItemProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" width="100%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
