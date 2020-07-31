import userStore from './userStore'
import menuStore from './menuStore'
let user = new userStore()
let menu = new menuStore()
export default {
  user,
  menu,
}
