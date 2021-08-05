<template>
  <div class="music-page">
    <Aplayer ref="aplRefs" :autoplay="true" :key="aplayerInfo.src" :music="aplayerInfo"></Aplayer>
    <div class="refresh" @click="getMusicInfo()">
      <i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;再来一首
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Aplayer from 'vue-aplayer'
import httpKit from '../base/http/httpKit'

@Component({
  name: 'MusicPage',
  components: {
    Aplayer
  }
})
export default class extends Vue {

  private aplayerInfo: any = {
    title: 'secret base~君がくれたもの~',
    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
    artist: 'Silent Siren',
    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
  }

  mounted() {
    this.getMusicInfo()
  }

  private async getMusicInfo() {
    const resp = await httpKit.get(this.getMusicUrl())
    if (resp && resp.data && resp.data.code === 1) {
      this.aplayerInfo.title = resp.data.data.name
      this.aplayerInfo.src = resp.data.data.url
      this.aplayerInfo.artist = resp.data.data.artistsname
      this.aplayerInfo.pic = resp.data.data.picurl
      this.play()
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
  .refresh {
    margin-top: 30px;
    text-align: right;
    color: #3eaf7c;
    cursor: pointer;
  }
}
</style>