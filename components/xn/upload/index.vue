<template>
  <div class="xn-upload-box">
    <el-upload
      ref="upload"
      :class="{
        'hide-upload': hiddenUpload || isHidden || disabled,
        'el-upload-idcard': listType === 'idcard',
      }"
      :action="actionParams.action"
      :auto-upload="autoUpload"
      :on-progress="onProcess"
      :show-file-list="showFileList"
      :list-type="listType === 'idcard' ? 'picture-card' : listType"
      :multiple="multiple"
      :limit="limit"
      :disabled="disabled"
      :file-list.sync="fileList"
      :on-success="onSuccess"
      :on-change="onChange"
      :on-error="onError"
      :before-upload="onBeforeUpload"
      :style="styles"
      :headers="uploadHeaders"
      :on-exceed="onExceed"
    >
      <template v-if="listType === 'idcard'">
        <template slot="trigger">
          <xn-idcard :type="type" />
        </template>
      </template>
      <template v-else-if="listType === 'picture-card'">
        <i slot="trigger" class="el-icon-plus" />
      </template>
      <template v-else>
        <slot>
          <el-button icon="el-icon-upload">编辑</el-button>
        </slot>
      </template>
      <div
        slot="file"
        slot-scope="{ file }"
        class="upload-slot"
        :class="{ 'upload-slot-idcard': listType === 'idcard' }"
      >
        <template v-if="isImage(file)">
          <el-image
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            fit="cover"
            :lazy="true"
          />
        </template>
        <template v-else>
          <div class="xn-upload-list__item--file">
            <i class="el-icon el-icon-files" />
            <div class="file-name">{{ file.name }}</div>
          </div>
        </template>
        <div v-if="file.status === 'uploading'" class="process">
          <el-progress
            :status="file.percentage === 100 ? 'success' : null"
            type="circle"
            :percentage="process(file.percentage)"
            :stroke-width="6"
          />
        </div>
        <span class="el-upload-list__item-actions">
          <span
            v-if="isImage(file)"
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="fz-16 el-icon-zoom-in" />
          </span>
          <span
            class="el-upload-list__item-delete icon"
            @click="handleDownload(file, fileList)"
          >
            <i class="fz-16 el-icon-download" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete icon"
            @click="handleRemove(file, fileList)"
          >
            <i class="fz-16 el-icon-delete" />
          </span>
        </span>
      </div>
      <!-- <el-button slot="trigger" size="small" type="primary">select file</el-button> -->

      <div v-if="tip !== ''" slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
    <el-image-viewer
      v-if="isShowImageView"
      :on-close="closeViewer"
      :z-index="999999"
      :url-list="[imageView]"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import * as imageConversion from "image-conversion";
