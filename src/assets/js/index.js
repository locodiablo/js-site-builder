"use strict";

const id_modal = "#myModal"
const id_cover_bg = ".jumbotron-cover"
const id_top_nav_desc = "topNavDesc"
const modal_side_class = "modal-side"
const modal_nav_class = "modal-nav"
const modal_demo_class = "modal-demo"
const classScrollActive = 'scrollActive'
const classNavBackDefaults = "list-group-item nav-back"//nav-item nav-back disabled j-back
const classNavMain = ".nav-main-wrapper"
const classNavItem = "nav-list-group"
const scroll_min = 40
const classNavTabActive = "nav-t-active"
let scroll_top = 0
const transition_interval = 1200
const nav_carousel_id = ".nav_carousel"
const idNavBack = ".nav-back"
let clickedNavIndex = []
let arrayOfMenuGroups = []
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
  arrayOfMenuGroups = []
  navCarouselActive()
  clearModalOnClose()
  $(`.nav-item-${lastActiveNav}`).removeClass(classNavTabActive)
}

function setModalNavMenuDesc(data){
  $(`#${id_top_nav_desc}`).html(data)
}

const templates = {
  sideNavSlide: function(data){
    return `
    <div class="carousel-item item-${data.count}">
      ${data.content}
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
    file: function(incomingLinkData){
      // do nothing
    }
  },
  sideNavCarousel: function(data){
    return `
    <div class="list-group ${classNavItem}">
      <div class="list-group-item nav-back disabled j-back" aria-label="back link">
          <i class="nav-fas btn-round btn-tint-dark fas fa-angle-left"></i> Back
      </div>
    </div>
    <div id="nav_carousel" class="carousel slide nav_carousel" data-ride="false" data-interval="false">
      <div class="carousel-inner">
        <div class="carousel-item item-0 active">
          <div class="list-group ${classNavItem}">
            ${data.map((navItem,index) => {
              let linkData = {
                data: navItem,
                thisLinkCount: index
              }
              return templates.sideNavTypes[navItem.type](linkData)
            }).join("")}
          </div>
        </div>
      </div>
    </div>
    `
  },
  topNavCarousel: function(data){
    return `
    <div class='container p-0'>
      <div class="row align-items-center">
        <div class="col-12 col-sm-6" id="${id_top_nav_desc}"></div>
        <div class="col-12 col-sm-6">
          ${data}
        </div>
      </div>
    </div>`
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

function goToCarouselNavMenu(incomingLinkLevel){
  let lastIndex = arrayOfMenuGroups.length-1
  $(`${nav_carousel_id} .carousel-inner`).append(templates.sideNavSlide({
    count: currentIndex+1,
    content: arrayOfMenuGroups[lastIndex].map((eachLink,index) => {
      let linkData = {
        data: eachLink,
        thisLinkCount: index,
        navLevel: index
      }
      return templates.sideNavTypes[eachLink.type](linkData)
    }).join('')
  }))
  //console.log('lastIndex',lastIndex,arrayOfMenuGroups[lastIndex])
  $(nav_carousel_id).carousel(currentIndex+1)
}

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)
}

const toggleContact = {
  mobtrue: function(data){
    $(".contact-info").addClass("d-none")
    $(".contact-actions").removeClass("d-none")
  },
  mobfalse: function(data){
    $(".contact-info").removeClass("d-none")
    $(".contact-actions").addClass("d-none")
  }
}
$(document).ready(function ($) {

  // open mobile nav
  $(document).on("click", ".j-main-menu", function(e){
    resetModalNav()
    arrayOfMenuGroups.push(menuData)
    renderModalNav({
      modalTitle: "Explore",
      modalBody: templates.sideNavCarousel(arrayOfMenuGroups[0]),
      bodyClass: `${modal_side_class} ${modal_nav_class}`
    });
  });

  // open topnav menu
  $(document).on("click", ".j-t-menu", function(e){
    e.preventDefault()
    resetModalNav()
    const thisLinkLevel = `${$(this).data("my-menu")}`
    arrayOfMenuGroups.push(menuData)
    arrayOfMenuGroups.push(menuData[thisLinkLevel].children)
    renderModalNav({
      modalTitle: `${$(this).text()}`,
      modalBody: templates.topNavCarousel(templates.sideNavCarousel(menuData[thisLinkLevel].children)),
      bodyClass: `modal-top`,
      navTabIndex: thisLinkLevel
    })
    setModalNavMenuDesc(menuData[thisLinkLevel].pageData.description)
  })

  // Navigate through menu carousel
  $(document).on("click", ".j-menu", function(e){
    e.preventDefault();
    let lastIndex2 = arrayOfMenuGroups.length-1
    const thisLinkLevel = `${$(this).data("my-menu")}`
    setModalNavMenuDesc(arrayOfMenuGroups[lastIndex2][thisLinkLevel].pageData.description)
    arrayOfMenuGroups.push(arrayOfMenuGroups[lastIndex2][thisLinkLevel].children)
    goToCarouselNavMenu(thisLinkLevel)
  });

  $(document).on("click", ".j-nav-back", function(e){
    $(nav_carousel_id).carousel(currentIndex-1)
    arrayOfMenuGroups.pop()
    let lastIndex2 = arrayOfMenuGroups.length-1
  });

  $(".j-toggle-content").click(function(e) {
    let thisCount = $(this).attr("data-count");
    $(`.timeSlot-${thisCount}`).toggleClass("active");
    $(`.timeSlot-${thisCount} .trigger-wrapper .fas`).toggleClass("fa-plus")
    $(`.timeSlot-${thisCount} .trigger-wrapper .fas`).toggleClass("fa-minus")
  });

  $(".j-ui-demo-v1").click(function(e){
    const data = {
      title: "UI Demo v1",
      body: "demo code here",
      class: modal_demo_class,
      backdrop: true
    }
    do_modal(data)
  })

  $(id_modal).bind("hidden.bs.modal", function(e) {
      $("body").removeClass("modal-top")
      resetModalNav()
  });

  var checkScrollBar = function(){
      $(this).scrollTop() > 1 ?
      $("body").addClass(classScrollActive) : $("body").removeClass(classScrollActive)
  }

  toggleContact[`mob${isMobileDevice()}`]()

});

$(document).on("slid.bs.carousel",nav_carousel_id,function(e){
  currentIndex = $(nav_carousel_id + ' div.active').index()
  $(`${nav_carousel_id} .item-${currentIndex+1}`).remove()
  navCarouselActive()
});

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
});
