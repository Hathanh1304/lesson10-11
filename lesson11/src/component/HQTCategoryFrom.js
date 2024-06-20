import React, { useEffect, useState } from 'react'
import axios from "../API/HQTAPI";

export default function HQTCategoryForm({ oncloseForm, onCategorySubmit, renderHQTCategory }) {
    //state 
    const [hqtId, sethqtId] = useState("");
    const [hqtCategoryName, sethqtCategoryName] = useState("");
    const [hqtCategoryStatus, sethqtCategoryStatus] = useState(true);

    useEffect(() => {
        sethqtId(renderHQTCategory.hqtId);
        sethqtCategoryName(renderHQTCategory.hqtCategoryName);
        sethqtId(renderHQTCategory.hqtCategoryStatus);
    });
    const hqtHandleClose = () => {
        oncloseForm(false);
    }
    const hqtHandleSubmit = async (event) => {
        event.preventDefault();
        if (hqtId === 0) { //them
            let HqtCategory = {
                hqtId: 0,
                hqtCategoryName: hqtCategoryName,
                hqtCategoryStatus: hqtCategoryStatus
            }
            console.log("HqtCateogry", HqtCategory);
            await axios.post("hqtCategory", HqtCategory);
            onCategorySubmit(HqtCategory);
        } else {//sua
            let HqtCategory = {
                hqtId: hqtId,
                hqtCategoryName: hqtCategoryName,
                hqtCategoryStatus: hqtCategoryStatus
            }
            await axios.put("hqtCategory", HqtCategory);
            onCategorySubmit(HqtCategory);
        }
    }
    return (
        <div>
            <form>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" class="form-control" name='hqtCategoryName'
                        value={hqtCategoryName}
                        onChange={(ev) => sethqtCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Status</span>
                    <select className='form-control'
                        name='hqtCategoryStatus'
                        value={hqtCategoryStatus}
                        onChange={(ev) => sethqtCategoryStatus(ev.target.value)}>
                        <option value={true}>Hiển Thị</option>
                        <option value={false}>Tạm Khóa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={hqtHandleSubmit}>Ghi Lại</button>
                <button className='btn btn-success' onClick={hqtHandleClose}>Đóng</button>
            </form>
        </div>
    )
}