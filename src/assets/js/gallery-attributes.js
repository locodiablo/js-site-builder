"use strict";

const classAttrsActive = "attrs-active"
const classAttrsShow = "j-attrs-show"
const classAttrsHide = "j-attrs-hide"
const classAttrNext = "j-attr-next"

const classAttrsNav = "attrsNav"
let currentAttributes = {}
let lastSelectAttr = ".attrs-0 .attr-0"

const setTrigger = {
  galleryAttributes: {
    cycle: function(data){
      return `
      <div class="btn btn-round btn-attrs btn-round-split-x btn-attr-active ${classAttrNext}">
        <div class="btn-round-split split-1 fas fa-info"></div>
        <div class="btn-round-split">${data}</div>
      </div>
      `
    },
    show: function(data){
      return `
      <div class="btn btn-round btn-round-split-x btn-attrs btn-tint-dark ${classAttrsShow}">
        <div class="btn-round-split split-1 fas fa-info"></div>
        <div class="btn-round-split">${data}</div>
      </div>
      `
    },
    hide: function(data){
      return `
      <div class="btn btn-round btn-attrs btn-attr-active ${classAttrsHide}">
        <div class="btn-round-split split-1 fas fa-info"></div>
        <div class="btn-round-split fas fa-times"></div>
      </div>
      `
    }
  }
}

const templateInfoCount = function(){
  return `${currentAttributes.attrIndex+1}/${currentAttributes.content.length}`
}

const templateAttr = function(data){
  return `
  <div class="attr-tip">
    <h4 class="attr-title">Info</h4>
    <div class="small-caps">${data.count}</div>
    <div>${data.body}</div>
  </div>
  `
}

const galleryItemAttributes = {
  attrOn: function(data){

    $(`.galleryImages .${data.slideIndex} .attr-${data.attrIndex}`).addClass("attr-on")
    $(`.${classAttrsNav}`).html(setTrigger.galleryAttributes.cycle(templateInfoCount()))

    let attrContent = {
      count: templateInfoCount(),
      body: data.content[data.attrIndex].text + "."
    }
    //
    $(".carousel-controls-wrapper").css("display") == 'none' ?

    do_modal({
      class: "modal-info",
      title: 'Info',
      body: templateAttr(attrContent),
      backdrop: false
    }) : do_gallery_attr(attrContent)
  },
  attrOff: function(data){
    $(`.galleryImages .${data.slideIndex} .attr-${data.attrIndex}`).removeClass("attr-on")
    $(`.gallery-caption .attr-tip`).remove()
    $(".gallery-caption-text").removeClass("d-none")
  }
}

const galleryAttributes = {
  hide: function(data){
    galleryItemAttributes.attrOff(currentAttributes)
    $(`.${classAttrsNav}`).html(setTrigger.galleryAttributes.show('Start'))
    $(`.galleryImages .${currentAttributes.slideIndex}`).addClass("d-none")
    $(".modal.modal-info").css("display") == 'block' ?
    $(id_modal).modal('hide') : ''
  },
  show: function(data){
    $(`.galleryImages .${data.slideIndex}`).removeClass("d-none")
    data.attrIndex = 0
    galleryItemAttributes.attrOn(data)
    $(`.${classAttrsNav}`).html(setTrigger.galleryAttributes.cycle(templateInfoCount()))
    currentAttributes = data
  }
}

function do_gallery_attr(data){
  $(".gallery-caption-text").addClass("d-none")
  $(".gallery-caption").removeClass("align-self-center")
  $(".gallery-caption").append(templateAttr(data))
}

// attr-tip
$( window ).resize(function() {
  if(currentAttributes.attrIndex > -1){
    galleryAttributes.hide(currentAttributes)
  }
})

// select each attribute MOBILE
$(document).on("click", ".j-attr", function(e){
  galleryItemAttributes.attrOff(currentAttributes)
  currentAttributes = $(`.${$(this).data("info")}`).data("attrs")
  currentAttributes.attrIndex = $(this).data("index")
  galleryItemAttributes.attrOn(currentAttributes)
})

// rotate through attributes
$(document).on("click", `.${classAttrNext}`, function(e){
  galleryItemAttributes.attrOff(currentAttributes)
  if(currentAttributes.attrIndex <(currentAttributes.content.length-1)){
    currentAttributes.attrIndex ++
    galleryItemAttributes.attrOn(currentAttributes)
  }else{
    galleryAttributes.hide(currentAttributes)
  }
})

// toggle attributes show/hide
$(document).on("click", `.${classAttrsShow}`, function(e){
  currentAttributes = $(`.galleryImages .item-${$(".galleryImages .active").index()} .attrs`).data("attrs")
  galleryAttributes.show(currentAttributes)
  $(`.${classAttrsShow}`).addClass(classAttrsHide)
  $(`.${classAttrsHide}`).removeClass(classAttrsShow)

})

$(document).on("click", `.${classAttrsHide}`, function(e){
  galleryItemAttributes.attrOff(currentAttributes)
  galleryAttributes.hide(currentAttributes)
})

// gallery slide
$(document).on("slide.bs.carousel",'.galleryImages',function(e){
  galleryAttributes.hide(currentAttributes)
  $(".modal.modal-info").modal('hide')
})

//
$(document).ready(function ($) {
  $(id_modal).bind("hidden.bs.modal", function(e) {
    galleryAttributes.hide(currentAttributes)
  })
})
