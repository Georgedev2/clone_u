<script>
export default {
  props: ['isVisible', 'handleModalVisibility', 'photo'],
  setup(props) {
    return {
      props,
    };
  },
};
</script>
<template>
  <div>
    <div class="custom-modal-overlay" v-show="props.isVisible">
      <div class="custom-modal-content">
        <img
          class="close-button"
          role="button"
          width="20"
          height="20"
          src="./assets/close.svg"
          @click="handleModalVisibility"
        />
        <img v-bind:src="props.photo.url" alt="" class="photo-image" />
        <div class="user-detail">
          <p>{{ props.photo.name }}</p>
          <p>{{ props.photo.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  position: fixed;
  inset: 0;
  overflow-y: scroll;
}
.custom-modal-content {
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 60vh;
  z-index: 100;
  border-radius: 15px;
  background-color: white;
  border-radius: 20px;
}
.photo-image {
  width: 100%;
  height: 85%;
  overflow: hidden;
  object-fit: cover;
  border-radius: 20px 20px 0px 0px;
}
.user-detail {
  position: absolute;
  bottom: 10px;
  color: #111;
  padding: 0px 12px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
}
.user-detail p:first-child {
  font-size: 20px;
  margin-bottom: 8px;
}
.user-detail p:last-child {
  font-size: 13px;
  color: #767676;
}

.close-button {
  cursor: pointer;
  font-size: 18px;
  font-weight: bolder;
  position: absolute;
  top: -40px;
  right: -70px;
  color: whitesmoke;
}

.close {
  display: none;
}
@media (max-width: 500px) {
  .custom-modal-content {
    width: 90%;
  }
}
</style>
