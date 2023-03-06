import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchCategoriesStart } from "../../store/categories/categories.actions";
import CategoriesPreview from "../categories-preview";
import Category from '../category'

export default function Shop() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch((fetchCategoriesStart()))
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  )
}
