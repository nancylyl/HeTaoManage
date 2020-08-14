import React from 'react'
import './App.css'
import Login from './pages/Login/'
import Index from './pages/Home/'
// import PrivateRouter from './components/PrivateRouter'
import mapManage from './pages/patient/map/mapManage'
import patientListManage from './pages/patient/patientListManage'
import ADRsTipsManage from './pages/patient/ADRsTipsManage'

import hospitalManage from './pages/hospitalInfo/hospitalManage'
import checkHospital from './pages/hospitalInfo/checkHospital'
import doctorManage from './pages/hospitalInfo/doctorManage'
import checkDoctor from './pages/hospitalInfo/checkDoctor'

import activityManage from './pages/activity/activityManage'

import discussManage from './pages/discuss/discussManage'
import CheckDiscuss from './pages/discuss/CheckDiscuss'

import dealsInfoManage from './pages/dealsInfo/dealsInfoManage'
import bannerManage from './pages/banner/bannerManage'
import rechargeManage from './pages/recharge/rechargeManage'

import Addcase from './pages/patient/case/AddCase'

import CaseBox from './pages/patient/case/CaseBox'
import CaseDetail from './pages/patient/case/components/CaseDetail'
import CaseLogDetail from './pages/patient/case/components/CaseLogDetail'
// import Error from '../components/Error'
//引入路由
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'


function App () {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            //  render={() => <Redirect to={'/index/discuss'} />}
            render={() => <Redirect to={'/index/patient/map'} />}

          ></Route>
          <Route path="/Login" component={Login}></Route>
          <Route
            path="/index"
            render={() => (
              <Index>
                <Route path="/index/patient/map" component={mapManage} />
                <Route path="/index/patient/patientList" component={patientListManage} />
                <Route path="/index/patient/ADRsTips" component={ADRsTipsManage} />
                {/* 新增患者 */}
                <Route exact path="/index/patient/Addcase" component={Addcase} />
                {/* 编辑患者 */}
                <Route exact path="/index/patient/Addcase/:id" component={Addcase} />
                {/* 患者详情 */}
                <Route exact path="/index/patient/CaseBox" component={CaseBox} />
                {/* 患者详情 */}
                <Route exact path="/index/patient/CaseDetail/:id" component={CaseDetail} />
                <Route exact path="/index/patient/CaseDetail" component={CaseDetail} />
                {/* 患者日志详情 */}
                <Route exact path="/index/patient/CaseLogDetail/:id" component={CaseLogDetail} />
                {/* 医院信息 */}
                <Route path="/index/hospitalInfo/hospital" component={hospitalManage} />
                <Route path="/index/hospitalInfo/checkHospital" component={checkHospital} />
                <Route path="/index/hospitalInfo/doctor" component={doctorManage} />
                <Route path="/index/hospitalInfo/checkDoctor" component={checkDoctor} />
                {/* 患教活动管理 */}
                <Route path="/index/activity" component={activityManage} />

                {/* 病历探讨管理 */}
                <Route path="/index/discuss" component={discussManage} />
                <Route path="/index/checkDiscuss" component={CheckDiscuss} />
                {/* 交易信息统计 */}
                <Route path="/index/dealsInfo" component={dealsInfoManage} />
                {/* 首页BANNER管理 */}
                <Route path="/index/banner" component={bannerManage} />
                {/* 充值管理 */}
                <Route path="/index/recharge" component={rechargeManage} />
                {/* 充值管理 */}
                <Route path="/index/error" component={Error} />
              </Index>
            )}
          ></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
