<template>
    <Common :sidebarItems="sidebarItems" :showModule="recoShowModule">
        <div class="real-home">
            <div class="img-box" v-if="homeDayPic.url">
                <img width="100%" :height="homeDayPic.height" class="img-info" :src="homeDayPic.url">
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
import { dayPictureApi, randomPictureApi } from '../base/http/httpApi'

export default defineComponent({
    mixins: [moduleTransitonMixin],
    components: { Common, Footer },
    setup(props, ctx) {
        const instance = getCurrentInstance().proxy
        const homeDayPic = reactive({
            url: '',
            copyright: '',
            height: 768
        })

        const getDayPicture = async () => {
            const resp = await HttpKit.get(dayPictureApi)
            if (resp && resp.status === 200 && resp.data && Array.isArray(resp.data.images)) {
                homeDayPic.url = resp.data.images[0].url
                setTimeout(() => {
                    homeDayPic.copyright = resp.data.images[0].copyright
                }, 1000)
                return
            }
            /*if (await getDayPictureByApi()) {
              return
            }*/
            setTimeout(() => {
                homeDayPic.url = 'http://doc.file.htwinkle.cn/2021/09/26/8dffb8404096206580b769856d9b2e0a.jpg'
                homeDayPic.copyright = '热爱可抵岁月漫长'
            }, 1000)
        }

        const getDayPictureByApi = async () => {
            const resp = await HttpKit.get(randomPictureApi)
            if (resp && resp.status === 200 && resp.data && Array.isArray(resp.data.data)) {
                homeDayPic.url = resp.data.data[0].src.bigSrc
                return true
            }
        }

        const getHeight = () => {
            homeDayPic.height = document.documentElement.clientHeight || document.body.clientHeight || 768
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
      opacity: 0;
      background: rgba(24, 24, 24, 0.33);
      color: #3eaf7c;
    }

    .active {
      opacity: 1;
      transition: all 2s ease;
    }
  }
}
</style>
