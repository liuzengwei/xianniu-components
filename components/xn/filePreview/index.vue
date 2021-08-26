<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <template v-for="(item, index) in imageList">
          <el-image
            :key="index"
            style="width: 100px; height: 100px"
            fit="cover"
            :src="item.url"
            class="user-avatar mr-10"
          >
            <div slot="error" class="image-slot el-icon-picture-outline" />
          </el-image>
        </template>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <template v-for="(item, index) in previewFileList">
          <a :key="index" :href="item.url" :download="item.accessoryName">
            <el-link :underline="false" class="mr-10">{{
              item.accessoryName
            }}</el-link>
          </a>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tools from "../../../utils/index";
export default {
  name: "XnFilePreview",
  props: {
    fileList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      imageList: [],
      previewFileList: [],
    };
  },
  created() {
    if (this.fileList && this.fileList.length) {
      this.fileList.forEach((item) => {
        const { url } = item;
        if (tools.isImg(url)) {
          this.imageList.push(item);
        } else {
          this.previewFileList.push(item);
        }
      });
    }
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss"></style>
