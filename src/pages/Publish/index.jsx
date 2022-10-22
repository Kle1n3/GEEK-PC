import React, { useEffect, useState } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Upload,
  Button,
  Input,
  Space,
  message,
  Modal
} from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import Channel from "../../components/Channel";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch } from "react-redux";
import { addArticle,getArticleInfo } from "../../store/actions/article";


const Publish = () => {
  const dispatch = useDispatch()
  // 完成封面类型渲染和切换
  const [type, setType] = useState(1);
  const onTypeChange = (e) => {
    setType(e.target.value);
    setFileList([]);
  };
  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }) => setFileList(fileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const history = useHistory()
  const onFinish = async (values,draft=false) => {
    if (type !== fileList.length) {
        return message.warning('请按照选择的封面类型上传图片')
    }
    const data = {
      ...values,
      cover: {
        type,
        images:fileList.map(item=>item.response.data.url)
      }
    }
    if (params.id) {
      data.id = params.id
      await dispatch(addArticle(data,draft))
    }
    else {
      await dispatch(addArticle(data,draft))
    }
    
    message.success('添加成功')
    history.push('/home/article')
  };
  
  // 图片预览
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  
  const [form] = Form.useForm()
  // 存为草稿
  const saveDraft = async () => {
    try {
      const values = await form.validateFields()
      onFinish(values,true)
    } catch (error) {
      console.log(error);
    }
  }

  // 编辑文章时回显文章信息
  const params = useParams()
  useEffect(() => {
    const setFormData = async () => {
      if (params.id) {
        const { title, cover, content, channel_id } = await dispatch(getArticleInfo(params.id))
        console.log(title,cover,content,channel_id);
        form.setFieldsValue({ title: title,content: content,channel_id: channel_id })
        setType(cover.type)
        setFileList(cover.images.map(item=>({url:item})))
      }
    }
    setFormData()
  },[dispatch,form])
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/home/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{params.id?'修改文章':'发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 6,
          }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="文章标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入文章标题",
              },
            ]}
          >
            <Input style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="所属频道"
            name="channel_id"
            rules={[
              {
                required: true,
                message: "请选择所属频道",
              },
            ]}
          >
            <Channel width={400} />
          </Form.Item>
          <Form.Item
            label="文章封面"
          >
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  action="http://geek.itheima.net/v1_0/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={onUploadChange}
                >
                  {fileList.length >= type ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            label="文章内容："
            name="content"
            rules={[{required:true,message:'请输入文章内容'}]}
            wrapperCol={{ span: 16 }}
            initialValue=""
          >
            <ReactQuill placeholder="请输入文章内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {params.id?'修改文章':'发表文章'}
              </Button>
              <Button type="primary" onClick={saveDraft} >
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
