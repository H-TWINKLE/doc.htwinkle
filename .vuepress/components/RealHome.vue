<template>
  <Common :sidebarItems="sidebarItems" :showModule="recoShowModule">
    <div class="real-home">
      <div class="box">
        <el-carousel :interval="40000" type="card">
          <el-carousel-item v-for="item in imageList" :key="item">
            <img width="100%" height="100%" class="img-info" :src="item">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <Footer class="footer"/>
  </Common>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, ref } from 'vue-demi'
import Footer from '@theme/components/Footer'
import Common from '@theme/components/Common'
import Home from '@theme/components/Home'
import HomeBlog from '@theme/components/HomeBlog'
import Page from '@theme/components/Page'
import { resolveSidebarItems } from '@theme/helpers/utils'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'

export default defineComponent({
  mixins: [moduleTransitonMixin],
  components: { HomeBlog, Home, Page, Common, Footer },
  setup (props, ctx) {
    const instance = getCurrentInstance().proxy
    const imageList = computed(() => {
      return ['http://doc.file.htwinkle.cn/2021/07/25/61c3b44c40599c0080814ba26a3a429b.jpg',
        'http://doc.file.htwinkle.cn/2021/07/25/c9234380408256ba8012da01503e79d3.jpg',
        'http://doc.file.htwinkle.cn/2021/07/25/d930252540dbb61a808d533525d6562a.jpg',
        'http://doc.file.htwinkle.cn/2021/07/25/87a4250c40c3eb5a80a628fa604e0481.jpg']
    })

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

    return { sidebarItems, imageList }
  }
})
</script>

<style src="../theme/styles/theme.styl" lang="stylus"></style>
<style lang="less">
.real-home {
  height: 450px;
  width: 100%;
  margin-top: 10%;

  .box {
    margin: 10% 10% 0 10%;

    .el-carousel__container {
    }

    .el-carousel {
      .el-carousel__indicator.is-active button {
        background-color: #3eaf7c !important;
      }

      .el-carousel__indicators {
        margin-top: 5%;
      }
    }

    .img-info {
    }
  }
}
</style>
