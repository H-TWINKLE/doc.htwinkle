<template>
  <Common :sidebarItems="sidebarItems" :showModule="recoShowModule">
    <div class="real-home">
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <Footer class="footer"/>
  </Common>
</template>

<script>
import { computed, defineComponent, getCurrentInstance } from 'vue-demi'
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

    return { sidebarItems }
  }
})
</script>

<style src="../theme/styles/theme.styl" lang="stylus"></style>
<style lang="less" scoped>
.real-home {
  margin: 10% 10% 0 10%;

  .el-carousel__container {
  }

  .el-carousel__item h3 {
    background: red;
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
}
</style>
