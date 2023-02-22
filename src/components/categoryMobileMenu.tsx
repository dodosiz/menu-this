import { Select } from "@chakra-ui/react";
import { Category } from "@prisma/client";

interface CategoryMobileMenuProps {
  categories: Category[];
  tabIndex: number;
  setTabIndex: (i: number) => void;
}

export function CategoryMobileMenu(props: CategoryMobileMenuProps) {
  return (
    <Select
      bg="teal.500"
      color="white"
      onChange={(e) => {
        e.preventDefault();
        props.setTabIndex(parseInt(e.target.value));
      }}
      value={props.tabIndex.toString()}
    >
      {props.categories.map((c, i) => (
        <option
          style={{ color: "teal" }}
          key={`mcm-${c.id}`}
          value={i.toString()}
        >
          {c.title}
        </option>
      ))}
    </Select>
  );
}
