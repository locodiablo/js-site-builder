// index
import { Modal } from './bootstrap.esm.min.js';
console.log('Modal',Modal)
import { Carousel } from './bootstrap.esm.min.js';
import { modal_vars } from "./modal_vars.js";
//import { templates } from "./templates.js";

let jam = "spoon"
let modal_ele = document.getElementById(modal_vars.id_modal)
console.log('modal_ele',modal_ele)
const html_body = document.getElementById(`${modal_vars.id_body}`)
const modal_title = document.getElementById(`${modal_vars.id_modal}-title`)
const modal_body = document.getElementById(`${modal_vars.id_modal}-body`)
const modal_footer = document.getElementById(`${modal_vars.id_modal}-footer`)
let classBody = ""
let backdrop_active = false

// GLOBAL LISTENER
document.addEventListener('click',function(e){
  if(e.target && e.target.classList.contains('js-trigger')){
    //
    e.preventDefault();
    e.target.hasAttribute("data-js-function") ?
    (
      e.preventDefault(),
      console.log('attempt',e.target.getAttribute("data-js-function")),
      functions[e.target.getAttribute("data-js-function")](e)
    ) : ''
  }
})

// CLOSE MODAL
modal_ele.addEventListener('hidden.bs.modal', function (event) {
  actions.modal_close()
})

const actions = {

    modal_close: function(){
        modal_title.innerHTML = ""
        modal_body.innerHTML = ""
        html_body.classList.remove(classBody)
        backdrop_active = false
        modal_vars.main_nav_active = false
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
          backdrop: backdrop_active == false ? true : false
        });

        backdrop_active = true
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
    }
  }

const functions = {
  // MAIN MENU
  nav_main: function(){
    console.log('main nav 2')
    actions.do_modal({
      title: "jam",
      body: "body stuff here",
      classBody: "modal-nav"
    })
    // actions.do_modal_nav({
    //   title: templates.modal_nav_back_link,
    //   classBody: modal_vars.modal_nav_class,
    //   backdrop: true,
    //   body: "main nav" + templates.modal_nav_carousel({
    //     left: "Explore our private healthcare services",
    //     right: return_sub_menu_links("navbar_main")
    //   })
    // })
    // modal_vars.main_nav_active = true
  },
}

// modal vars
