// index
import { Modal } from './bootstrap.esm.min.js';
import { Carousel } from './bootstrap.esm.min.js';
import { modal_vars } from "./modal_vars.js";
import { templates } from "./templates.js";

let classBody = ""
let modal_ele = document.getElementById(modal_vars.id_modal)
const html_body = document.getElementById(`${modal_vars.id_body}`)
const modal_title = document.getElementById(`${modal_vars.id_modal}-title`)
const modal_body = document.getElementById(`${modal_vars.id_modal}-body`)
const modal_footer = document.getElementById(`${modal_vars.id_modal}-footer`)
const nav_main_trigger = document.getElementById(`${modal_vars.id_nav_mobile}`)
const nav_contact_trigger = document.getElementById(`${modal_vars.id_nav_contact}`)

const nav_actions = {

  open_mobile_nav: function(data){

    const main_nav_links = document.getElementById(modal_vars.id_nav_main).innerHTML
    actions.do_modal_nav({
      title: templates.modal_nav_back_link,
      classBody: modal_vars.modal_nav_class,
      backdrop: true,
      body: templates.modal_nav_carousel({
        left: "Main nav explore",
        right: templates.sub_menu(main_nav_links)
      })
    })

  },

  open_contact_nav: function(data){

    const main_contact_links = document.getElementById(modal_vars.id_nav_footer_contact).innerHTML
    actions.do_modal({
      title: "Contact",
      classBody: modal_vars.modal_nav_class,
      backdrop: true,
      body: `
        <div class='container py-4'>
          ${main_contact_links}
        </div>`
    })
  },
  open_top_nav: function(e){

    const parent_ele = e.target.closest('.nav-item-has-submenu')
    const parent_ele_submenu = parent_ele.querySelector('.nav-item-submenu').innerHTML
    modal_vars.current_nav_carousel_index = 0
    actions.do_modal_nav({
      title: templates.modal_nav_back_link,
      classBody: modal_vars.modal_nav_class,
      backdrop: true,
      body: templates.modal_nav_carousel({
        left: "Top nav explore",
        right: templates.sub_menu(parent_ele_submenu)
      })
    })
  },
  nav_carousel_next: function(e){

    const parent_ele = e.target.closest('.nav-item-has-submenu')
    const parent_ele_submenu = parent_ele.querySelector('.nav-item-submenu').innerHTML
    modal_vars.current_nav_carousel_index ++
    let modal_nav_carousel = document.getElementById(modal_vars.id_nav_carousel)
    modal_vars.active_carousel_element = new Carousel(modal_nav_carousel,{
        interval: false,
        wrap: false
    })
    let modal_nav_carousel_inner = document.querySelector(`#${modal_vars.id_nav_carousel_inner}`)
    const new_carousel_item = document.createElement('div')
    new_carousel_item.className = `carousel-item nav-carousel-item-${modal_vars.current_nav_carousel_index} item-${modal_vars.current_nav_carousel_index} ${modal_vars.current_nav_carousel_index == 0 ? 'active' : ''}`
    new_carousel_item.id = `nav-carousel-item-${modal_vars.current_nav_carousel_index}`
    new_carousel_item.innerHTML = templates.modal_nav_carousel_item_inner({
      left: templates.modal_left_content("Child nav explore"),
      right: templates.sub_menu(parent_ele_submenu)
    })
    modal_nav_carousel_inner.appendChild(new_carousel_item)
    modal_vars.active_carousel_element.to(modal_vars.current_nav_carousel_index)
    actions.nav_carousel_button_enable[modal_vars.current_nav_carousel_index > 0]()
  }

}

// GLOBAL LISTENER FOR MOBILE NAV
nav_main_trigger.addEventListener("click", () => {
  console.log("nav_main_trigger clicked.")
  nav_actions.open_mobile_nav()
})

// GLOBAL LISTENER FOR CONTACT NAV
nav_contact_trigger.addEventListener("click", () => {
  console.log("nav_contact_trigger clicked.")
  nav_actions.open_contact_nav()
})

