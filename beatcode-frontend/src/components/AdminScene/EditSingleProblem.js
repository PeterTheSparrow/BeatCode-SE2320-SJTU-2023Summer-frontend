import React from 'react';
import SimpleMDEEditor from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

/**
 * @Description : 编辑单个题目（管理员）
 * */
function EditSingleProblem() {
    const options = {
        autofocus: true, // 自动聚焦
        hideIcons: ['preview', 'side-by-side'], // 隐藏预览、并排按钮
    }
    return (
        <div>
            <h1>EditSingleProblem</h1>
            <div
                style={{
                    marginLeft: 60,
                    marginRight: 60,
                    marginBottom: 30,

                }}
            >
                <SimpleMDEEditor
                    // 设置props
                    options={options}
                />
            </div>

        </div>
    );
}

export default EditSingleProblem;