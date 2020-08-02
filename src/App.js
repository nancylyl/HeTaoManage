import React from 'react'
import './App.css'
import Login from './pages/Login/'
import Index from './pages/Home/'
// import PrivateRouter from './components/PrivateRouter'
import mapManage from './pages/patient/map/mapManage'
import patientListManage from './pages/patient/patientListManage'
import ADRsTipsManage from './pages/patient/ADRsTipsManage'

import hospitalManage from './pages/hospitalInfo/hospitalManage'
import doctorManage from './pages/hospitalInfo/doctorManage'

import activityManage from './pages/activity/activityManage'

import discussManage from './pages/discuss/discussManage'

import dealsInfoManage from './pages/dealsInfo/dealsInfoManage'
import bannerManage from './pages/banner/bannerManage'
import rechargeManage from './pages/recharge/rechargeManage'

import Addcase from './pages/patient/AddCase'


//引入路由
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Redirect to={'/index/patient/Addcase'} />}
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
                {/* 医院信息 */}
                <Route path="/index/hospitalInfo/hospital" component={hospitalManage} />
                <Route path="/index/hospitalInfo/doctor" component={doctorManage} />
                {/* 患教活动管理 */}
                <Route path="/index/activity" component={activityManage} />
                {/* 病历探讨管理 */}
                <Route path="/index/discuss" component={discussManage} />
                {/* 交易信息统计 */}
                <Route path="/index/dealsInfo" component={dealsInfoManage} />
                {/* 首页BANNER管理 */}
                <Route path="/index/banner" component={bannerManage} />
                {/* 充值管理 */}
                <Route path="/index/recharge" component={rechargeManage} />

              </Index>
            )}
          ></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
