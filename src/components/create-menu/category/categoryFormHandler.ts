import {
  Category,
  CreateCategoryData,
  DeleteData,
  SwapData,
  SwapResult,
  UpdateCategoryData,
} from "@/lib/data/categories";
import { CategoryFormProps } from "./categoryForm";

interface UpdateProps extends CreateCategoryProps {
  categoryInEdit: Category;
}

export async function updateCategory(props: UpdateProps) {
  const data: UpdateCategoryData = {
    categoryId: props.categoryInEdit.id,
    title: props.categoryTitle,
    userId: props.user.uid,
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
    props.setLoading(false);
    props.setEditedCategoryId(""); // close the form
  } else if (response.status === 500) {
    props.setLoading(false);
    props.setEditedCategoryId("");
    props.setErrorMessage("Failed to update category");
  }
}

interface CreateCategoryProps extends CategoryFormProps {
  categoryTitle: string;
  setCategoryTitle: (_t: string) => void;
  loading: boolean;
  setLoading: (_l: boolean) => void;
  setTabIndex: (_i: number) => void;
  categories: Category[];
  setCategories: (_c: Category[]) => void;
}

export async function createCategory(props: CreateCategoryProps) {
  const data: CreateCategoryData = {
    title: props.categoryTitle,
    userId: props.user.uid,
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
    const result: Category = await response.json();
    props.setCategories([...props.categories, result]);
    props.setLoading(false);
    props.setCreateNewCategory(false); // close the form
    props.setTabIndex(props.categories.length);
  } else if (response.status === 500) {
    props.setLoading(false);
    props.setCreateNewCategory(false);
    props.setErrorMessage("Failed to create category");
  }
}

interface DeleteProps {
  categoryId: string;
  categories: Category[];
  setCategories: (_c: Category[]) => void;
  userId: string;
  setErrorMessage: (_s: string) => void;
  setLoading: (_b: boolean) => void;
  setCategoryIdToDelete: (_s: string | null) => void;
}

export async function handleDelete(props: DeleteProps) {
  const data: DeleteData = {
    categoryId: props.categoryId,
    userId: props.userId,
  };
  const JSONdata = JSON.stringify(data);
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
    props.setCategories(
      props.categories.filter((c) => c.id !== data.categoryId)
    );
    props.setLoading(false);
  } else if (response.status === 500) {
    props.setLoading(false);
    props.setErrorMessage("Failed to delete category");
  }
}

interface SwapProps {
  id1: string;
  id2: string;
  userId: string;
  categories: Category[];
  setCategories: (_c: Category[]) => void;
  updateTabIndex: () => void;
  setErrorMessage: (_s: string) => void;
}

export async function swapDates(props: SwapProps) {
  const data: SwapData = {
    id1: props.id1,
    id2: props.id2,
    userId: props.userId,
  };
  const JSONdata = JSON.stringify(data);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };
  props.updateTabIndex();
  const response = await fetch("/api/category/swap", options);
  if (response.status === 200) {
    const result: SwapResult = await response.json();
    const updatedCategories = props.categories.map((c) => {
      if (c.id === result.id1) {
        return { ...c, createdAt: result.createdAt1 };
      } else if (c.id === result.id2) {
        return { ...c, createdAt: result.createdAt2 };
      }
      return c;
    });
    props.setCategories(updatedCategories);
  } else if (response.status === 500) {
    props.setErrorMessage("Failed to update the category order");
  }
}
