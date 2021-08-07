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
import { defineComponent, getCurrentInstance, reactive, onMounted } from 'vue-demi'
import Footer from '@theme/components/Footer'
import Common from '@theme/components/Common'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import httpKit from '../base/http/httpKit'
import { dayPictureApi } from '../base/http/httpApi'

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

    const getDayPicture = async () => {
      const resp = await httpKit.get(dayPictureApi)
      if (resp && resp.status === 200 && resp.data && resp.data.status === 1) {
        homeDayPic.url = resp.data.bing.url
        setTimeout(() => {
          homeDayPic.copyright = resp.data.bing.copyright
        }, 1000)
      }
    }

    const getHeight = () => {
      homeDayPic.height =  document.documentElement.clientHeight || document.body.clientHeight || 768
    }

    onMounted(() => {
      getHeight()
      getDayPicture()
    })

    return { homeDayPic }
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