import { isImg } from "../../../utils/index";
export default {
  name: "XnUpload",
  components: {
    ElImageViewer,
  },
  model: {
    prop: "value",
    event: "on-change",
  },
  props: {
    listType: {
      type: String,
      default: "picture-card",
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    hiddenUpload: {
      type: Boolean,
      default: false,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    disabled: Boolean,
    autoUpload: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    tip: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: Array,
      default: () => ["jpg", "jpeg", "png", "pdf"],
    },
    maxSize: {
      type: Number,
      default: 1024 * 5 * 1024, // 最大限制 5M
    },
    compress: {
      type: [Boolean, Number],
      default: false,
    },
    type: {
      type: String,
      default: "front",
      validator: (val) => {
        return ["front", "back"].includes(val);
      },
    },
    styles: {
      type: Object,
      default: () => {},
    },
    value: {
      // type: String,
      type: Array,
      default: () => "",
    },
  },
  data() {
    return {
      isShowImageView: false,
      imageView: "",
      isHidden: false,
      actionParams: {
        action: `${process.env.VUE_APP_AUTH_API}/auth/upload/uploadFile`,
      },
      uploadHeaders: {
        xnToken: this.$store.getters.token,
      },
      successFileList: [],
      viewList: [],
    };
  },
  computed: {
    process() {
      return (num) => {
        return Math.floor(num);
      };
    },
    isImage() {
      return (file) => {
        return (
          isImg(file.url) ||
          (file.raw && file.raw.fileExt ? isImg(file.raw.fileExt) : "")
        );
      };
    },
  },
  watch: {
    /* value: {
      handler(n) {
        // console.log('value', n)
        // this.fileListViews(n)
        // const arr = n.split(',')
        // const fileList = arr.map(item => {
        //   return { url: item }
        // }).filter(item => item.url !== '')
        // console.log(fileList)
        // this.$emit('update:fileList', fileList.length ? fileList : [])
      },
      immediate: true
    }, */
    fileList: {
      handler(n) {
        if (this.limit === n.length) {
          this.isHidden = true;
        } else {
          this.isHidden = false;
        }
        console.log(n);

        const arr = n.map((item) => {
          if (item.response && item.response.code === 200) {
            return item.response.data.filePath;
          } else if (item.url) {
            return item.url;
          }
        });
        // this.$emit('on-change', arr.join(','))
        this.$emit("on-change", arr);
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    // this.$emit("update:fileList", []);
  },
  methods: {
    onProcess(process) {},
    onBeforeUpload(file) {
      const _isImg = isImg(file.name);
      const fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
      const _maxSize = parseFloat(this.maxSize);

      // 判断上传格式
      file.fileExt = `.${fileExt}`;
      if (!this.accept.includes(fileExt.toLowerCase())) {
        this.$message.warning(`请上传指定格式【${this.accept}】`);
        return false;
      }
      // 如果是图片 时候开启压缩
      if (_isImg) {
        if (this.compress) {
          const _num = this.compress - 0;
          const conversionType = _num > 1 ? "compressAccurately" : "compress";
          imageConversion[conversionType](file, _num).then((result) => {
            // console.log('图片压缩')
            if (!this.onExceedSize(result.size, _maxSize)) {
              return false;
            }
          });
        } else {
          //   console.log('图片未开启')
          if (!this.onExceedSize(file.size, _maxSize)) {
            return false;
          }
        }
      } else {
        // console.log('不是图片')
        if (!this.onExceedSize(file.size, _maxSize)) {
          return false;
        }
      }
      if (this.listType === "idcard") {
        this.isHidden = true;
      }
    },
    onExceedSize(size, maxSize) {
      if (size > maxSize) {
        this.$message.warning(`最大不能超过${bytesToSize(maxSize)}`);
        return false;
      }
      return true;
    },
    onChange(file, fileList) {
      // const arr = fileList.map((item) => {
      //   if (item.response && item.response.code === 200) {
      //     return item.response.data.filePath
      //   } else if (item.url && item.status === 'success') {
      //     return item.url
      //   }
      // })
      // this.$emit('on-change', [...this.viewList.map(item => item.url), ...arr].join(','))
      // console.log(arr)
    },
    // 回显上传资源
    fileListViews(url) {
      if (!url) return [];
      const arr = url.split(",").map((item) => ({ url: item, name: item }));
      this.viewList = arr;
      this.$emit("update:fileList", arr);
    },
    onSuccess(response, file, fileList) {
      if (this.listType === "idcard") {
        this.isHidden = false;
      }

      const arr = fileList.map((item) => {
        if (item.response && item.response.code === 200) {
          return item.response.data.filePath;
        }
      });
      this.$emit("update:fileList", fileList);
      // this.$emit('on-success', arr.join(','))
      this.$emit("on-success", arr);
    },
    onError() {
      //   console.log(err, file, fileList)
      this.$message.error("上传失败，请重试");
    },
    onSubmitUpload() {
      this.$refs.upload.submit();
    },
    onAbort() {
      this.$refs.upload.abort();
    },

    onExceed(file, fileList) {
      this.$message.warning(`上传总数限制为【${this.limit}】个，请删除后上传`);
    },
    handlePictureCardPreview(file) {
      this.isShowImageView = true;
      this.$nextTick(() => {
        this.imageView = file.url;
      });
    },
    async handleDownload({ url }) {
      // const response = await fetch(url) // 内容转变成blob地址
      // const blob = await response.blob() // 创建隐藏的可下载链接
      // const objectUrl = window.URL.createObjectURL(blob)
      // const a = document.createElement('a')
      // a.href = objectUrl
      // a.download = 'name'
      // a.click()
      // a.remove()
      const elt = document.createElement("a");
      elt.setAttribute("href", url);
      elt.setAttribute("download", "下载文件");
      elt.style.display = "none";
      elt.target = "_blank";
      document.body.appendChild(elt);
      elt.click();
      document.body.removeChild(elt);
    },
    handleRemove(file, fileList) {
      fileList.forEach((item, idx, arr) => {
        if (file.uid === item.uid) {
          fileList.splice(idx, 1);
        }
      });
      if (this.viewList.length) {
        this.viewList.forEach((item, idx, arr1) => {
          if (item.url === file.url) {
            this.viewList.splice(idx, 1);
          }
        });
      }
      this.$emit("update:fileList", fileList);
      // this.$emit('on-change', fileList.map(item => item.url).join(','))
      this.$emit(
        "on-change",
        fileList.map((item) => item.url)
      );
    },
    closeViewer() {
      this.isShowImageView = false;
    },
  },
};
</script>

<style scoped lang="scss">
.process {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.4);
  width: 100%;
  height: 100%;
  .el-progress {
    width: 40%;
    height: auto;
    ::v-deep .el-progress-circle {
      width: 99% !important;
      height: 99% !important;
    }
    ::v-deep .el-progress__text {
      color: #fff;
    }
  }
}
.el-upload-idcard {
  .el-progress {
    width: 52%;
  }
}
.upload-slot {
  height: 100%;
  &-idcard {
    width: 100%;
    height: 100%;
  }
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  .icon {
    margin-left: 5px;
  }
}
.xn-upload-list__item--file {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 0;
  .el-icon {
    font-size: 18px;
    color: #ccc;
  }
  .file-name {
    line-height: 20px;
    font-size: 12px;
    color: #363639;
    padding: 0 10px;
    margin-top: 5px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;
  }
}
.box_rotate {
  border: 1px solid red;
  width: 520px;
  height: 520px;
  overflow: hidden;
  transform-origin: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: translate(-50%, -50%);
    display: block;
  }
}
</style>
