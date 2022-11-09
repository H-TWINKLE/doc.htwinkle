<template>
  <div class="base-refresh" @click="refreshMethod">
    <i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;{{ refreshText }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseRefresh'
})
export default class extends Vue {

  @Prop({ default: '再来一次' }) private refreshText!: string

  private refreshMethod() {
    this.$emit('refreshMethod')
  }
}
</script>

<style lang="less" scoped>
.base-refresh {
  margin-top: 30px;
  text-align: right;
  color: #3eaf7c;
  cursor: pointer;
}
</style>