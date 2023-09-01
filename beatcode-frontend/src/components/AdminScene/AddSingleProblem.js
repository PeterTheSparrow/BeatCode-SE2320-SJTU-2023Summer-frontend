import React, {useMemo, useState} from "react";
import {Button, Col, ColorPicker, Form, Input, message, Modal, Select, Space, Tag, Upload} from "antd";
import MdEditor from "react-markdown-editor-lite";
import {InboxOutlined} from "@ant-design/icons";
import MarkdownIt from "markdown-it";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

function AddSingleProblem() {

  /*
  * 题目的信息包括：
  * 1. problemId
  * 2. title
  * 3. detail 题干的markdown格式
  * 4. difficulty
  * 5. tags 标签数组：每个tag包含：name, description, color
  * */

  ////////////////////////////////// 存储的基本信息 /////////////////////////////////////////////////////
  const [problemId, setProblemId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);

  const [isbannedUploadingFile, setIsbannedUploadingFile] = React.useState(true);



  /////////////////////////////// 上传题目样例文件 /////////////////////////////////////////////////////

  const { Dragger } = Upload;

  // props是上传文件的配置
  const props = {
    disabled: isbannedUploadingFile,
    name: 'file',   // 后端接收的参数名
    multiple: false, // 是否支持多选文件
    action: 'ipads.se.sjtu.edu.cn', // 上传的地址 TODO 修改为后端接口

    // onChange(info): 上传文件的回调函数
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    // onDrop(e): 拖拽文件的回调函数
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  ////////////////////////////// 题目信息的初始化 /////////////////////////////////////////////////////

  // 初始化：从后端获取题目信息
  React.useEffect(() => {
    // TODO: 从后端获取题目信息
  } ,[]);

  const handleEditorChange = ({ html, text }) => {
    console.log('handleEditorChange', html, text)
    // TODO 将text存储到detail中
  }

  ////////////////////////////////// tag的编辑 /////////////////////////////////////////////////////
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // showModal是点击add按钮后的回调函数，用于显示对话框
  const showModal = () => {
    setIsModalVisible(true);
  };

  // handleCancel是点击对话框右上角的x后的回调函数，用于关闭对话框
  const handleCancel = () => {
    setIsModalVisible(false);   // 关闭对话框
    setSelectedTag(null);   // 清空selectedTag
    form.resetFields(); // 重置表单
  };

  // handleOk是点击对话框的确定按钮后的回调函数，用于提交表单
  const handleOk = () => {
    console.log("name", name);
    // console.log("color", color);
    console.log("color", hexString);
    console.log("description", description);
    // 如果任何一个字段为空，则不提交表单
    if (name === "" || hexString === "" || description === "") {
      message.error("请填写完整的标签信息！");
      return;
    }

    // 打包values
    const values = {
      name: name,
      color: hexString,
      description: description
    }

    // 如果selectedTag不为空，则说明是修改标签
    if (selectedTag) {


      // Update existing tag
      setTags((prevTags) =>
          prevTags.map((tag) =>
              tag.id === selectedTag.id ? { ...tag, ...values } : tag
          )
      );


    }
    // 如果selectedTag为空，则说明是添加标签
    else {
      // Add new tag
      const newTag = { ...values, id: Date.now() };
      setTags((prevTags) => [...prevTags, newTag]);

    }

    form.resetFields(); // 重置表单
    setIsModalVisible(false);
    setSelectedTag(null);   // 清空selectedTag

    // 清空name, description
    setName("");
    setDescription("");



  };

  // handleEditTag是点击标签后的回调函数，用于编辑标签
  const handleEditTag = (tag) => {
    setSelectedTag(tag);
    // form.setFieldsValue(tag);
    setName(tag.name);
    setColorHex(tag.color);
    setDescription(tag.description);

    // 设置form的初始化值
    form.setFieldsValue({
      name: tag.name,
      color: tag.color,
      description: tag.description
    } );
    showModal();
  };

  const [colorHex, setColorHex] = useState('#1677ff');

  const [formatHex, setFormatHex] = useState('hex');
  const hexString = useMemo(
      () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
      [colorHex],
  );


  // handleDeleteTag是点击标签右上角的x后的回调函数，用于删除标签
  const handleDeleteTag = (tagId) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));

    // TODO for debug：打印所有的tag
    console.log(tags);
  };

  const handleSubmit = (values) => {
    console.log(values);
    console.log(tags)
  }



  return (
      <div>
        <div
            style={{
              height: 50,
            }}
        >

        </div>
        <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 1200,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
        >
          {/*problemId是不可修改的，因此这个框是禁止编辑的*/}
          <Form.Item
              label="problemId"
              name="problemId"
              rules={[
                {
                  // required: true,
                  // message: 'Please input problemId!',
                } ,
              ]}
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
              label="title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input title!',
                } ,
              ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label="detail"
              name="detail"
              rules={[
                {
                  required: true,
                  message: 'Please input detail!',
                } ,
              ]}
          >
            <MdEditor style={{
              height: '500px',
              width: '100%'
            }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
          </Form.Item>

          {/*    标签使用tag组件*/}
          {/*    1. add按钮，点击后弹出对话框，输入标签的信息；颜色使用颜色选择器*/}
          {/*    2. 所有生成的标签都通过tag组件实时渲染*/}
          {/*    3. 点击标签，可以修改标签的信息*/}
          {/*    4. 点击标签右上角的x，可以删除标签*/}
          <Form.Item
              label="Tags"
              name="tags"
          >
            <Space wrap>
              {tags.map((tag) => (
                  // tag用最大的size
                  <Tag
                      key={tag.id}
                      closable
                      color={tag.color}
                      onClose={() => handleDeleteTag(tag.id)}
                      onClick={() => handleEditTag(tag)}
                      style={{ fontSize: '13px', padding: '3px 6px' }}
                  >
                    {tag.name}
                  </Tag>

              ))}
            </Space>
            <Button onClick={showModal}>Add Tag</Button>
          </Form.Item>

          <Modal
              visible={isModalVisible}
              onCancel={handleCancel}
              onOk={handleOk}
              title={selectedTag ? 'Edit Tag' : 'Add Tag'}
          >
            <Form
                form={form}
            >
              <Form.Item
                  label="name" name="name"
                  rules={[{ required: true, message: 'Please input tag name!' }]}
                  onChange={(e) => setName(e.target.value)}
              >
                <Input />
              </Form.Item>
              <Form.Item
                  label="color"
                  name="color"
                  rules={[{ required: true, message: 'Please select a color!' }]}
              >
                {/*    使用颜色选择器      */}
                <Space>
                  <Col>
                    <ColorPicker
                        format={formatHex}
                        value={colorHex}
                        onChange={setColorHex}
                        onFormatChange={setFormatHex}
                    />
                  </Col>
                  <Col>
                    HEX: <span>{hexString}</span>
                  </Col>
                </Space>
              </Form.Item>
              <Form.Item
                  label="description" name="description" rules={[{ required: true, message: 'Please input tag description!' }]}
                  onChange={(e) => setDescription(e.target.value)}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Form>

          </Modal>

          {/*难度使用选择器*/}
          <Form.Item
              label="difficulty"
              name="difficulty"
              rules={[
                {
                  required: true,
                  message: 'Please select difficulty!',
                } ,
              ]}
          >
            <Select
                placeholder="Select a difficulty"
                allowClear
            >
              {/*难度分为：入门、简单、中等、困难、省选/NOI-*/}
              <Select.Option value="入门">入门</Select.Option>
              <Select.Option value="简单">简单</Select.Option>
              <Select.Option value="中等">中等</Select.Option>
              <Select.Option value="困难">困难</Select.Option>
              <Select.Option value="省选/NOI-">省选/NOI-</Select.Option>
            </Select>
          </Form.Item>





          <Form.Item
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
          >
            {/*按钮在最右边*/}
            <Button
                type="primary"
                htmlType="submit"
                size={"large"}
                onClick={handleSubmit}

            >
              提交您的修改
            </Button>
          </Form.Item>

          {/*上传包含题目样例文件的压缩包*/}
          <Form.Item
              label="test cases"
              name="test cases"
              rules={[
                {
                  // required: true,
                  // message: 'Please upload test cases!',
                } ,
              ]}
              style={{
                marginTop: '50px',
              }}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
              <p className="ant-upload-hint">
                在此处上传测试样例的压缩文件；注意！请先提交题目，再上传测试样例！
              </p>
            </Dragger>
          </Form.Item>

        </Form>

        <div
            style={{
              height: 30,
            }}
        >

        </div>

      </div> );
}

export default AddSingleProblem;