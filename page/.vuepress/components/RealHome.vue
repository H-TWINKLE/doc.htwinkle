<template>
    <Common :sidebarItems="sidebarItems" :showModule="recoShowModule">
        <div class="real-home">
            <div class="img-box" v-if="homeDayPic.url">
                <img width="100%" :height="homeDayPic.height" class="img-info"
                     :src="homeDayPic.url">
                <div class="text"
                     :class="{ active: homeDayPic.copyright }"
                     :style="{ marginTop: homeDayPic.height/2 +'px' }">{{ homeDayPic.copyright }}
                </div>
            </div>
            <el-skeleton :rows="25" animated v-else/>
        </div>
        <Footer class="footer"/>
    </Common>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, onMounted, reactive } from 'vue-demi'
import Footer from '@theme/components/Footer'
import Common from '@theme/components/Common'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import { resolveSidebarItems } from '@theme/helpers/utils'
import HttpKit from '../base/http/httpKit'
import { mobilePictureApi, proxyToolApi } from '../base/http/httpApi'

export default defineComponent({
    mixins: [moduleTransitonMixin],
    components: { Common, Footer },
    setup (props, ctx) {
        const instance = getCurrentInstance().proxy
        const homeDayPic = reactive({
            url: '',
            copyright: '',
            height: 768
        })

        const getPictureOfDesk = async () => {
            const resp = await HttpKit.get(proxyToolApi,
                { url: 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1' })
            if (resp && resp.status === 200 && resp.data && Array.isArray(resp.data.images)) {
                homeDayPic.url = 'https://www.bing.com' + resp.data.images[0].url
                setTimeout(() => {
                    homeDayPic.copyright = resp.data.images[0].copyright
                }, 1000)
                return
            }
            setTimeout(() => {
                homeDayPic.url = 'http://doc.file.htwinkle.cn/2021/09/26/f4e8bf7140b804858057d058f62140c6.jpg'
                homeDayPic.copyright = '热爱可抵岁月漫长'
            }, 1000)
        }

        const getPictureOfMobile = async () => {
            const resp = await HttpKit.get(mobilePictureApi,
                { num: 1, plate: 1, type: 'fengjing' })
            if (resp && resp.status === 200 && resp.data && Array.isArray(resp.data.list)) {
                homeDayPic.url = resp.data.list[0].pictureUrl
                setTimeout(() => {
                    homeDayPic.copyright = resp.data.list[0].pictureName
                }, 1000)
                return
            }
            setTimeout(() => {
                homeDayPic.url = 'http://doc.file.htwinkle.cn/2021/09/26/91caf39540e13866802a3681e7c70c0f.jpg'
                homeDayPic.copyright = '热爱可抵岁月漫长'
            }, 1000)
        }

        const getClientWidth = () => {
            return document.documentElement.clientWidth || document.body.clientWidth || 1024
        }

        const getClientHeight = () => {
            return document.documentElement.clientHeight || document.body.clientHeight || 768
        }

        /**
         * 获取图片
         * @returns {Promise<void>}
         */
        const getDayPicture = async () => {
            if (getClientWidth() > getClientHeight()) {
                getPictureOfDesk()
                return
            }
            getPictureOfMobile()
        }

        const getHeight = () => {
            homeDayPic.height = getClientHeight()
        }

        const sidebarItems = computed(() => {
            if (instance.$page) {
                return resolveSidebarItems(
                    instance.$page,
                    instance.$page.regularPath,
                    instance.$site,
                    instance.$localePath
                )
            } else {
                return []
            }
        })

        onMounted(() => {
            getHeight()
            getDayPicture()
        })

        return { sidebarItems, homeDayPic }
    }
})
</script>

<style src="../theme/styles/theme.styl" lang="stylus"></style>
<style lang="less">
.real-home {
    width: 100%;

    .img-box {
        opacity: .95;
        transition: all 1s ease 0s;
        -webkit-animation: all 1s ease 0s;

        .text {
            position: absolute;
            top: 0;
            width: 100%;
            text-align: center;
            z-index: 9999;
            font-weight: bold;
            font-size: 1.05rem;
            opacity: 0;
            background: rgba(23, 22, 22, 0.58);
            color: #3eaf7c;
            padding: 10px 0;
        }

        .active {
            opacity: 1;
            transition: all 2s ease;
        }
    }
}
</style>
