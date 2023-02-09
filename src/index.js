import './css/main.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import ImagesApiSevice from './js/ImagesApiSevice';
import renderPhotoCard from './js/renderPhotoCard';
import getRefs from './js/refs';
import spiner from './js/spiner';

const imagesApi = new ImagesApiSevice();
const refs = getRefs();
let btnVisible = false;

refs.searchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSearch(e) {
  const spin = spiner();
  try {
    e.preventDefault();

    clearRender();
    visibilityBtnLoadMore(btnVisible);
    imagesApi.resetPage();
    imagesApi.query = refs.formInput.value.trim();
    const imageArray = await imagesApi.fetchImages();
    spin.stop();
    if (imageArray) {
      btnVisible = true;
      visibilityBtnLoadMore(btnVisible);
      renderPhotoCard(imageArray, refs);
      createLightbox();
    }
  } catch (error) {
    console.log(error);
    spin.stop();
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
  refs.gallery.innerHTML = '';
}

function visibilityBtnLoadMore() {
  if (btnVisible) {
    refs.btnLoadMore.classList.add('visible');
  } else {
    refs.btnLoadMore.classList.remove('visible');
  }
  btnVisible = false;
}

function createLightbox() {
  return new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
