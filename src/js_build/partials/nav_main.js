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
    <li class="${vars.css_classes.nav.nav_item} ${data.children ? vars.css_classes.nav.has_sub_menu : 'no-kids'}">
      <a href="${local_path}" class="${vars.css_classes.nav.nav_item_link}">${this_page_data.config.nav_text}</a>
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
    <div class="container p-0">
      <a class="navbar-brand" href="${paths.urlHome}">${vars.site_name_full}</a>

      <span class="navbar-toggler j-main-menu" aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </span>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-item-link" href="${paths.urlHome}">Home <span class="sr-only">(current)</span></a>
          </li>
          ${render.nav_items(menuData)}
        </ul>

      </div>
    </div>
  </nav>
  ${nav_breadcrumb(data)}
`};

module.exports = navbar;
