import { galleryItems } from "./gallery-items.js";

const galleryMarkup = document.querySelector(".gallery");

const galleryList = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
  })
  .join("");

galleryMarkup.insertAdjacentHTML("afterbegin", galleryList);

galleryMarkup.addEventListener("click", onClickImageZoom);

function onClickImageZoom(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();
  const instance = basicLightbox.create(
    `
		<img width="1400" height="900" src="${e.target.dataset.source}">
	`
  );
  instance.show();
  window.addEventListener("keydown", onEscModalClose);

  function onEscModalClose(e) {
    if (e.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onEscModalClose);
    }
  }
}
