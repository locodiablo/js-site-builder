const modal = require("./modal.js")
const defaults = require("../defaults.js")
const vars = require("../vars.js")

function footer(data){return `
  <footer class="footer py-4" role="contentinfo">
      <div class="container">
          &copy;${vars.date.year} ${defaults.site_name_full} All rights reserved.
      </div>
  </footer>
  ${modal(data)}
  `};

module.exports = footer;
