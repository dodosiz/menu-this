import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

interface SliderProps {
  value: number;
  setValue: (_n: number) => void;
  maxValue: number;
}

export function SliderInput({ value, setValue, maxValue }: SliderProps) {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box pt={6} pb={2}>
      <Slider
        colorScheme="teal"
        value={value}
        max={maxValue}
        onChange={setValue}
      >
        <SliderMark value={Math.floor(maxValue / 4)} {...labelStyles}>
          {Math.floor(maxValue / 4)}
        </SliderMark>
        <SliderMark value={2 * Math.floor(maxValue / 4)} {...labelStyles}>
          {2 * Math.floor(maxValue / 4)}
        </SliderMark>
        <SliderMark value={3 * Math.floor(maxValue / 4)} {...labelStyles}>
          {3 * Math.floor(maxValue / 4)}
        </SliderMark>
        <SliderMark
          value={value}
          textAlign="center"
          bg="teal.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {value}
        </SliderMark>
        <SliderTrack bg="teal.100">
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
