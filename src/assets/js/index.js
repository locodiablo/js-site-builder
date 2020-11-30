"use strict";

const id_modal = "#myModal"
const id_cover_bg = ".jumbotron-cover"
const id_top_nav_desc = "j-topNavDesc"
const modal_side_class = "modal-side"
const modal_nav_class = "modal-nav"
const modal_demo_class = "modal-demo"
const classScrollActive = 'scrollActive'
const classNavBackDefaults = "nav-back"//nav-item nav-back disabled j-back
const classNavMain = ".nav-main-wrapper"
const classNavItem = "nav-list-group"
const scroll_min = 40
const classNavTabActive = "nav-t-active"
let scroll_top = 0
const transition_interval = 1200
const nav_carousel_id = ".nav_carousel"
const idNavBack = ".nav-back"
let clickedNavIndex = []
let currentIndex = 0
let classBody = ''
let lastActiveNav = 0

function do_modal(data) {
  classBody = data.class
  $("body").addClass(classBody)
  $(id_modal + " .modal-title").html(data.title)
  $(id_modal + " .modal-body").html(data.body)
  data.footer ? $(id_modal + " .modal-footer").html(data.footer) : ''
  $(id_modal).modal({
    backdrop: data.backdrop
  })
}

function navCarouselActive(){
 currentIndex > 0 ? $(idNavBack).attr("class",`${classNavBackDefaults} j-nav-back`) : $(idNavBack).attr("class",`${classNavBackDefaults} disabled`)
}

function clearModalOnClose(){
  $(id_modal).attr("class", "modal fade")
  $(id_modal + " .modal-body").html("")
  $(id_modal + " .modal-footer").html("")
  $(id_modal).data('bs.modal',null)
  $("body").removeClass(classBody)
  $("body .modal-backdrop").remove()
}

function resetModalNav(){
  currentIndex = 0;
  clickedNavIndex = []
  navCarouselActive()
  clearModalOnClose()
  $(`.nav-item-${lastActiveNav}`).removeClass(classNavTabActive)
}

const templates = {
  navCarouselItem: function(data){
    return `
    <div class="carousel-item item-${data.carouselItemIndex} ${data.carouselItemIndex == 0 ? 'active' : ''}">
        <div class="row align-items-center">
          <div class="d-none d-sm-block col-sm-6 ${id_top_nav_desc}">
            ${data.parentData.description}
          </div>
          <div class="col-12 col-sm-6">
            <div class="list-group ${classNavItem}">
              ${data.parentData.href ?
                `<a class="list-group-item h3 m-0" href="${data.parentData.href}">${data.parentData.text}</a>`:
                `<div class="list-group-item h3 m-0">${data.parentData.text}</div>`
              }
              ${data.links}
            </div>
          </div>
    </div>
    `
  },
  sideNavTypes: {
    directory: function(incomingLinkData){
      const navUrl = incomingLinkData.data.path.replace("src/js_build/page_definitions","")
      incomingLinkData.data.children.length > 1 ? incomingLinkData.exploreClass = 'j-menu ' : ''
      return `
      <a class="list-group-item ${incomingLinkData.exploreClass} nav-dir list-group-item-${incomingLinkData.thisLinkCount}" data-my-menu="${incomingLinkData.thisLinkCount}" href="${navUrl}" data-href="${navUrl}">
          ${incomingLinkData.data.pageData.text}
          ${incomingLinkData.data.children.length > 1 ? '<i class="nav-fas fas fa-angle-right"></i>' : ''}
      </a>
      `
    },
    file: function(incomingLinkData){}
  },
  linkBack: `
      <div class="nav-back disabled j-back" aria-label="back link">
          <i class="nav-fas btn-round btn-tint-dark fas fa-angle-left"></i> Back
      </div>
  `,
  linkBackORIGINAL: `
    <div class="-list-group ${classNavItem}">
      <div class="-list-group-item nav-back disabled j-back" aria-label="back link">
          <i class="nav-fas btn-round btn-tint-dark fas fa-angle-left"></i> Back
      </div>
    </div>
  `,
  navCarousel: function(data){
    return `
    <div class='container p-0'>
      <div class="row justify-content-end d-none">
        <div class="col col-12 col-sm-6">
            ${templates.linkBack}
        </div>
      </div>

      <div id="nav_carousel" class="carousel slide nav_carousel" data-ride="false" data-interval="false">
        <div class="carousel-inner">
          ${
            templates.navCarouselItem(
              {
                carouselItemIndex: currentIndex,
                parentData: data.parentData,
                links: data.links.map((navItem,index) => {
                  let linkData = {
                    data: navItem,
                    thisLinkCount: index
                  }
                  return templates.sideNavTypes[navItem.type](linkData)
                }).join("")
              }
            )}
        </div>
      </div>
    </div>
    `
  }
}