// GLOBAL LISTENER FOR CHILD MENU TRIGGERS
document.addEventListener('click',function(e){

  if(e.target && e.target.classList.contains('js-has-sub-menu')){
    //
    e.preventDefault();
    const this_element = e.target
    this_element.closest(`#${modal_vars.id_nav_main}`) ?
    nav_actions.open_top_nav(e) :
    nav_actions.nav_carousel_next(e)

  }
})

// CLOSE MODAL
modal_ele.addEventListener('hidden.bs.modal', function (event) {
  actions.modal_close()
})

const actions = {

  nav_carousel_button_enable: {
  // Carousel can go back
     true: function(){
         console.log('enable back button')
         modal_vars.nav_back_btn.className = "nav-back j-nav-back"
     },
     // NO carousel back
     false: function(){
         console.log('disable back button ')
         modal_vars.nav_back_btn.className = "nav-back disabled"
     }
  },
  return_sub_menu_links: function(data){
    return templates.sub_menu(document.getElementById(data).innerHTML)
  },
  modal_close: function(){
      modal_title.innerHTML = ""
      modal_body.innerHTML = ""
      html_body.classList.remove(classBody)
      modal_vars.modal_backdrop_active = false
      modal_vars.current_nav_carousel_index = 0
  },
  nav_carousel_back: {
      true: function(){
          modal_vars.current_nav_carousel_index --
          modal_vars.active_carousel_element.to(modal_vars.current_nav_carousel_index)
          const item_to_destroy = document.getElementById(`nav-carousel-item-${modal_vars.current_nav_carousel_index+1}`)
          item_to_destroy.remove()
          actions.nav_carousel_button_enable[modal_vars.current_nav_carousel_index > 0]()
      },
      false: function(){
          actions.nav_carousel_button_enable[modal_vars.current_nav_carousel_index > 0]()
      }
  },
  do_modal: function(data){

      classBody = data.classBody;
      html_body.classList.add(classBody)

      modal_title.innerHTML = data.title
      modal_body.innerHTML = data.body

      data.footer ? id_modal_footer.innerHTML = data.footer : "";
      var theModal = new Modal(modal_ele, {
        backdrop: modal_vars.modal_backdrop_active == false ? true : false
      });

      modal_vars.modal_backdrop_active = true
      theModal.show();
      modal_vars.nav_back_btn = document.getElementById(modal_vars.id_nav_back)
  },
  do_modal_nav: function(data){

    actions.do_modal(data)
    modal_vars.nav_back_btn = document.getElementById(modal_vars.id_nav_back)
    // listen for back click
    modal_vars.nav_back_btn.addEventListener('click', function (event) {
        actions.nav_carousel_back[modal_vars.current_nav_carousel_index > 0]()
    })

  },
  nav_carousel_next: function(data){

    modal_vars.current_nav_carousel_index ++
    let modal_nav_carousel = document.getElementById(modal_vars.id_nav_carousel)

    modal_vars.active_carousel_element = new Carousel(modal_nav_carousel,{
        interval: false,
        wrap: false
    })

    let modal_nav_carousel_inner = document.querySelector(`#${modal_vars.id_nav_carousel_inner}`)
    const new_carousel_item = document.createElement('div')
    new_carousel_item.className = `carousel-item nav-carousel-item-${modal_vars.current_nav_carousel_index} item-${modal_vars.current_nav_carousel_index} ${modal_vars.current_nav_carousel_index == 0 ? 'active' : ''}`
    new_carousel_item.id = `nav-carousel-item-${modal_vars.current_nav_carousel_index}`
    new_carousel_item.innerHTML = templates.modal_nav_carousel_item_inner(data)
    modal_nav_carousel_inner.appendChild(new_carousel_item)
    modal_vars.active_carousel_element.to(modal_vars.current_nav_carousel_index)
    actions.nav_carousel_button_enable[modal_vars.current_nav_carousel_index > 0]()
  }
}
