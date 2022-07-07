<template>
  <div>
    <van-nav-bar :title="title" @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      v-for="item in list"
      :key="item.com_id"
      :item="item"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="addCommentShow = true"
        >写评论
      </van-button>
    </div>
    <van-popup v-model="addCommentShow" position="bottom">
      <AddComment
        v-if="addCommentShow"
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          list.unshift($event);
          addCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import CommentItem from '@/views/Article/components/CommentItem.vue'
import { getCommentList } from '@/api/comment'

export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      limit: 9999,
      offset: null,
      list: [],
      addCommentShow: false

    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, limit: this.limit, offset: this.offset })
        this.list = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return `${count}条回复`
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  width: 750px;
  height: 110px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  background-color: pink;
}
</style>
