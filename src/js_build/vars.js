const site_domain = "site-name.com";
const paths = require("../js_build/paths")
const today = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const leadingZero = function(data){
  let leader = ''
  data < 10 ? leader = "0" + data : leader = data
  return leader
}
const vars = {
  site_url: `www.${site_domain}`,
  site_name: "SiteNameHere",
  site_name_full: "SiteNameHere Ltd",
  site_email: `simon@${site_domain}`,
  site_domain: site_domain,
  site_cv_caption: "Web and brand creative",
  buildDate: `${leadingZero(today.getHours())}${leadingZero(today.getMinutes())}-${leadingZero(today.getDate())}${months[today.getMonth()].substring(0,3).toUpperCase()}${today.getFullYear()}`,
  date: {
    year: today.getFullYear()
  }
}

module.exports = vars;
