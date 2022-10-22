import React,{useEffect} from "react";
import { getChannels } from "../store/actions/article";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";

const Channel = ({width,value,onChange}) => {
    const dispatch = useDispatch()
    const { channels } = useSelector(state => state.article)
    useEffect(() => {
        dispatch(getChannels())
    }, [dispatch])
    return (
        <Select
            value={value}
              initialvalues=""
              style={width?{width}:null}
              onChange={(e)=>onChange(e)}
            >
              {channels.map(item=>(<Select.Option value={item.id} key={item.id} >{item.name}</Select.Option>))}
            </Select>
    )
}

export default Channel