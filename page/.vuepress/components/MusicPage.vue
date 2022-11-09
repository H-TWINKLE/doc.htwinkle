<template>
  <div class="music-page">
    <component ref="aplRefs" :autoplay="true" :key="aplayerInfo.src" :music="aplayerInfo"
               v-if="dynamicComponent" :is="dynamicComponent"></component>
    <BaseRefresh :refreshText="'再来一首'" @refreshMethod="getMusicInfo"></BaseRefresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import httpKit from '../base/http/httpKit'

@Component({
  name: 'MusicPage'
})
export default class extends Vue {

  private dynamicComponent = ''

  private aplayerInfo: any = {
    title: 'secret base~君がくれたもの~',
    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
    artist: 'Silent Siren',
    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
  }

  mounted() {
    this.importComponent()
    this.getMusicInfo()
  }

  /**
   * 动态加载组件
   * @private
   */
  private importComponent() {
    import('vue-aplayer').then(module => {
      this.dynamicComponent = module.default
    })
  }

  /**
   * 获取音乐信息
   * @private
   */
  private async getMusicInfo() {
    const resp = await httpKit.get(this.getMusicUrl())
    if (resp && resp.data && resp.data.code === 1) {
      this.aplayerInfo.title = resp.data.data.name
      this.aplayerInfo.src = resp.data.data.url
      this.aplayerInfo.artist = resp.data.data.artistsname
      this.aplayerInfo.pic = resp.data.data.picurl
      this.$nextTick(() => {
        this.play()
      })
    }
  }

  private getMusicUrl(type = '热歌榜') {
    return `https://api.uomg.com/api/rand.music?sort=${type}&format=json`
  }

  private play() {
    const aplRefs: any = this.$refs.aplRefs
    if (aplRefs) {
      aplRefs.play()
    }
  }

}
</script>

<style lang="less" scoped>
.music-page {
}
</style>