import React, { PureComponent } from 'react'
import echarts from 'echarts';

import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
// import { routerRedux } from 'dva/router';
import { geoCoordMap } from './geo';
import styles from './style.module.scss'
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
class mapManage extends PureComponent {
  // state = {
  //   loaded: false
  // }

  componentDidMount() {
    this.search(1);
  }

  search = (key) => {
    console.log(key);
    let url = "";
    if (key == 2) {
      url = Api.map.getWeekMyPatient
    } else {
      url = Api.map.getAllMyPatient
    }
    Axios({
      url: url,
    })
      .then((res) => {
        const data = res.data.data;
        //  console.log(data);

        this.initalECharts(data);
      })
      .finally(() => {
      })

  }
  initalECharts(provienceData) {

    echarts.registerMap('china', geoJson);
    for (const item of provienceData) {
      if (item.area === '东北大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#3CA2FC',
          },
          emphasis: {
            areaColor: '#3CA2FC',
          }
        }
      } else if (item.area === '华北大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#6CAFBE',
          },
          emphasis: {
            areaColor: '#6CAFBE',
          }
        }
      } else if (item.area === '华中大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#ADD03C',
          },
          emphasis: {
            areaColor: '#ADD03C',
          }
        }
      } else if (item.area === '华东大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#A13614',
          },
          emphasis: {
            areaColor: '#A13614',
          }
        }
      } else if (item.area === '华西大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#FFBA00',
          },
          emphasis: {
            areaColor: '#FFBA00',
          }
        }
      } else if (item.area === '华南大区') {
        item.itemStyle = {
          normal: {
            areaColor: '#FFD300',
          },
          emphasis: {
            areaColor: '#FFD300',
          }
        }
      } else if (item.area === '南海诸岛') {
        item.itemStyle = {
          normal: {
            borderColor: '#fff', // 区域边框颜色
            areaColor: '#fff', // 区域颜色
          },
          emphasis: {
            show: false,
            // borderColor: '#fff',
            // areaColor:"#fff",
          }
        }
      } else {
        item.itemStyle = {
          normal: {
            areaColor: '#D9D9D9',
          },
          emphasis: {
            areaColor: '#D9D9D9',
          }
        }
      }
    }
    const myChart = echarts.init(document.getElementById('mainMap'));
    myChart.setOption({
      tooltip: {
        show: false, // 不显示提示标签
        // formatter: '{b}', // 提示标签格式
        //鼠标放地图的某一块，显示的提示框
        formatter(params, ticket, callback) {
          //    console.log(params)
          return `${params.name}<br/>我的患者：${params.data.InValue}人`
        },
        backgroundColor: '#ff7f50', // 提示标签背景颜色
        textStyle: { color: '#fff' } // 提示标签字体颜色
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '10%',
        bottom: '10%',
        containLabel: true
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.2,
        tooltip: {
          show: false, // 不显示提示标签
        },
        label: {
          normal: {
            show: false, // 显示省份标签
            textStyle: { color: '#c71585' }// 省份标签字体颜色
          },
          emphasis: {// 对应的鼠标悬浮效果
            show: false,
            textStyle: { color: '#800080' }
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 0.5, // 区域边框宽度
            borderColor: '#000', // 区域边框颜色
            areaColor: '#ffefd5', // 区域颜色
            label: { show: false }
          },
          emphasis: {
            show: false,
            borderWidth: 0.5,
            borderColor: '#4b0082',
            areaColor: '#ffdead',
          }
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.convertData(provienceData),
          symbolSize: 1,
          symbolRotate: 40,
          label: {
            normal: {
              formatter: '{b}',
              position: 'top',
              show: true
            },
            emphasis: {
              show: false
            }
          },
          tooltip: {
            show: false, // 不显示提示标签
            // 显示提示的标签
            formatter(name) {
              return `Legend ${name}`;
            }, // 提示标签格式
            backgroundColor: '#fff', // 提示标签背景颜色
            borderColor: '#ccc',
            borderWidth: 5,
            textStyle: { color: '#000' } // 提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: 'black'
            }
          }
        },
        {
          type: 'map',
          mapType: 'china',
          roam: false,
          zoom: 1.2,
          tooltip: {
            show: false, // 不显示提示标签
          },
          label: {
            normal: {
              show: false // 显示省份标签
            },
            emphasis: {
              show: false,
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 0.5, // 区域边框宽度
              borderColor: '#fff', // 区域边框颜色
              label: { show: false }
            },
            emphasis: {
              show: false,
            }
          },
          // geoIndex: 0,
          //鼠标放入地图显示提示框
          tooltip: { show: true },
          data: provienceData
        }
      ],
    })

    // 鼠标放上颜色变红
    myChart.on('mouseover', params => {
      params.color = '#d50000'
      params.event.target.style.fill = '#d50000'
    });

    myChart.on('click', params => {
      this.props.history.push('/Dashboard/map2/' + params.name)
    });
  }

  convertData(data) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].area),
          area: data[i].area,
          type: data[i].type,
          InValue: data[i].InValue
        });
      }
    }
    return res;
  }

  convert() {
    return '1';
  }
  render() {
    return (
      <div>
        <h2 style={{ fontSize: 30, color: 'orange', textAlign: 'center', backgroundColor: '#f8f8f8', paddingTop: 10, paddingBottom: 10 }}>全国范围内我的患者</h2>

        <h4 className={styles.subtile}>
          全国所有患:10000  <Button type="primary" icon={<SearchOutlined />} onClick={() => {
            return this.search(1)
          }}>查看</Button>
        </h4>
        <h4 className={styles.subtile}>
          本周新增患者：80  <Button type="primary" icon={<SearchOutlined />} onClick={() => {
            return this.search(2)
          }}>查看</Button>
        </h4>
        <div className={styles.App}>
          <div id="mainMap" style={{ width: '100vm', height: '100vh', textAlign: 'center', margin: '0 atuo' }}></div>
        </div>
      </div>

    );
  }
}

export default mapManage