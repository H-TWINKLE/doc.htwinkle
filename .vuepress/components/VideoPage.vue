<template>
  <div class="video-page">
    <div v-if="playerOptions.poster">
      <component
          v-if="dynamicComponent" :is="dynamicComponent"
          :index="videoId" :options="playerOptions"></component>
      <BaseRefresh :refreshText="'再来一个'" @refreshMethod="refreshPage"/>
    </div>
    <el-skeleton :rows="10" animated v-else/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import httpKit from '../base/http/httpKit'
import { videoApi } from '../base/http/httpApi'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

@Component({
  name: 'VideoPage'
})
export default class extends Vue {

  private dynamicComponent = null

  // 起风了id
  private videoId: string = '10911467'

  /**
   * 视频播放的配置
   * */
  private playerOptions: any = {
    playbackRates: [0.5, 1.0, 1.5, 2.0],
    autoplay: true,
    muted: false,
    loop: false,
    preload: 'auto',
    language: 'zh-CN',
    aspectRatio: '16:9',
    fluid: true,
    sources: [],
    poster: "",
    notSupportedMessage: '此视频暂无法播放，请稍后再试',
    controlBar: {
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true
    }
  }

  mounted() {
    this.importComponent()
    this.getVideoInfo()
  }

  /**
   * 动态加载组件
   * @private
   */
  private importComponent() {
    import('vue-video-player').then(module => {
      this.dynamicComponent = module.default.videoPlayer
    })
  }

  /**
   * 刷新页面
   * @private
   */
  private refreshPage() {
    this.upTop()
    this.clearPage()
    this.getVideoInfo()
  }

  private clearPage() {
    this.playerOptions.poster = ''
    this.playerOptions.sources = []
  }

  private async getVideoInfo() {
    const resp = await httpKit.get(videoApi, {
      type: 'mv',
      id: this.videoId
    })
    if (resp && resp.status === 200 && resp.data.data && resp.data.data.brs) {
      for (const br in resp.data.data.brs) {
        const item: any | never = {
          type: 'video/mp4',
          src: String(resp.data.data.brs[br])
        }
        this.playerOptions.sources.unshift(item)
      }
      this.playerOptions.poster = resp.data.data.cover
    }
  }

  private upTop() {
    setTimeout(() => {
      const back: any = document.getElementsByClassName('back-to-ceiling')
      if (back && back[0]) {
        back[0].click()
      }
    }, 200)
  }
}
</script>

<style lang="less" scoped>
.video-page {
}
</style>