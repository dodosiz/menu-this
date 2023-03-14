import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";

interface ActionButtonProps {
  title: string;
  action: string;
  destination: string;
}

export function ActionPage({ title, action, destination }: ActionButtonProps) {
  const router = useRouter();
  return (
    <Center>
      <VStack
        alignItems="flex-start"
        justifyContent="center"
        height="60vh"
        minHeight="60vh"
        spacing="10px"
      >
        <Heading size="xl" as="h1">
          {title}
        </Heading>
        <Button
          colorScheme="teal"
          variant="outline"
          rightIcon={<FaArrowRight />}
          onClick={() => router.push(destination)}
        >
          {action}
        </Button>
      </VStack>
    </Center>
  );
}
