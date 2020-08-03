import React, { PureComponent } from 'react';
import { Table } from 'antd';
import Axios from 'axios';
import { Select } from 'antd';
import   './rechargeManage.moudle.scss';
import { DatePicker } from 'antd';
import { Button,Input } from 'antd';


const { RangePicker } = DatePicker;

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const columns = [
  {
    title: '充值名称',
    width: 100,
    dataIndex: 'rechargeManage_Type',
    key: 'name',
    fixed: 'left',
    render(text, record) {
      console.log(record.rechargeManage_Money)
      if(record.rechargeManage_Money==0){
        return "月卡"
      }else if(record.rechargeManage_Money==1){
        return "季卡"
      }else if(record.rechargeManage_Money==2){
        return "半年卡"
      }
      else if(record.rechargeManage_Money==3){
        return "年卡"
      }
      
    },
  },
  {
    title: '充值金额',
    width: 100,
    dataIndex: 'rechargeManage_Money',
    key: 'age',
    fixed: 'left',
    render(text) {
      if(text==0){
        return "100"
      }else if(text==1){
        return "300"
      }else if(text==2){
        return "600"
      }
      else if(text==3){
        return "1200"
      }
      
    },
  },
  {
    title: '每日给予医生核桃币数',
    width: 100,
    dataIndex: 'rechargeManage_Hetao',
    key: 'age',
    fixed: 'left',
    render(text,record) {
      if(record.rechargeManage_Money==0){
        return "2"
      }else if(record.rechargeManage_Money==1){
        return "3"
      }else if(record.rechargeManage_Money==2){
        return "3.5"
      }
      else if(record.rechargeManage_Money==3){
        return "4"
      }
      
    },
  },
  {
    title: '累计充值金额',
    dataIndex: 'rechargeManage_TotalMoney',
    key: '2',
    width: 150,
  
  },
  {
    title: '累计给予医生核桃币数',
    dataIndex: 'rechargeManage_TotalHetao',
    key: '2',
    width: 150,
  },
  {
    title: '会员有效期',
    dataIndex: 'VIP_time',
    key: '4',
    width: 150,
    render(text,record) {
      if(record.rechargeManage_Money==0){
        return "30天"
      }else if(record.rechargeManage_Money==1){
        return "90天"
      }else if(record.rechargeManage_Money==2){
        return "180天"
      }else if(record.rechargeManage_Money==3){
        return "365天"
      }
      
    },
  },

  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () =>
     <a>删除</a>,
  },
];



class rechargeManage extends PureComponent {
  constructor(props){
    super(props);
    
  }
  state={
    data:[]
  }
  componentDidMount(){
    const _this=this; 
    Axios.get('https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59/api/rechargeManage')
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
  render() {
    // console.log(this.state.data)
    const data=this.state.data
    return (
      <div className='banner'>
        <div className='test1'>
          <Select placeholder="充值类型" className='select-active' style={{ width: 120 }} onChange={handleChange}>
                <Option  value="月卡">月卡</Option>
                <Option value="季卡">季卡</Option>
                <Option value="半年卡">半年卡</Option>
                <Option value="年卡">年卡</Option>
          </Select>

        
          <RangePicker showTime className='time-select' />


          <Button className='button1'>重置</Button>
          <Button className='button1'>搜索</Button>
             
        </div>
        <div className='test2'>
          <Button className='button2'>新增</Button>
        </div>
            
          <Table rowKey='rechargeManage_Id' columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />,
      </div>
    )
  }
}



export default rechargeManage
