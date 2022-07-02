<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in SearchResultList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      SearchResultList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.SearchResultList.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      // 清空列表数据
      this.SearchResultList = []

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
