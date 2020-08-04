import React, { PureComponent } from 'react';
import { Table } from 'antd';
import Axios from 'axios';
import { Select } from 'antd';
import   './banner.moudle.scss';
import { DatePicker } from 'antd';
import { Button,Space} from 'antd';


const { RangePicker } = DatePicker;

const { Option } = Select;
const columns = [
  {
    title: 'bannner图',
    width: 100,
    dataIndex: 'banner_Url',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '内容类型',
    width: 100,
    dataIndex: 'active',
    key: 'age',
    fixed: 'left',
    render(text) {
      if(text==0){
        return "患教活动"
      }else if(text==1){
        return "病历探讨"
      }else if(text==2){
        return "h5活动"
      }
      
    },
  },
  {
    title: '位置',
    dataIndex: 'banner_Loacl',
    key: '1',
    width: 150,
  },
  {
    title: '展示端',
    dataIndex: 'exhibition_End',
    key: '2',
    width: 150,
    render(text) {
      if(text==0){
        return "医生端"
      }else if(text==1){
        return "患者端"
      }else if(text==2){
        return "医生，患者端"
      }
      
    },
  },
  {
    title: '创建时间',
    dataIndex: 'Creation_Time',
    key: '3',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'banner_State',
    key: '4',
    width: 150,
    render(text) {
      if(text==0){
        return "已发布"
      }else if(text==1){
        return "未发布"
      }else if(text==2){
        return "下架"
      }
      
    },
  },

  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () =>
      <Space size="middle">
        <a>查看</a>
        <a>编辑</a>
      </Space>,
    
  },
];



class bannerManage extends PureComponent {
  constructor(props){
    super(props);
    
  }
  state={
    data:[],
    active:'0'
  }
  componentDidMount(){
    const _this=this; 
    Axios.get('https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59/api/bannerManage')
    .then(function (response) {
      _this.setState({
        data:response.data.data.bannerInfo
      });
      
    })
    .catch(function (error) {
 
      // _this.setState({
       
      // })
    })
  }
  handleChange=(e)=>{
    console.log(e)
    this.setState({ active: e })
  }
  _search(){
    const _this=this; 
    Axios.get('https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59/api/bannerManage')
    .then(function (response) {
      // console.log(response)
      _this.setState({
        data:response.data.data.bannerInfo
      });
      
    })
    .catch(function (error) {
 
      // _this.setState({
       
      // })
    })
  }
  render() {
    // console.log(this.state.data)
    const { active } = this.state
    const data=this.state.data
    return (
      <div className='banner'>
        <div className='test1'>
          <Select value={active} className='select-active' style={{ width: 120 }} onChange={this.handleChange}>
                内容类型<Option  value="0" >患教活动</Option>
                创建时间<Option value="1" >病历探讨</Option>
                <Option value="2">h5活动</Option>
          </Select>

        
          <RangePicker showTime className='time-select' />


          <Button className='button1'>重置</Button>
          <Button className='button1' onClick={this._search}>搜索</Button>
             
        </div>
        <div className='test2'>
          <Button className='button2'>新增</Button>
        </div>
            
          <Table rowKey='banner_Id' columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />,
      </div>
    )
  }
}



export default bannerManage
