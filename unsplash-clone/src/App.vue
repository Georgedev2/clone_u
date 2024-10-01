<script>
import { onMounted, ref } from 'vue';
import CardModal from './components/CardModal.vue';

export default {
  components: {
    CardModal,
  },
  setup() {
    // constants
    const SEARCHING='searching';
    const NOT_SEARCHING='not_searching'
    const SEARCH_COMPLETED='completed_search';
    
    const search = ref('');
    const photoList = ref([]);
    const isLoading = ref(false);
    const isSearching = ref(NOT_SEARCHING); //could be any one of:--> "not_searching" "searching" "completed_search"
    const modalIsVisible = ref(false);
    const photo = ref({});
    const loaders = [1, 2, 3, 4, 5, 6, 7];
    const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
    const unsplashURL=`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
    const NUMBER_PHOTOS=7
    
    const handleModalVisibility = (id) => {
      modalIsVisible.value = !modalIsVisible.value;
      const data = photoList.value.find((item) => item.id == id);
      const { urls, user } = data || {};
      photo.value = {
        url: urls.full,
        name: user.name,
        location: user.location,
      };
    };

    const fetchPhotos = () => {
      isLoading.value = true;
      isSearching.value = SEARCHING;

      fetch(
        `${unsplashURL}&query=${search.value}`
      )
        .then((res) => {
          if (res.ok) {
            isSearching.value = SEARCH_COMPLETED;
            return res.json();
          }
        })
        .then((body) => {
   
          photoList.value = body.slice(0, NUMBER_PHOTOS);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };
    const handleFetch = () => {
      if (!search.value) {
        return;
      }
      fetchPhotos();
    };

    onMounted(() => {
      isLoading.value = true;
      fetch(unsplashURL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((body) => {
          photoList.value = body.slice(0, NUMBER_PHOTOS);
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    return {
      photoList,
      search,
      isLoading,
      handleFetch,
      isSearching,
      loaders,
      modalIsVisible,
      handleModalVisibility,
      photo,
      SEARCH_COMPLETED,SEARCHING,NOT_SEARCHING
    };
  },
};
</script>
<template>
  <header class="header">
    <form v-if="isSearching == NOT_SEARCHING" class="search-form">
      <img src="../src/components/assets/search-icon.svg" alt="search" />
      <input type="text" placeholder="Search for photos" v-model="search" />
      <div class="go-box" role="button" @click.prevent="handleFetch">
        <img src="../src/components/assets/arrow-up.svg" alt="" class="go" />
      </div>
    </form>
    <section v-else-if="isSearching == SEARCHING" class="search-for">
      <span>Searching for </span> <span>"{{ search }}"</span>
    </section>
    <section v-else-if="isSearching ==  SEARCH_COMPLETED" class="search-for">
      <span>Search result for</span> <span>"{{ search }}"</span>
    </section>
    <form v-else class="search-form">
      <img src="../src/components/assets/search-icon.svg" alt="search" />
      <input type="text" placeholder="Search for photos" v-model="search" />
      <div class="go-box" role="button" @click.prevent="handleFetch">
        <img src="../src/components/assets/arrow-up.svg" alt="" class="go" />
      </div>
    </form>
  </header>
  <!-- LOADER -->
  <div v-if="isLoading" class="loaders photos">
    <div v-for="loader in loaders" :key="loader" class="photo loader">
      <div class="loader_user-detail"></div>
    </div>
  </div>
  <!-- PHOTOS -->
  <div v-else class="photos">
    <section
      v-for="photo in photoList"
      :key="photo.id"
      class="photo"
      @click="handleModalVisibility(photo.id)"
    >
      <img :src="photo.urls.small" alt="" />
      <div class="user-detail">
        <p>{{ photo.user.name }}</p>
        <p>{{ photo.user.location }}</p>
      </div>
    </section>
  </div>

  <CardModal
    :isVisible="modalIsVisible"
    :handleModalVisibility="handleModalVisibility"
    :photo="photo"
  />
</template>

<style scoped>
/* Search bar */
.search-form {
  max-width: 850px;
  width: 80%;
  display: flex;
  align-items: center;
  height: 62px;
  background: white;
  border-radius: 6px;
  padding: 0px 5px;
}
.search-form > svg:first-child {
  margin: 0px 5px;
  cursor: text;
}
.go-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8d8d8;
  width: 40px;
  height: 35px;
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
}
.go-box :hover {
  transform: scale(1.2);
}
.search-form .go {
  width: 18px;
  height: 18px;
}

.search-form > svg:first-child {
  color: #959393;
}
.search-form > img:first-child {
  cursor: pointer;
  padding-left: 10px;
}
.search-form input {
  width: 100%;
  border: none;
  height: 100%;
  outline: none;
  cursor: pointer;
  background-color: transparent; /*    the background-color: transparent; we apply here, transparent makes the background color of it parent visible  */
  margin-left: 7px;
  font-size: 1rem;
}

.close {
  width: 20px;
}
.search-for {
  font-size: 25px;
}

.search-for span:nth-child(2) {
  font-weight: 500;
  color: #7d7d7d;
}
/*  */
.header {
  height: 243px;
  background-color: rgb(238, 236, 236);
  display: flex;
  justify-content: center;
  align-items: center;
}
.photos {
  display: grid;
  grid-template-columns: repeat(9, 80px);
  grid-template-rows: repeat(9, 80px);
  width: 900px;
  gap: 10px;
  grid-template-areas:
    'a a a b b b c c c'
    'a a a b b b c c c'
    'e e e b b b c c c'
    'e e e b b b g g g'
    'e e e z z z g g g'
    'i i i z z z g g g'
    'i i i z z z g g g'
    '. . . z z z . . .'
    '. . . m m m . . .'
    '. . . m m m . . .';

  margin: -40px auto 0px auto;
  width: 80%;
  justify-content: center;
}
.photo {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.photos > .photo:nth-child(1) {
  grid-area: a;
}
.photos > .photo:nth-child(2) {
  grid-area: b;
}
.photos > .photo:nth-child(3) {
  grid-area: c;
}
.photos > .photo:nth-child(4) {
  grid-area: e;
}
.photos > .photo:nth-child(5) {
  grid-area: z;
}
.photos > .photo:nth-child(6) {
  grid-area: g;
}
.photos > .photo:nth-child(7) {
  grid-area: i;
}

.user-detail {
  position: absolute;
  bottom: 10px;
  color: white;
  padding: 0px 12px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
}
.user-detail :first-child {
  font-size: 18px;
}
.user-detail :last-child {
  font-size: 13px;
}
.photo img {
  width: 100%;
  height: 100%;
}
/* loader */

.loader {
  background-color: #eee;
}
.loader_user-detail {
  position: absolute;
  bottom: 20px;
  padding: 0px 12px;
}
.loader_user-detail::before,
.loader_user-detail::after {
  content: '';
  display: block;
  height: 14px;
  width: 80%;
  background: #d8d8d8;
  width: 100px;
  border-radius: 5px;
  max-width: 140px;
}
.loader_user-detail::after {
  width: 80px;
  margin-top: 10px;
}
@media (max-width: 750px) {
  .search-form {
    width: 85%;
  }
}
</style>

<!-- // isLoading.value = true;
// isSearching.value = 'searching';

// fetch(
//   `https://api.unsplash.com/photos/?client_id=${
//     import.meta.env.VITE_ACCESS_KEY
//   }&query=${search.value}`
// )
//   .then((res) => {
//     if (res.ok) {
//       isSearching.value = 'completed_search';
//       return res.json();
//     }
//   })
//   .then((body) => {
//     photoList.value = body.slice(0, 7);
//   })
//   .finally(() => {
//     isLoading.value = false;
//   }); -->
