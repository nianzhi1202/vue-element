import tip from './states/tip'
import test from './states/test'
import modal from './states/modal'
import notice from './states/notice'
import messageBox from './states/messageBox'
import loading from './states/loading'

export default {
    test: test,
    // 消息提示
    tip: tip,

    // 模态框
    modal: modal,

    // 消息通知
    notice: notice,

    // 对话框
    messageBox: messageBox,

    // loading遮罩
    loading: loading,

    // 登录token，存在store中的额accessToken，如果不刷新浏览器，过期也不会被删除，刷新浏览器会根据cookie重新赋值
    accessToken: null,

    // 登录后设置为true
    isRefresh: false,

    // 权限列表
    permission: [],

    // 用户模块，管理登录、注销以及用户信息
    userInfo: [],

    // 数据词典
    dataDict: [],

    // 返回列表页码
    indexPage: 1,

    // 导出任务队列
    taskList: [],

    currentRoute: null,
    // 测试 - 弹框组件中调用组件使用props传值会提示外部修改store，应该是props修改了store（严格模式下），尝试用store传值
    modalPropsData: []
}
