import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export interface CategoryContextMenuProps {
  confirmTitle: string;
  confirmMessage: string;
  isConfirmOpen: boolean;
  onCloseConfirm: () => void;
  onDeleteConfirmed: () => void;
  onOpenConfirm: () => void;
  onEditClick: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function ContextMenu(props: CategoryContextMenuProps) {
  return (
    <>
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
          <PopoverHeader fontWeight="semibold">
            {props.confirmTitle}
          </PopoverHeader>
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
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BiDotsVerticalRounded />}
          variant="unstyled"
        />
        <MenuList zIndex={3}>
          {props.onMoveUp && (
            <MenuItem onClick={props.onMoveUp} icon={<AiOutlineArrowUp />}>
              Move Up
            </MenuItem>
          )}
          {props.onMoveDown && (
            <MenuItem onClick={props.onMoveDown} icon={<AiOutlineArrowDown />}>
              Move Down
            </MenuItem>
          )}
          <MenuItem onClick={props.onEditClick} icon={<RiEditLine />}>
            Edit
          </MenuItem>
          <MenuItem onClick={props.onOpenConfirm} icon={<RiDeleteBin6Line />}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
