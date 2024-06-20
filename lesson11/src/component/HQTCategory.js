import React from 'react'

export default function HQTCategory({ renderHQTCategories, onAddNew, onHqtDelete, onHqtEdit }) {
    console.log("renderHQTCategories: ", renderHQTCategories);
    let hqtCategoriesElement = renderHQTCategories.map((HqtCategory,index)=>{
        return(
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{HqtCategory.hqtId}</td>
                <td>{HqtCategory.hqtCategoryName}</td>
                <td>{HqtCategory.hqtCategoryStatus===true?"Hiển Thị":"Tạm Khóa"}</td>
                <td>
                    <button className ='btn btn-danger' 
                    onClick={()=>hqtHandleDelete(HqtCategory.hqtId)} >
                         Delete 
                         </button>
                         <button className ='btn btn-success'
                         onClick={()=>hqtHandleEdit(HqtCategory)} >
                            Edit
                         </button>
                </td>
            </tr>
        )
    })
    const hqtHandleDelete = (hqtId)=> {
        if(window.confirm('Ban co thuc su muon xoa category co ma' +hqtId+'khong')){
            console.log("Delete:",hqtId);
            onHqtDelete(hqtId)
        }else{

        }
    }
    const hqtHandleEdit = (hqtCategory)=>{
        onHqtEdit(hqtCategory);
    }
    const hqtHandleAdd = ()=>{
        onAddNew(true);
    }
    return (
        <div className='container m-2'>
            <h2>Danh Sách Loại Sản Phẩm</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {hqtCategoriesElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={hqtHandleAdd}>Thêm Mới</button>
        </div>
    )
}