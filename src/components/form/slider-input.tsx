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
  setValue: (n: number) => void;
}

export function SliderInput({ value, setValue }: SliderProps) {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box pt={6} pb={2}>
      <Slider colorScheme="teal" value={value} max={200} onChange={setValue}>
        <SliderMark value={50} {...labelStyles}>
          50
        </SliderMark>
        <SliderMark value={100} {...labelStyles}>
          100
        </SliderMark>
        <SliderMark value={150} {...labelStyles}>
          150
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
