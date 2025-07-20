import { supabase } from "@/lib/supabase"

export const getItems = async () => {
  const { data, error } = await supabase
    .from('items')
    .select('*, categories(category)')
    .order('name')

  if (error) throw error


  const formattedData = data.map(item => ({
    ...item,
    category: item.categories.category
  }));

  return formattedData;
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('category')

  if (error) throw error;

  const categories = data.map(category => category.category);
  return ["All", ...categories];
}