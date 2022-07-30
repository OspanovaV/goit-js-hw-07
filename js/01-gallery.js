import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const cardsMarcup = createGalleryCardsMarkup(galleryItems);

//рэндерим разметку в html 
galleryContainer.insertAdjacentHTML('beforeend', cardsMarcup);

//Реализация делегирования на div.gallery
galleryContainer.addEventListener('click', onGalleryContainerClick);

//создаём разметку
function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
            <a class="gallery__link" href = "${original}" >
                <img
                    loading="lazy"
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
             </a>
        </div > `;
    })
    .join('');
}

function onGalleryContainerClick(evt) {
    evt.preventDefault();
    const isGalleryImage = evt.target.classList.contains('gallery__image');
  
    if (!isGalleryImage) {
        return;
    }
    const urlEl = evt.target.dataset.source; 
    
//используем библиотеку basicLightbox для открытия модалки
const instance = basicLightbox.create(`<img src="${urlEl}">`);
instance.show(() => window.addEventListener('keydown', onEscKeyPress));
 
   //закроем модалку при нажатии клавиши ESC   
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape'; 
  if (event.code === ESC_KEY_CODE) { 
  instance.close(() => window.removeEventListener('keydown', onEscKeyPress));
       return;
  }
    return;
}

}





