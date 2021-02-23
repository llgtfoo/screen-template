/**
 * @name:弹窗外壳动画组件
 */
<template>
  <transition name="fade">
    <div class="modal-box" v-if="showModal">
      <div class="modal-mask" />
      <div class="modal-content" :style="{width:`${modalScale[0]}px`,height:`${modalScale[1]}px`}">
        <i class="modal-close" @click="closeModal" />
        <slot />
        <button class="close-button" @click="closeModal">关闭</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalPage',
  model: {
    // 使用model，
    prop: 'showModal',
    event: 'closeM',
  },
  props: {
    modalScale: {
      //弹窗的大小
      type: Array,
      default: () => [1000, 600],
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // showModal: true,
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
      this.$emit('closeM', false)
      // console.log(this.showModal)
    },
  },
}
</script>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 2s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.5;
  transform: scale(0.5);
}
.fade-enter-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
  transform: scale(1);
}
.fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.5;
  transform: scale(0.5);
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
.modal-box {
  position: fixed;
  width: 100%;
  z-index: 500;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 999999999;
  .modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 9, 23, 0.66);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999999999;
  }
  .modal-content {
    position: fixed;
    left: 50%;
    top: 50%;
    //  width:3400px;
    display: flex;
    align-items: center;
    justify-content: center;
    //  height: 1000px;
    transform: translate(-50%, -50%);
    background: url("./imgs/modal_bg.png") no-repeat;
    background-size: 100% 100%;
    z-index: 1000000000;
    padding: 10px 20px;
    padding-bottom: 60px;
    box-sizing: border-box;
    .modal-close {
      display: inline-block;
      position: absolute;
      cursor: pointer;
      z-index: 999999999;
      right: 30px;
      top: 30px;
      width: 20px;
      height: 20px;
      background: url("./imgs/modal_close.png") no-repeat;
      background-size: 100% 100%;
    }
    .close-button {
      cursor: pointer;
      position: absolute;
      right: 40px;
      bottom: 10px;
      width: 100px;
      height: 38px;
      outline: none;
      border: none;
      background: url("./imgs/modal_close_button.png") no-repeat;
      background-size: 100% 100%;
      font-size: 18px;
      font-weight: 400;
      text-align: justifyLeft;
      color: #ffffff;
    }
  }
}
</style>