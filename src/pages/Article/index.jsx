import React,{ useState,useEffect,useRef } from 'react'
import styles from './index.module.scss'
import { Form, Button, Card, Breadcrumb,Radio,DatePicker,Table, Space,Image,Tag, message,Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link,useHistory } from 'react-router-dom'
import 'moment/locale/zh-cn'
import locale from "antd/es/date-picker/locale/zh_CN";
import { useSelector,useDispatch } from 'react-redux';
import { setArticles,deleteArticle } from '../../store/actions/article';
import defaultImg from "../../assets/error.png";
import Channel from '../../components/Channel';

const Article = () => {
  const params = useRef({
    page: 1,
    per_page: 20,
    channel_id: undefined,
    status: undefined,
    begin_pubdate: undefined,
    end_pubdate:undefined
  })
  const { RangePicker } = DatePicker
  const statusLabel = [
    {text:'草稿',color:'default'},
    {text:'待审核',color:'blue'},
    {text:'审核通过',color:'green'},
    {text:'审核拒绝',color:'red'},
  ]
  const columns = [
    {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    render: (cover) => (
        <Image
        src={cover?.images?.[0] || defaultImg}
        style={{ objectFit: "cover" }}
        width={200}
        height={120}
        />)
    },
    {
    title: '标题',
    dataIndex: 'title',
    key:'title'
    },
    {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
      render: (status) => {
        const info = statusLabel[status]
        return <Tag color={info.color} >{info.text}</Tag>
      }
    },
    {
    title: '发布时间',
    dataIndex: 'pubdate',
    key:'pubdate'
    },
    {
    title: '阅读数',
    dataIndex: 'read_count',
    key:'read_count'
    },
    {
    title: '评论数',
    dataIndex: 'comment_count',
    key:'comment_count'
    },
    {
    title: '点赞数',
    dataIndex: 'like_count',
    key:'like_count'
    },
    {
    title: '操作',
    key: 'action',
    render: (text,record) => (
        <Space size='middle'>
          <Button type='link' onClick={()=>editArticle(record.id)} icon={<EditOutlined/>} ></Button>
          <Button onClick={()=>DeleteArticle(record.id)} type='link' icon={<DeleteOutlined/>} ></Button>
      </Space>
    )
    },
  ]
  const dispatch = useDispatch()
  const {results,total_count,per_page,page} = useSelector(state => state.article)
  useEffect(() => {
    dispatch(setArticles({page:params.current.page}))
  }, [dispatch])
  
  const onShowSizeChange = (current, pageSize) => {
    params.current.page = current
    params.current.pageSize= pageSize
    dispatch(setArticles(params.current))
  }

  const onFinish = (values) => {
    params.current.status = values.status
    params.current.channel_id = values.channel_id
    if (values.dateArr) {
      params.current.begin_pubdate = values.dateArr[0].format('YYYY-MM-DD HH:mm:ss')
      params.current.end_pubdate = values.dateArr[1].format('YYYY-MM-DD HH:mm:ss')
    }
    else {
      params.current.begin_pubdate =null
      params.current.end_pubdate =null
    }
    dispatch(setArticles(params.current))
  }
  const {confirm} = Modal
  const DeleteArticle = (id) => {
    confirm({
      title: '您是否确认删除该文章？',
      cancelText: '取消',
      okText: '确认',
      onOk: async () => {
        await dispatch(deleteArticle(id))
        await dispatch(setArticles(params.current))
        message.success('删除成功')
      }
    })
    
  }
  
  const history = useHistory()
  const editArticle = id => {
    history.push(`/home/publish/${id}`)
  }
  return (
    <div className={styles.root} >
      <Card title={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/' >首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
        </Breadcrumb>
      } >
        <Form onFinish={onFinish} >
          <Form.Item label='状态：' name='status' >
            <Radio.Group>
              <Radio value={undefined} >全部</Radio>
              <Radio value={0} >草稿</Radio>
              <Radio value={1} >待审核</Radio>
              <Radio value={2} >已通过</Radio>
              <Radio value={3} >已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='频道：' name='channel_id' >
            <Channel width={288} />
          </Form.Item>
          <Form.Item label='日期：' name='dateArr' >
              <RangePicker locale={locale} />
          </Form.Item>
          <Form.Item >
            <Button type='primary' htmlType='submit'  >筛选</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到${total_count}条结果`} style={{marginTop:24}} >
        <Table columns={columns} dataSource={results.map(item => ({
          ...item,
          key:item.id
        }))} pagination={{defaultCurrent:1,total:total_count,current:page,pageSize:per_page,onChange:onShowSizeChange}} ></Table>
      </Card>
    </div>
  )
}

export default Article