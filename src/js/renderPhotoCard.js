export default function renderPhotoCard(imageArray, refs) {
  const markup = imageArray
    .map(
      ({
        largeImageURL,
        previewURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                <a class="photo-card__link" href="${largeImageURL}"><img class="photo-card__image" src="${previewURL}" alt="${tags}" loading="lazy" /></a>
                <div class="photo-card__info">
                  <div>
                    <p class="info-item"><b>Likes</b></p>
                    <p>${likes}</p>
                  </div>
                  <div>
                    <p class="info-item"><b>Views</b></p>
                    <p>${views}</p>
                  </div>
                  <div>
                    <p class="info-item"><b>Comments</b></p>
                    <p>${comments}</p>
                  </div>
                  <div>
                    <p class="info-item"><b>Downloads</b></p>
                    <p>${downloads}</p>
                  </div>
                </div>
              </div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
