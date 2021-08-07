<template>
  <div class="picture-page">
    <div v-if="pictureList.length>0">
      <div class="picture-box">
        <el-image class="item"
                  v-for="(item,index) in pictureList"
                  :key="index"
                  :src="item.src.tiny"
                  :fit="'fit'"
                  :preview-src-list="getPreviewList(item)">

        </el-image>
      </div>
      <div class="paginate-box">
        <el-pagination
            background
            small
            layout="sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="paginateInfo.total"
            :current-page.sync="paginateInfo.page"
            :page-sizes="paginateInfo.page_size"
            :page-size='paginateInfo.per_page'>
        </el-pagination>
      </div>
    </div>
    <el-skeleton :rows="25" animated v-else/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import httpKit from '../base/http/httpKit'
import { pictureApi } from '../base/http/httpApi'

@Component({
  name: 'PicturePage'
})
export default class extends Vue {

  private pictureList: any[] = []

  private paginateInfo = {
    page: 1,
    per_page: 15,
    page_size: [15, 30, 45, 60, 75],
    total: 999999999
  }

  mounted() {
    this.getPictureList()
  }

  private handleSizeChange(val) {
    // console.log(`每页 ${val} 条`);
    this.paginateInfo.per_page = val
    this.refreshPage()
  }

  private handleCurrentChange(val) {
    // console.log(`当前页: ${val}`);
    this.paginateInfo.page = val
    this.refreshPage()
  }

  private refreshPage() {
    this.upTop()
    this.getPictureList()
  }

  private async getPictureList() {
    this.pictureList = []
    const resp = await httpKit.get(pictureApi,
        { page: this.paginateInfo.page, per_page: this.paginateInfo.per_page },
        {
          headers: {
            Authorization: '563492ad6f9170000100000164b1d306f56c408aa430a0d7a877a85f'
          }
        })
    if (resp && resp.status === 200 && resp.data) {
      this.paginateInfo.page = resp.data.page ? resp.data.page : this.paginateInfo.page
      this.paginateInfo.per_page = resp.data.per_page ? resp.data.per_page : this.paginateInfo.per_page
      this.pictureList = resp.data.photos
    }
  }

  private getPreviewList(item: any) {
    return [item.src.landscape, item.src.portrait]
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
.picture-page {

  .picture-box {
    .item {
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }

  .paginate-box {
    margin-top: 20px;
    text-align: right;
  }
}
</style>