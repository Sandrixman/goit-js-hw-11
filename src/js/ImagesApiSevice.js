import { Notify } from 'notiflix';

const API_KEY = '20761621-2a8f8271b820083cc742db217';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiSevice {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const { total, totalHits, hits } = await response.json();
    if (total > 1) {
      this.incrementPage();
      Notify.success(`Hooray! We found ${totalHits} images.`);
      return hits;
    } else {
      Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
