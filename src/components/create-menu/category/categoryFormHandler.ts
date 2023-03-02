import { CreateCategoryData, UpdateCategoryData } from "@/lib/data/categories";
import { Category } from "@prisma/client";
import { CategoryFormProps } from "./categoryForm";

interface UpdateProps extends CreateCategoryProps {
  categoryInEdit: Category;
}

export async function updateCategory(props: UpdateProps) {
  const data: UpdateCategoryData = {
    categoryId: props.categoryInEdit.id,
    title: props.categoryTitle,
  };
  const JSONdata = JSON.stringify(data);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };
  props.setCategoryTitle("");
  props.setLoading(true);
  const response = await fetch("/api/category/update", options);
  if (response.status === 200) {
    props.setLoading(false);
    props.setEditedCategoryId(""); // close the form
    const updatedCategories = props.categories.map((c) => {
      if (c.id === data.categoryId) {
        return {
          ...c,
          title: data.title,
        };
      }
      return c;
    });
    props.setCategories(updatedCategories);
  } else if (response.status === 500) {
    props.setLoading(false);
    props.setEditedCategoryId("");
    props.setErrorMessage("Internal server error");
  }
}

interface CreateCategoryProps extends CategoryFormProps {
  categoryTitle: string;
  setCategoryTitle: (t: string) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  setTabIndex: (i: number) => void;
}

export async function createCategory(props: CreateCategoryProps) {
  const data: CreateCategoryData = {
    title: props.categoryTitle,
    userId: props.user.id,
  };
  const JSONdata = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };
  props.setCategoryTitle("");
  props.setLoading(true);
  const response = await fetch("/api/category/create", options);
  if (response.status === 200) {
    const result = await response.json();
    props.setLoading(false);
    props.setCreateNewCategory(false); // close the form
    props.setCategories([
      ...props.categories,
      {
        id: result.id,
        title: data.title,
        userId: data.userId,
        created_at: result.created_at,
      },
    ]);
    props.setProductMap({
      ...props.productMap,
      [result.id]: [],
    });
    props.setTabIndex(props.categories.length);
  } else if (response.status === 500) {
    props.setLoading(false);
    props.setCreateNewCategory(false);
    props.setErrorMessage("Internal server error");
  }
}

interface DeleteProps {
  categoryId: string;
  categories: Category[];
  setCategories: (c: Category[]) => void;
  setErrorMessage: (s: string) => void;
  setLoading: (b: boolean) => void;
  setCategoryIdToDelete: (s: string | null) => void;
}

export async function handleDelete(props: DeleteProps) {
  const JSONdata = JSON.stringify({ id: props.categoryId });
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };
  props.setLoading(true);
  props.setCategoryIdToDelete(null);
  const response = await fetch("/api/category/delete", options);
  if (response.status === 200) {
    props.setLoading(false);
    props.setCategories(
      props.categories.filter((c) => c.id !== props.categoryId)
    );
  } else if (response.status === 500) {
    props.setLoading(false);
    props.setErrorMessage("Internal server error");
  }
}

interface SwapProps {
  id1: string;
  id2: string;
  categories: Category[];
  updateTabIndex?: () => void;
  setCategories: (c: Category[]) => void;
  setErrorMessage: (s: string) => void;
  setLoading: (b: boolean) => void;
}

export async function swapDates(props: SwapProps) {
  const JSONdata = JSON.stringify({ id1: props.id1, id2: props.id2 });
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };
  props.setLoading(true);
  const response = await fetch("/api/category/swap", options);
  if (response.status === 200) {
    const c1 = props.categories.find((c) => c.id === props.id1);
    const c2 = props.categories.find((c) => c.id === props.id2);
    props.setLoading(false);
    props.setCategories(
      props.categories.map((c) => {
        if (c1 && c2 && c.id === c1.id) {
          return {
            ...c,
            created_at: c2.created_at,
          };
        } else if (c1 && c2 && c.id === c2.id) {
          return {
            ...c,
            created_at: c1.created_at,
          };
        }
        return c;
      })
    );
    if (props.updateTabIndex) {
      props.updateTabIndex();
    }
  } else if (response.status === 500) {
    props.setLoading(false);
    props.setErrorMessage("Internal server error");
  }
}
