import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setCategories } from "../../store/categories/categories.actions";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview";
import Category from '../category'

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function dispatchCategories() {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray))
    }
    dispatchCategories();
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  )
}
