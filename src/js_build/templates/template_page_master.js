const dochead = require("../partials/head");
const nav_main = require("../partials/nav_main");
const footer = require("../partials/footer");

function template_home(data){
return `
${dochead(data)}
<body id="body" class="page-basic ${data.config.body_class ? data.config.body_class : ''}" data-tpb="${data.pageContentUrl}">
  ${nav_main(data)}
  ${data.body}
  ${footer(data)}
  ${data.scripts ? data.scripts : ''}
  <script charset="utf-8" src="/assets/js/index.js?${Date.now()}" type="module"></script>
</body>
</html>
`}
module.exports = template_home;
