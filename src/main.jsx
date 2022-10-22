import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';
import App from './App'
import 'antd/dist/antd.css';
import './index.scss'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import {ConfigProvider} from 'antd'


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ConfigProvider locale={locale} >
            <App />
        </ConfigProvider>
    </Provider>
)