export const formatNum = (str) => {
    return str + 'hhh'
}

export const getUserInfo = () => {
    return window.pageConfig.userInfo;
}


export const isLogin = () => {
    return getUserInfo() ? true : false
}

export const extendUserInfo = (userInfo) => {
    Object.assign(getUserInfo(), userInfo);
}

export const overUserInfo = (userInfo = null) => {

    window.pageConfig.userInfo = userInfo;
    // console.log(window.pageConfig.userInfo, userInfo);

}