import {
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteIconWithConfirmProps {
  className: string;
  isConfirmOpen: boolean;
  title: string;
  confirmMessage: string;
  onDeleteConfirmed: () => void;
  onOpenConfirm: () => void;
  onCloseConfirm: () => void;
}

export function DeleteIconWithConfirm(props: DeleteIconWithConfirmProps) {
  return (
    <>
      <IconButton
        variant="unstyled"
        aria-label="Delete category"
        className={props.className}
        icon={<RiDeleteBin6Line />}
        onClick={props.onOpenConfirm}
      />
      <Popover
        returnFocusOnClose={false}
        isOpen={props.isConfirmOpen}
        onClose={props.onCloseConfirm}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <span></span>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">{props.title}</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>{props.confirmMessage}</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button onClick={props.onCloseConfirm} variant="outline">
                Cancel
              </Button>
              <Button onClick={props.onDeleteConfirmed} colorScheme="red">
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
