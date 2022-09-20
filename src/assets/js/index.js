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
const nav_main_trigger = document.querySelector("#nav_mob")

function open_top_nav(e){

  //console.log('main nav ele clicked')
  const parent_ele = e.target.closest('.nav-item-has-submenu')
  const parent_ele_submenu = parent_ele.querySelector('.nav-item-submenu').innerHTML

  modal_vars.current_nav_carousel_index = 0

  actions.do_modal_nav({
    title: templates.modal_nav_back_link,
    classBody: modal_vars.modal_nav_class,
    backdrop: true,
    body: templates.modal_nav_carousel({
      left: "topnav stuff on the left",
      right: templates.sub_menu(parent_ele_submenu)
    })
  })
}

function nav_carousel_next(e){
  //console.log('modal nav ele clicked')
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
    left: "left stuff carousel",
    right: templates.sub_menu(parent_ele_submenu)
  })
  modal_nav_carousel_inner.appendChild(new_carousel_item)
  modal_vars.active_carousel_element.to(modal_vars.current_nav_carousel_index)
  actions.nav_carousel_button_enable[modal_vars.current_nav_carousel_index > 0]()
}
// GLOBAL LISTENER FOR CHILD MENU TRIGGERS
document.addEventListener('click',function(e){

  if(e.target && e.target.classList.contains('jam-js-trigger')){
    //
    e.preventDefault();
    const this_element = e.target
    this_element.closest(`#${modal_vars.id_nav_main}`) ?
    open_top_nav(e) :
    nav_carousel_next(e)

  }
})

nav_main_trigger.addEventListener("click", () => {
  console.log("nav_main_trigger clicked.")
  functions.nav_main()
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
      // actions.modal_close()

      actions.do_modal(data)
      modal_vars.nav_back_btn = document.getElementById(modal_vars.id_nav_back)
      // listen for back click
      modal_vars.nav_back_btn.addEventListener('click', function (event) {
          actions.nav_carousel_back[modal_vars.current_nav_carousel_index > 0]()
      })

      // modal_vars.main_nav_active = false
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

const functions = {

  nav_top: function(data){
    const parent_ele = e.target.closest('.nav-item-has-submenu')
    const parent_ele_submenu = parent_ele.querySelector('.nav-item-submenu').innerHTML

    actions.do_modal_nav({
      title: templates.modal_nav_back_link,
      classBody: modal_vars.modal_nav_class,
      backdrop: true,
      body: templates.modal_nav_carousel({
        left: "topnav stuff on the left",
        right: templates.sub_menu(parent_ele_submenu)
      })
    })
  },

  // MAIN MENU
  nav_main: function(){

    const main_nav_links = document.getElementById(modal_vars.id_nav_main).innerHTML

    actions.do_modal_nav({
      title: templates.modal_nav_back_link,
      classBody: modal_vars.modal_nav_class,
      backdrop: true,
      body: "main nav" + templates.modal_nav_carousel({
        left: "Explore site",
        right: templates.sub_menu(main_nav_links)
      })
    })
  },
  nav_has_children: function(e){

    const parent_ele = e.target.closest('.nav-item-has-submenu')
    const parent_ele_submenu = parent_ele.querySelector('.nav-item-submenu').innerHTML

    !document.querySelector("#body").classList.contains(modal_vars.modal_nav_class) ?
    (
      actions.do_modal_nav({
        title: templates.modal_nav_back_link,
        classBody: modal_vars.modal_nav_class,
        backdrop: true,
        body: templates.modal_nav_carousel({
          left: "topnav stuff on the left",
          right: templates.sub_menu(parent_ele_submenu)
        })
      })
    ) :
    actions.nav_carousel_next({
      carousel_item_index: modal_vars.current_nav_carousel_index,
      left: "left stuff TRUE" + modal_vars.current_nav_carousel_index,
      right: templates.sub_menu(parent_ele_submenu)
    })
  }
}
