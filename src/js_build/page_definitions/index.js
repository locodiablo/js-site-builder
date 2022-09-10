const vars = require("../vars.js")

const content = {
  config: {
    html_template: "template_page_home",
    nav_text: "Services",
    body_class: "services"
  },
  head: {
    title: vars.site_name_full,
    description: `Welcome to the ${vars.site_name_full} website: Explore our services`
  },
  body: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ],
  footer: []
};

module.exports = content;
