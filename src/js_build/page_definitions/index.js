const defaults = require("../defaults.js")

const content = {
  config: {
    html_template: "template_page_home",
    nav_text: "Questions",
    body_class: "demo-questions"
  },
  head: {
    title: defaults.site_name_full,
    description: `Welcome to the ${defaults.site_name_full} website: Start your insurance quote here!`
  },
  body: [
    "questions here",
    "other stuff here"
  ],
  footer: []
};

module.exports = content;
