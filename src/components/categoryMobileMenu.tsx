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
      {props.categories
        .sort(
          (c1, c2) =>
            Date.parse(`${c1.created_at}`) - Date.parse(`${c2.created_at}`)
        )
        .map((c, i) => (
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
