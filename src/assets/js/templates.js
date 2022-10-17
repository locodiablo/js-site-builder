import { modal_vars } from "./modal_vars.js";

const templates = {
  sub_menu: function(data){
    return `<ul class="nav-items nav-item-submenu">${data}</ul>`
  },
  modal_nav_title: function(data){
    return `
    <h2>${data}</h2>
    `
  },
  modal_left_content: function(data){
    return `
      <div class="nav-carousel-caption">
        ${data}
      </div>
    `
  },
  modal_nav_back_link: `
      <button id="nav_back" class="nav-back disabled js-action" aria-label="back link">
          <i class=""></i> Back
      </button>
  `,
  modal_nav_carousel_item_inner: function(data){
      return `
      <div class="row align-items-center">
          <div class="d-none d-sm-block col-sm-4 offset-sm-1">
              ${data.left}
          </div>
          <div class="col-12 col-sm-6 offset-sm-1">
              ${data.right}
          </div>
      </div>
      `
  },
  modal_nav_carousel_item: function(data){
      return `
      <div id="nav-carousel-item-${modal_vars.current_nav_carousel_index}" class="carousel-item item-${modal_vars.current_nav_carousel_index} ${modal_vars.current_nav_carousel_index == 0 ? 'active' : ''}">
          ${templates.modal_nav_carousel_item_inner(data)}
      </div>
      `
  },
  modal_nav_carousel: function(data){
      return `
      <div class='container p-0'>
          <div class="row justify-content-end d-none">
              <div class="col col-12 col-sm-6">
                  ${templates.modal_nav_back_link}
              </div>
          </div>
          <div id="nav_carousel" class="carousel slide nav_carousel" data-bs-ride="false" data-bs-interval="false" data-bs-swipe="false" data-bs-wrap="false">
              <div class="carousel-inner" id="nav_carousel_inner">
                  ${templates.modal_nav_carousel_item(data)}
              </div>
          </div>
      </div>
      `
  },
  modal_search: function(data){
    return `
    <div class='container p-0'>
        <div class="row justify-content-end d-none--">
            <div class="col col-12 col-sm-6">
                Search
            </div>
        </div>
    </div>
    `
  }
}

export {templates};
