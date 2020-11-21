"use strict";

const id_modal = "#myModal"
const id_cover_bg = ".jumbotron-cover"
const modal_side_class = "modal-side"
const modal_nav_class = "modal-nav"
const modal_demo_class = "modal-demo"
const classScrollActive = 'scrollActive'
const classNavBackDefaults = "nav-item nav-back"//nav-item nav-back disabled j-back
const classNavMain = ".nav-main-wrapper"
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
  $(id_modal + " .modal-body").removeClass("pad-0")
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
      <div class="nav-item nav-dir nav-item-${incomingLinkData.thisLinkCount}" data-href="${navUrl}">
        <a class="nav-item-link ${incomingLinkData.exploreClass}" data-my-menu="${incomingLinkData.thisLinkCount}" href="${navUrl}">
          ${incomingLinkData.data.pageData.text}
          ${incomingLinkData.data.children.length > 1 ? '<i class="nav-fas fas fa-angle-right"></i>' : ''}
        </a>
      </div>
      `
    },
    file: function(incomingLinkData){
      // do nothing
    }
  },
  sideNavCarousel: function(data){
    return `
    <div class="row m-0 nav-main-controls">
      <div class="nav-item nav-back disabled j-back">
        <div class="nav-item-link" aria-label="back link">
          <i class="nav-fas btn-round btn-tint-dark fas fa-angle-left"></i> Back
        </div>
      </div>
      <div class="nav-item nav-contact">
        <a href="/about/contact/" class="nav-item-link">
          <span class="nav-fas btn-round btn-tint-dark btn-round-split-x">
            <div class="btn-round-split fas fa-envelope"></div>
            <div class="btn-round-split fas fa-phone"></div>
          </span>
        </a>
      </div>
    </div>
    <div id="nav_carousel" class="carousel slide nav_carousel" data-ride="false" data-interval="false">
      <div class="carousel-inner">
        <div class="carousel-item item-0 active">
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
    `
  },
  topNavCarousel: function(data){
    return `<div class='container'>${data}</div>`
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

const setLight = {
  am: function(data){
    let trans = data/100
    $(".j-midnightFade").css("opacity",1-(trans*2))
    $(".cover-img-0").css("opacity",0.75+(trans/2))
  },
  pm: function(data){
    let trans = data/100
    $(".j-midnightFade").css("opacity",((trans-.5)*2))
    $(".cover-img-0").css("opacity",1.25-(trans/2))
  }
}

function splitTime(data){
  data < 50 ? setLight.am(data) : setLight.pm(data)
}

let theTime = ''

function getTime(){
  const t = new Date()
  const h = t.getHours()
  let m = t.getMinutes()
  m < 10 ? m = '0' + m : m = m
  theTime = "" + h + m
  theTime = Number(theTime)/24
  splitTime(theTime)
  $(".j-toggle-cover").val(theTime)
}

function startDay(){
  getTime()
    setInterval(function () {
        getTime()
    }, 5000);
}

$(document).ready(function ($) {

  if($("#j-midnightFade").length){
    startDay();
    var slider = document.getElementById("j-toggle-cover")
    slider.oninput = function() {
      splitTime(this.value)
    }
  }

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
      bodyClass: `top-modal-class`,
      navTabIndex: thisLinkLevel
    });
  });

  // Navigate through menu carousel
  $(document).on("click", ".j-menu", function(e){
    e.preventDefault();
    let lastIndex2 = arrayOfMenuGroups.length-1
    const thisLinkLevel = `${$(this).data("my-menu")}`
    console.log(arrayOfMenuGroups[lastIndex2][thisLinkLevel].pageData.text)
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
      $("body").removeClass("top-modal-class")
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
  //console.log('currentIndex',currentIndex)
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
