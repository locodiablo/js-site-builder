const modal = require("./modal.js")
const vars = require("../vars.js")

function footer(data){return `
  <footer class="footer py-4" role="contentinfo">
      <div class="container">
          &copy;${vars.date.year} ${vars.site_name_full}. All rights reserved.
      </div>
  </footer>
  ${modal(data)}
  `};

module.exports = footer;
