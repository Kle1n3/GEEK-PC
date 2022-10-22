import React from 'react'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import {Result,Button} from 'antd'

const NotFound = () => {
  const history = useHistory()

  return (
    <Result
      style={{paddingTop:100}}    
      status='404'
      title='404'
      subTitle="Sorry,the page you visited does not exist."
      extra={
        <Button onClick={()=>history.replace('/')} type='primary'  >
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound