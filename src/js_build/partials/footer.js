const modal = require("./modal.js")

function footer(data){return `
  <footer class="footer py-4" role="contentinfo">
      <div class="container">
          Footer
      </div>
  </footer>
  ${modal(data)}
  `};

module.exports = footer;