function navSetTab(data){
  $(`.nav-item-${lastActiveNav}`).removeClass(classNavTabActive)
  $(`.nav-item-${data}`).addClass(classNavTabActive)
  lastActiveNav = data
}

function renderModalNav(data){
  $("body").removeClass(classBody)
  navSetTab(data.navTabIndex)
  const modal_data = {
    backdrop: true,
    title: data.modalTitle,
    body: data.modalBody,
    class: data.bodyClass
  }
  do_modal(modal_data)
}

function returnLastMenuData(data){
  let menuDataToUse = data
  clickedNavIndex.map(eachNavObjectIndex => {
    menuDataToUse = menuDataToUse[eachNavObjectIndex].children
  }).join("")
  return menuDataToUse
}

// moves nav carousel to next link group,
// based on last clicked link index
function goToCarouselNavMenu(data){

  console.log(169,data)

  $(`${nav_carousel_id} .carousel-inner`).append(
    templates.navCarouselItem({
      carouselItemIndex: currentIndex+1,
      parentData: data.parentData,
      links: returnLastMenuData(menuData).map((navItem,index) => {
        let linkData = {
          data: navItem,
          thisLinkCount: index
        }
        return templates.sideNavTypes[navItem.type](linkData)
      }).join("")
  }))
  $(nav_carousel_id).carousel(currentIndex+1)
}

$(document).ready(function ($) {

  // open mobile nav
  $(document).on("click", ".j-main-menu", function(e){
    resetModalNav()
    renderModalNav({
      modalTitle: templates.linkBack,
      modalBody: templates.navCarousel({
        parentData: {
          description: 'desc here',
          text: 'Explore'
        },
        links: menuData
      }),
      bodyClass: `${modal_side_class} ${modal_nav_class}`
    })
  })

  // open topnav menu
  $(document).on("click", ".j-t-menu", function(e){
    e.preventDefault()
    resetModalNav()
    const thisLinkLevel = Number(`${$(this).data("my-menu")}`)
    clickedNavIndex.push(thisLinkLevel)
    renderModalNav({
      modalTitle: templates.linkBack,
      modalBody: templates.navCarousel({
        parentData: menuData[thisLinkLevel].pageData,
        links: menuData[thisLinkLevel].children
      }),
      bodyClass: `modal-top`,
      navTabIndex: thisLinkLevel
    })
  })

  // Navigate through menu carousel
  $(document).on("click", ".j-menu", function(e){
    e.preventDefault();
    const thisLinkLevel = Number(`${$(this).data("my-menu")}`)
    const parentData = returnLastMenuData(menuData)[thisLinkLevel].pageData
    clickedNavIndex.push(thisLinkLevel)
    goToCarouselNavMenu({
      clickedIndex: thisLinkLevel,
      parentData: parentData
    })
  })

  $(document).on("click", ".j-nav-back", function(e){
    $(nav_carousel_id).carousel(currentIndex-1)
    clickedNavIndex.pop()
  })

  $(id_modal).bind("hidden.bs.modal", function(e) {
      $("body").removeClass("modal-top")
      resetModalNav()
  })

  var checkScrollBar = function(){
      $(this).scrollTop() > 1 ?
      $("body").addClass(classScrollActive) : $("body").removeClass(classScrollActive)
  }

})

$(document).on("slid.bs.carousel",nav_carousel_id,function(e){
  currentIndex = $(nav_carousel_id + ' div.active').index()
  $(`${nav_carousel_id} .item-${currentIndex+1}`).remove()
  navCarouselActive()
})

$(window).scroll(function () {
    if ($(window).scrollTop() > scroll_min) {
        if (scroll_top < ($(window).scrollTop())) {
            $(classNavMain).addClass("affix")
        } else {
            $(classNavMain).removeClass("affix")
        }
    } else {
        $(classNavMain).removeClass("affix")
    }
    scroll_top = $(window).scrollTop()
})
