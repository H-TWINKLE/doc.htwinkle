<template>
    <div class="md5-page">
        <p class="title">请在下面的输入框输入密码，获取相应的md5加密的32位密文：</p>
        <el-input v-model="pageInfo.text" placeholder="请输入密码"></el-input>
        <p class="content" v-if="getCode">您的密码是：{{ getCode }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'Md5Page'
})
export default class extends Vue {

    private pageInfo: any = {
        text: ''
    }

    get getCode() {
        if (!this.pageInfo.text) {
            return ''
        }
        return require('md5')(this.pageInfo.text)
    }
}
</script>

<style lang="less">
.md5-page {
    .title {
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
    }
    .content {
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        color: #2c3e50;
    }
}
</style>