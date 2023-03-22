import {
  Category,
  CreateCategoryData,
  deleteCategory,
  DeleteData,
  swap,
  SwapData,
  UpdateCategoryData,
} from "@/lib/data/categories";
import { CategoryInlineFormProps } from "./categoryInlineForm";
import {
  createCategory as dbCreateCategory,
  updateCategory as dbUpdateCategory,
} from "@/lib/data/categories";

interface UpdateProps extends CreateCategoryProps {
  categoryInEdit: Category;
}

export async function updateCategory(props: UpdateProps) {
  props.setCategoryTitle("");
  props.setLoading(true);
  try {
    const data: UpdateCategoryData = {
      categoryId: props.categoryInEdit.id,
      title: props.categoryTitle,
      userId: props.user.uid,
    };
    await dbUpdateCategory(data);
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
  } catch {
    props.setLoading(false);
    props.setEditedCategoryId("");
    props.setErrorMessage("Failed to update category");
  }
}

interface CreateCategoryProps extends CategoryInlineFormProps {
  categoryTitle: string;
  setCategoryTitle: (_t: string) => void;
  loading: boolean;
  setLoading: (_l: boolean) => void;
  setTabIndex: (_i: number) => void;
  categories: Category[];
  setCategories: (_c: Category[]) => void;
}

export async function createCategory(props: CreateCategoryProps) {
  props.setCategoryTitle("");
  props.setLoading(true);
  try {
    const data: CreateCategoryData = {
      title: props.categoryTitle,
      userId: props.user.uid,
    };
    const newCategory = await dbCreateCategory(data);
    props.setCategories([...props.categories, newCategory]);
    props.setLoading(false);
    props.setCreateNewCategory(false); // close the form
    props.setTabIndex(props.categories.length);
  } catch {
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
  props.setLoading(true);
  props.setCategoryIdToDelete(null);
  try {
    const data: DeleteData = {
      categoryId: props.categoryId,
      userId: props.userId,
    };
    await deleteCategory(data);
    props.setCategories(
      props.categories.filter((c) => c.id !== data.categoryId)
    );
    props.setLoading(false);
  } catch {
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
  props.updateTabIndex();
  try {
    const data: SwapData = {
      id1: props.id1,
      id2: props.id2,
      userId: props.userId,
    };
    const result = await swap(data);
    if (result) {
      const updatedCategories = props.categories.map((c) => {
        if (c.id === result.id1) {
          return { ...c, createdAt: result.createdAt1 };
        } else if (c.id === result.id2) {
          return { ...c, createdAt: result.createdAt2 };
        }
        return c;
      });
      props.setCategories(updatedCategories);
    }
  } catch {
    props.setErrorMessage("Failed to update the category order");
  }
}
