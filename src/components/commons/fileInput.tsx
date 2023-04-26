import {
  AspectRatio,
  Box,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

interface FileInputProps {
  onChange: (_event: any) => void;
}

export default function FileInput({ onChange }: FileInputProps) {
  return (
    <>
      <AspectRatio width="40" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "md",
          }}
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                <Stack p="8" textAlign="center" spacing="1">
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    Drop images here
                  </Heading>
                  <Text fontWeight="light">or click to upload</Text>
                </Stack>
              </Stack>
            </Box>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onChange={onChange}
            />
          </Box>
        </Box>
      </AspectRatio>
      <Text fontWeight="light">
        * Use landscape photos for better layout design.
      </Text>
    </>
  );
}
