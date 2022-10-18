const vars = require("../vars.js");
// const test_data = require("../../assets/js/data-a.js");

const paths = require("../paths.js");
const nav_breadcrumb = require("../partials/nav_breadcrumb.js");
const dirTree = require("directory-tree");
const menuData = require("../menu_data.js");
const config = require("../site-config.json");
//console.log("config build:",config.test)

const render = {
  nav_sub_menu: function(data){
    return `
    <ul class="${vars.css_classes.nav.sub_menu}">
      ${data.map(nav_item => {
        return render.nav_item(nav_item)
      }).join("")}
    </ul>
    `
  },
  nav_item: function(data){
    const local_path = data.path.replace(paths.definitionsDir,"")
    const require_path = data.type == "directory" ? `../page_definitions${local_path}/index.js` : `../page_definitions${local_path}`
    const this_page_data = require(require_path);
    const has_children = data.children ? data.children.length > 1 ? true : false : false
    return `
    <li class="${vars.css_classes.nav.nav_item} ${vars.css_classes.nav.nav_item}-${data.name.replace(".js","")} ${has_children ? vars.css_classes.nav.has_sub_menu : 'no-child-pages'}" >
      <a href="${local_path}" class="${vars.css_classes.nav.nav_item_link} ${has_children ? ` js-has-sub-menu` :''}">${this_page_data.config.nav_text}</a>
      ${has_children ? render.nav_sub_menu(data.children) : ''}
    </li>
    `
  },
  nav_items: function(data){
    return data.map(nav_item => {
      return render.nav_item(nav_item)
    }).join("")
  }
}

function navbar(data,incomingMenuData){return `
  <nav class="navbar navbar-expand-sm bg-light fixed-top py-0">
    <div class="${vars.css_classes.containers.default}">
      <a class="navbar-brand" href="${paths.urlHome}">${vars.site_name_full}</a>

      <span id="nav-mob" class="navbar-toggler order-last" aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </span>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav-items navbar-nav ms-auto" id="nav-main">
          ${render.nav_items(menuData)}
        </ul>
      </div>

      <ul class="navbar-nav navbar-selections navbar-expand">
        <li class="nav-item">
          <a id="nav-contact" href="#" class="nav-item-link">
            Contact
          </a>
        </li>
      </ul>

    </div>
  </nav>
  ${nav_breadcrumb(data)}
`};

module.exports = navbar;
