import React, { PureComponent } from 'react'
import { Row, Col, Table, Modal, Input } from 'antd';
import Axios from '../../util/axios'
import Api from '../../api/index'
import styles from './style.module.scss'
import {CheckOutlined} from '@ant-design/icons';

export default class CheckDiscuss extends PureComponent {
    constructor() {
        super();
        this.state = {
          discussInfo: [],
          loaded: true,
          entryInfo: [],
          visible: false,
          recordList: [
            {
                time: '14:00:05',
                img: '',
                name: '张全',
                content: '2222eu接口熟练了绿绿绿绿绿绿所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所222'
            },
            {
                time: '14:10:05',
                img: '',
                name: '张三',
                content: '3333'
            },
            {
                time: '14:20:08',
                img: '',
                name: '李四',
                content: '22224444222'
            },
            {
                time: '14:30:00',
                img: '',
                name: '张全',
                content: '55555555'
            },
            {
                time: '14:35:05',
                img: '',
                name: '张三',
                content: '3333'
            },
        ],
          showList: []
        }
      }
    componentWillMount(){
        // console.log(this.props.location.state)
        this.setState ({
            discussInfo: this.props.location.state,
          })
    }
    // 调接口
    getEntryInfo(values) {
    Axios({
      url: '',
      data: '',
      method: 'post',
    })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          // this.setState.loaded = true
          this.setState({
            entryInfo: res.data.data,
            loaded: true,
          })
        } else {
        }
      })
    }

    bindList(showList){
        let ShowList=showList.map((item,index)=>{
            return <div key={index}>
                        <Row gutter={[0, 5]}>
                            <Col span={4}>
                                <div className = {styles.left}>
                                    <div className = {styles.img}>
                                        <img src={item.img} alt=""/>
                                    </div>
                                    <p>{item.name}</p>
                                </div>
                            </Col>
                            <Col span={20}>
                                <div className = {styles.right}>
                                    <span>{item.time}</span>
                                    <span>{item.content}</span>
                                </div>
                            </Col>
                        </Row>   
                    </div>
        });
        return ShowList;
    }
    UNSAFE_componentWillMount() {
        this.getEntryInfo();

        let showList=this.bindList(this.state.recordList);
        this.setState({
            showList:showList
        })
    }

    /* 探讨内容弹框 */
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
      
    render() {
        const { Search } = Input;
        const {discussInfo} = this.state
        const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              width: 150,
            },
            {
              title: '性别',
              dataIndex: 'age',
              key: 'age',
              width: 80,
            },
            {
              title: '职称',
              dataIndex: 'staff',
              key: 'staff',
              ellipsis: true,
            },
            {
              title: '报名时间',
              dataIndex: 'time',
              key: 'time',
              ellipsis: true,
            },
            {
              title: '参与讨论',
              dataIndex: 'jion',
              render: text => text=='是'?<CheckOutlined />:'',
              key: 'jion',
              ellipsis: true,
            }
          ];
        const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            staff: '医师',
            time: 'New York',
            jion: '是',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            staff: '医师',
            time: 'London No',
            jion: '否',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            staff: '医师',
            time: 'Sidney No',
            jion: '是',
            
        },
        ];
        return (
            <div className={styles.check}>
                <div>   
                    <Row gutter={[0, 20]}>
                        <Col span={24}>
                            <div className={styles.title}>
                                <h1>病历探讨信息</h1> 
                                <span>探讨主题：
                                <span>{discussInfo.discussName}</span>
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[0, 20]}>
                        <Col span={7} style={{textAlign:'center'}}>
                            <span>主持人：</span>
                            <span>{discussInfo.host}</span>
                        </Col>
                        <Col span={17}>
                            <span>参会医生：</span>
                            <span>{discussInfo.inviteGuests}</span>
                        </Col>
                    </Row>
                    <Row gutter={[0, 20]}>
                        <Col span={7} style={{textAlign:'center'}}>
                            <span>探讨开始时间：</span>
                            <span>{discussInfo.discussStart}</span>
                        </Col>
                        <Col span={6}>
                            <span>探讨持续时间：</span>
                            <span>{discussInfo.continueTime*60}分钟</span>
                        </Col>
                        <Col span={11}>
                            <span>报名时间：</span>
                            <span>{discussInfo.enrollStart}至{discussInfo.enrollEnd}</span>
                        </Col>
                    </Row>
                    <Row gutter={[0, 20]}>
                        <Col span={7} style={{textAlign:'center'}}>
                            <span>费用类型：</span>
                            <span>{discussInfo.moneyType}</span>
                        </Col>
                        <Col span={6}>
                            <span>探讨费用：</span>
                            <span>{discussInfo.AttendMoney}核桃币</span>
                        </Col>
                        <Col span={7}>
                            <span>患者信息：</span>
                            <span>{discussInfo.patietInfo}</span>
                        </Col>
                        <Col span={4}>
                            <a href="javascript:void(0)" onClick={this.showModal}>探讨内容-记录</a>
                        </Col>
                        
                    </Row>
                    <Row className={styles.line}>
                        <Col span={2}>
                            <span>探讨说明：</span>
                        </Col>
                        <Col span={22}>
                            <span>{discussInfo.explain}</span>
                        </Col>
                    </Row>
                </div>
                <div className={styles.table}>
                    <Row gutter={[0, 20]}>
                        <Col span={24}>
                            <h1>病历探讨报名信息</h1>
                        </Col>
                        <Col span={14} offset={5}>
                            {this.state.loaded && ( <Table columns={columns} bordered  rowKey="key" size="middle" dataSource={data} />)}  
                        </Col>
                    </Row>
                </div>
                {this.state.visible && <Modal
                    title={[<div key={1} style={{height:'40px'}}>
                        <h3>{discussInfo.discussName}</h3>
                        <h3>探讨内容</h3>
                    </div>]}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className = {styles.checkBox}
                    footer = {null}
                >
                    <div className = {styles.div}>
                        <Search
                            enterButton="搜索"
                            size="small"
                            onSearch={value => console.log(value)}
                        />
                    </div>
                    <div className = {styles.list}>
                        {this.state.showList}
                    </div>
                </Modal>}
            </div>
        )
    }
}
