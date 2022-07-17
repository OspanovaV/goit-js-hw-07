import { galleryItems } from './gallery-items.js';
/**
 * 1.Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
 * 2.Реализация делегирования на div.gallery и получение url большого изображения.
 * 3.Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис
 *  jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
 * 4.Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
 * 5.Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй
 *  готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
 * 
 * відмалювати розмітку галереї 
 * при рендері підставити правильні поля
 * навішати клик на галерею -делегування
 * вмизначати елемент на який клікнули через івент таргет
 * потрібно считати дані з атрибута data-source і підставити їх в модальне вікно
 * має зьявитися модальне вікноз картинкою яку ви отримали з атрибута data-source
 */

const galleryContainer = document.querySelector('.gallery');//получим ссылку к контейнеру куда будем складывать карточки
const cardsMarcup = createGalleryCardsMarkup(galleryItems);//вызываем массив(colors) обьектов (хранит результат вызова функции всей разметки)

//рэндерим разметку в html 
galleryContainer.insertAdjacentHTML('beforeend', cardsMarcup);//добавляет в html созданную разметку

//Реализация делегирования на div.gallery
galleryContainer.addEventListener('click', onGalleryContainerClick);//вешаем слушателя на большой контейнер и выполняем функцию

//создаём разметку
function createGalleryCardsMarkup(galleryItems) {//функция принимает массив
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
    evt.preventDefault();//запретить при клике по умолчанию перенаправление на другую страницу
    const isGalleryImage = evt.target.classList.contains('gallery__image');//содержит элемент с классом
    //проверка куда кликнули
  
    if (!isGalleryImage) {//если элемент по которому кликнули не содержит isGalleryImage
        return;//выходим и ничего не делаем
    }
    const urlEl = evt.target.dataset.source; //получение url большого изображения
    
//используем библиотеку basicLightbox для открытия модалки
const instance = basicLightbox.create(`<img src="${urlEl}">`);
instance.show(() => window.addEventListener('keydown', onEscKeyPress));
 
   //закроем модалку при нажатии клавиши ESC   
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape'; 
  if (event.code === ESC_KEY_CODE) { //если значение клавиши= ESC
//закрыть модалку при помощи метода библиотеки
  instance.close(() => window.removeEventListener('keydown', onEscKeyPress));
       return;
  }
    return;
}

}





