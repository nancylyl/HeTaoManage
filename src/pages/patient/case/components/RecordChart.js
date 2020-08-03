import React, { Component } from 'react'
import styles from '../style.module.scss'
import Axios from '../../../../util/axios'
import Api from '../../../../api/index'
import { Card } from 'antd'
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'

const data = {
  "dataX": ['11-07', '11-08', '11-09', '11-10', '11-11', '11-12', '11-13'],
  "dataY": [8, 2, 1, 2, 2, 3, 5],
}
export class RecordChart extends Component {
  state = {
    dataX: [],
    dataY: [],
    loaded: false
  }
  componentDidMount() {
    console.log(this.props);
    this.init(this.props.flag)

  }

  init(flag) {
    // 获取case数据，根据id
    Axios({
      url: Api.addCase.getCaseRecord,
      method: "get",
      params: { flag: flag }
    })
      .then((res) => {
        const data = res.data.data.dataList;
        console.log(data);
        if (data.success) {
          this.setState({
            dataX: data.dataX,
            dataY: data.dataY,
            loaded: true
          })
        }

      })
      .finally((e) => {
        // console.log(e);
      })
  }
  /* 获取数据 */


  getOption = () => {

    const { dataX, dataY } = this.state
    const option = {
      title: {
        text: '发作次数'
      },
      tooltip: {
        // triggerOn: 'none',
        formatter: function (params) {
          return '日期: ' + params.name + '<br>次数: ' + params.value;
        }
      },
      xAxis: {
        type: 'category',
        data: this.state.dataX
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.state.dataY,
        type: 'line'
      }]

    }
    return option;
  }


  render() {

    return (
      this.state.loaded && <ReactEcharts
        option={this.getOption()}
        style={{ height: '350px', width: '1000px' }}
        className='react_for_echarts' />
    );


  }
}

export default RecordChart
