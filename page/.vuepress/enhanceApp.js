import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Bmob from "hydrogen-js-sdk"

// bmob结构数据初始化
const initBmob = function (Vue) {
    Bmob.initialize("e360953f68e3aa77",
        "QQAAZZ");
    // 挂载到全局使用
    Vue.prototype.Bmob = Bmob
}

export default ({
                    Vue,
                    options,
                    router
                }) => {
    initBmob(Vue)
    Vue.use(ElementUI)
}