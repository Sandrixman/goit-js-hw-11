import './css/main.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import InfiniteScroll from 'infinite-scroll';
import axios from 'axios';
import ImagesApiSevice from './js/ImagesApiSevice';
import renderPhotoCard from './js/renderPhotoCard';
import getRefs from './js/refs';
import spiner from './js/spiner';

const imagesApi = new ImagesApiSevice();
const refs = getRefs();
let isBtn = false;

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  try {
    e.preventDefault();

    clearRender();
    imagesApi.resetPage();
    const spin = spiner();
    imagesApi.query = refs.formInput.value.trim();
    const imageArray = await imagesApi.fetchImages();
    spin.stop();
    renderPhotoCard(imageArray, refs);
    // new InfiniteScroll('.gallery', {
    //   path: getPenPath,
    //   append: '.photo-card',
    //   status: '.page-load-status',
    // });
    // function getPenPath() {
    //   console.log('getPenPath');

    //   return `/desandro/`;
    // }

    if (isBtn === true && imageArray === undefined) {
      deleteLoadBtn();
      isBtn = false;
    }
    createLoadBtn();
    createLightbox();
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  imagesApi.incrementPage();
  const spin = spiner();
  const imageArray = await imagesApi.fetchImages();
  spin.stop();
  renderPhotoCard(imageArray, refs);
  createLightbox().refresh();
}

function clearRender() {
  refs.photoCard.innerHTML = '';
}

function createLoadBtn() {
  if (!isBtn) {
    const btnEl = document.createElement('button');
    btnEl.classList.add('load-more');
    btnEl.textContent = 'Load more';
    btnEl.setAttribute('type', 'button');
    document.body.append(btnEl);
    btnEl.addEventListener('click', onLoadMore);
    isBtn = true;
  }
}

function deleteLoadBtn() {
  document.querySelector('.load-more').remove();
}

function createLightbox() {
  return new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
