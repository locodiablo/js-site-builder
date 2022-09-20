const vars = require("../vars.js");
const paths = require("../paths.js");
const nav_breadcrumb = require("../partials/nav_breadcrumb.js");
const dirTree = require("directory-tree");
const menuData = require("../menu_data.js");

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
    return `
    <li class="${vars.css_classes.nav.nav_item} ${vars.css_classes.nav.nav_item}-${data.name.replace(".js","")} ${data.children ? vars.css_classes.nav.has_sub_menu : 'no-kids'}" >
      <a href="${local_path}" class="${vars.css_classes.nav.nav_item_link} ${data.children ? `js-trigger js-has-sub-menu` :''}" ${data.children ? `data-js-function="nav_has_children"` :''}>${this_page_data.config.nav_text}</a>
      ${data.children ? render.nav_sub_menu(data.children) : ''}
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
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="${vars.css_classes.containers.default}">
      <a class="navbar-brand" href="${paths.urlHome}">${vars.site_name_full}</a>

      <span id="nav_mob" class="navbar-toggler" aria-controls="" aria-expanded="false" aria-label="Toggle navigation" data-------js-function="nav_main">
        <span class="navbar-toggler-icon"></span>
      </span>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="nav-items navbar-nav ml-auto" id="nav-main">
          ${render.nav_items(menuData)}
        </ul>

      </div>
    </div>
  </nav>
  ${nav_breadcrumb(data)}
`};

module.exports = navbar;
