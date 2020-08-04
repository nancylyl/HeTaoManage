import userStore from './userStore'
import menuStore from './menuStore'
import caseTabsStore from './caseTabsStore'
let user = new userStore()
let menu = new menuStore()
let caseTabs = new caseTabsStore()
export default {
  user,
  menu,
  caseTabs
}
