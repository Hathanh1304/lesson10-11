import { useEffect, useState } from 'react';
import './App.css';
import HQTCategory from './component/HQTCategory';
import axios from "./API/HQTAPI";
import HQTCategoryForm from './component/HQTCategoryFrom';


function HQTApp() {

  const [hqtCategories, sethqtCategories] = useState([]);

  const getCategories = async () => {
    try {
      const hqtCateResponse = await axios.get("HqtCategory");
      sethqtCategories(hqtCateResponse.data);
    } catch (error) {
      console.log("lỗi:", error);
    }
  }
  useEffect(() => {
    getCategories();
    console.log("HqtCategories:",hqtCategories);
  },)

  const [hqtCategoryIsForm, sethqtCategoryIsForm] = useState(false);
  let HqtCategoryInint = {
    hqtId:0,
    hqtCategoryName:"",
    hqtCategoryStatus:true
  }
const[hqtCategoryEdit, sethqtCategoryEdit] = useState(HqtCategoryInint);

  const hqtHandleAddNew = (param) => {
    sethqtCategoryIsForm(param);
  }
  const hqtHandleCategoryCloseForm = (param) => {
    sethqtCategoryIsForm(param);
  }
  const hqtHandleCategorySubmit = (param) => {
    let id = hqtCategories[hqtCategories.length - 1].hqtId;
    console.log("Mã:", id);
    param.hqtId = id + 1;
    hqtCategories.push(param);
    sethqtCategories((prev) => {
      return [...prev];
    })
    sethqtCategoryIsForm(false);
  }
  const hqtHandleDelete = (hqtId)=>{
    console.log("App-Delete-hqtId:",hqtId );
    //const hqtResponse = axios.delete(`https://66738bb86ca902ae11b4837f.mockapi.io/hqtApi/hqtv1/HqtCategory/${hqtId}`);
    const hqtResponse = axios.delete(`HqtCategory/${hqtId}`)
    console.log("hqtResponse-Delete", hqtResponse);
    let hqtDelete = hqtCategories.filter(x=>x.hqtId !== hqtId);
    sethqtCategories(hqtCategories);
    console.log("Delete:", hqtDelete)
  }
  const hqtHandleEdit = (hqtCategory)=>{
    sethqtCategoryEdit(hqtCategory)
    sethqtCategoryIsForm(true);
  }
  return (
    <div className="container border my-3">
      <h1>Ha Quoc Thanh - Call API</h1>

      <HQTCategory renderHQTCategories={hqtCategories}
        onAddNew={hqtHandleAddNew}
        onHqtDelete={hqtHandleDelete}
        onHqtEdit={hqtHandleEdit} />
      <hr />
      {
        hqtCategoryIsForm === true ? <HQTCategoryForm
        renderHQTCategory = {hqtCategoryEdit}
          oncloseForm={hqtHandleCategoryCloseForm}
          onCategorySubmit={hqtHandleCategorySubmit} /> : ""
      }

    </div>
  );
}
export default HQTApp;