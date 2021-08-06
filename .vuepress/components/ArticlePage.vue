<template>
  <div class="article-page" v-if="articlePageInfo.visible">
    <el-tooltip content="点击刷新" placement="top">
      <div class="article-page-title"
           @click="getArticleInfo()">{{ articlePageInfo.articleTitle }}
      </div>
    </el-tooltip>
    <div class="author">
      <div class="user">{{ articlePageInfo.articleAuthor }}</div>
      <div class="date">{{ articlePageInfo.articleDate }}</div>
    </div>
    <div class="content" v-html="articlePageInfo.articleContent"></div>
    <BaseRefresh :refreshText="'再来一篇'" @refreshMethod="refresh"></BaseRefresh>
  </div>
  <el-skeleton :rows="6" animated v-else/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HttpKit from '../base/http/httpKit'
import { articleApi } from '../base/http/httpApi'

@Component({
  name: 'ArticlePage'
})
export default class extends Vue {

  private articlePageInfo: any = {
    visible: false,
    articleTitle: '',
    articleId: '',
    articleContent: '',
    articleDate: '',
    articleAuthor: ''
  }

  mounted() {
    this.getArticleInfo()
  }

  /**
   * 获取文章内容
   * @private
   */
  private async getArticleInfo() {
    const req: any = await HttpKit.get(articleApi, { num: 1 })
    if (req && req.data && req.data.state === 'ok') {
      this.articlePageInfo.visible = true
      this.articlePageInfo.articleTitle = req.data.list[0].articleTitle
      this.articlePageInfo.articleId = req.data.list[0].articleId
      this.articlePageInfo.articleContent = req.data.list[0].articleContent
      this.articlePageInfo.articleDate = req.data.list[0].articleDate
      this.articlePageInfo.articleAuthor = req.data.list[0].articleAuthor
    }
  }

  /**
   * 刷新页面
   * @private
   */
  private refresh() {
    setTimeout(() => {
      const back: any = document.getElementsByClassName('back-to-ceiling')
      if (back && back[0]) {
        back[0].click()
      }
    }, 200)
    this.getArticleInfo()
  }
}
</script>

<style lang="less">
.article-page {
  .article-page-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }

  .author {
    text-align: right;
    font-size: 1.3rem;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-right: 20px;

    .user {
      font-weight: 600;
    }

    .date {
    }
  }

  .content {
    p {
      text-indent: 2rem;
    }
  }
}
</style>