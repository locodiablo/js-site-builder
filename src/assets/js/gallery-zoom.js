"use strict";

let currentGalleryIndex = 0

const templateAttrItem = `
<div class="gallery-zoom-attr">
  <div class="fas fa-info"></div>
  <svg class="gallery-zoom-point" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15">
  	<polygon points="0,0.5 10,0 9,9.5 6,10 5,15 4,10.5 0.5,11" class="attr-active-target"></polygon>
  </svg>
</div>
`

const templateCarousel = function(data){
  return `
  <div id="${data.id}" class="carousel slide ${data.class ? data.class : ''}" data-touch="true" data-ride="${data.ride}" data-interval="${data.ride}">

      <ol class="carousel-indicators">
          ${
            data.slides.map((data_item,index) =>
                `<li data-target="#${data.id}" data-slide-to="${index}" class="${index == 0 ? 'active' : ''}"></li>`
            ).join("")
          }
      </ol>

      <div class="carousel-inner">
          ${
            data.slides.map((data_item,index) =>{
              data_item.imgDir = data.imgDir
              return `
              <div class="carousel-item item-${index} ${index == 0 ? 'active' : ''}">
                  <div class="img-gallery-zoom-wrapper">
                    <img src="${gallery.imgDir}${gallery.slides[index].src}" class="d-block img-gallery-zoom" alt="${gallery.slides[index].title}">
                    ${templateAttrItem}
                  </div>
              </div>`
            }).join("")
          }
      </div>
      ${data.controls}

  </div>
  `
}

const templateAttrs = `
  <div class="btn btn-tint-dark mt-4 btn-round j-img-attrs">
    <i class="fas fa-info" aria-hidden="true"></i>
  </div>
  `

const templateCarouselItemInfo = function(data){
  return `
    <div class="container">
      <div class="gallery-zoom-caption">
        <b class="gallery-zoom-title">${gallery.slides[data].title}</b>
        <p class="gallery-zoom-text">${gallery.slides[data].caption}</p>
      </div>
    </div>
  `
}

const carouselControls = function(data){
  return `
  <div class="carousel-controls-wrapper ${data.controlsClasses}">
    <div class="carousel-controls-inner text-center">
      <a class="carousel-control-next ${data.btnClasses}" href="#${data.id}" role="button" data-slide="next">
          <i class="fas fa-angle-right" aria-hidden="true"></i>
          <span class="sr-only">Next</span>
      </a>
      <a class="carousel-control-prev ${data.btnClasses}" href="#${data.id}" role="button" data-slide="prev">
          <i class="fas fa-angle-left" aria-hidden="true"></i>
          <span class="sr-only">Previous</span>
      </a>
      ${gallery.slides[currentGalleryIndex].attrs ? templateAttrs : ''}
    </div>
  </div>
`}

$(document).on("click", `.j-img-zoom`, function(e){
  e.preventDefault()
  const galleryData = $(this).data("gallery")
  galleryData.id = gallery.id
  galleryData.class = 'gallery-carousel'
  galleryData.ride = false
  galleryData.slides = gallery.slides
  galleryData.controls = carouselControls({
    id: gallery.id,
    controlsClasses: '',
    btnClasses: ''
  })
  const content = {
    title: gallery.title,
    body: templateCarousel(galleryData),
    class: "gallery-zoom",
    footer: templateCarouselItemInfo(galleryData.index),
    backdrop: true
  }
  do_modal(content)
  $(`#${gallery.id}`).carousel(galleryData.index)
  currentGalleryIndex = galleryData.index
  attrIndex = 0
})

let attrIndex = 0

const showAttrs = {
  next: function(){
    let title = gallery.slides[currentGalleryIndex].title
    let galleryLength = gallery.slides[currentGalleryIndex].attrs.length
    $(".gallery-zoom-attr").css("top", `${gallery.slides[currentGalleryIndex].attrs[attrIndex].top}%`)
    $(".gallery-zoom-attr").css("left",`${gallery.slides[currentGalleryIndex].attrs[attrIndex].left}%`)
    $(".gallery-zoom-title").html(`${title} ${attrIndex+1}/${galleryLength}`)
    $(".gallery-zoom-text").html(gallery.slides[currentGalleryIndex].attrs[attrIndex].text)
    $(".gallery-zoom-attr").addClass('attr-active')
    attrIndex ++
  },
  end: function(){
    attrIndex = 0;
    $(".gallery-zoom-attr").removeClass('attr-active')
    $(".gallery-zoom-title").html(gallery.slides[currentGalleryIndex].title)
    $(".gallery-zoom-text").html(gallery.slides[currentGalleryIndex].caption)
  }
}

$(document).on("click", `.j-img-attrs`, function(e){
  $(".gallery-zoom-attr").removeClass('attr-active')
  attrIndex < gallery.slides[currentGalleryIndex].attrs.length ?
  showAttrs.next() :
  showAttrs.end()
})

$(document).on("slid.bs.carousel",`.gallery-carousel`,function(e){

    currentGalleryIndex = $(`#${gallery.id} div.active` ).index()
      console.log('currentGalleryIndex',currentGalleryIndex)
      showAttrs.end()
      $(`${id_modal} .modal-footer`).html(templateCarouselItemInfo(currentGalleryIndex))

})
