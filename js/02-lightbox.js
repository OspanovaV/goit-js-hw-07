import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

galleryContainer.insertAdjacentHTML('beforeend', createGalleryCardsMarkup(galleryItems));

function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<li class="gallery__card"><a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a></li>`;
    }).join('');
}

new SimpleLightbox('.gallery__item', {
  captionsData: 'alt', 
  captionPosition: 'bottom', 
  captionDelay: 250 
});



