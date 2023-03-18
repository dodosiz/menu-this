import { Category } from "@/lib/data/categories";
import { Select } from "@chakra-ui/react";

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
        .sort((c1, c2) => c1.createdAt - c2.createdAt)
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
