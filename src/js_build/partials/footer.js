const modal = require("./modal.js")
const vars = require("../vars.js")

function footer(data){return `
  <footer class="footer py-4" role="contentinfo">

    <div class="${vars.css_classes.containers.default}">

      <div class="row pt-3 px-3 mt-4 px-sm-0 justify-content-center align-items-center">

        <div class="col-12 col-xl-9">
          footer links
        </div>

        <div id="nav-footer-contact" class="col-12 col-xl-3">

          <div class="my-3">
            <p>
              09:00 - 18:00 <span class="ml-2 fg-olive">Open now</span>
            </p>

            <div class="row my-3">
              <div class="col col-6">
                <a href="/about/contact" class="d-block py-2 btn btn-light">
                  <div class="site-icon my-2 icon-location"></div>
                  Find us
                </a>
              </div>

              <div class="col col-6">
                <a href="#" class="d-block py-2 btn btn-light">
                  <div class="site-icon my-2 icon-phone"></div>
                  Call
                </a>
              </div>

            </div>

            <a href="mailto:info@onewelbeck.com" class="d-block py-2 btn my-3 btn-light">
              <span class="site-icon icon-envelope fg-white mr-2"></span>
              info@the-site.com
            </a>
          </div>

          <div class="my-3">
            <h3 class="my-3 text-left fg-white">Address</h3>
            <p>
            ${vars.site_address_full.map(eachLine => `${eachLine}`).join("<br>")}
            </p>

            <h3 class="fg-white pt-4 my-2">
              Talk to us online:
            </h3>

            <p class="small text-muted fg-white">(You may need to login)</p>
            <div class="text-left pb-4">

              <span class="btn btn-outline-white mr-3">
                <span class="site-icon fg-white icon-facebook"></span>
              </span>

              <span class="btn btn-outline-white mr-3">
                <span class="site-icon fg-white icon-linkedin1"></span>
              </span>

              <span class="btn btn-outline-white mr-3">
                <span class="site-icon fg-white icon-twitter"></span>
              </span>

              <span class="btn btn-outline-white mr-3">
                <span class="site-icon fg-white icon-instagram"></span>
              </span>

            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="${vars.css_classes.containers.default}">
      &copy;${vars.date.year} ${vars.site_name_full}. All rights reserved.
    </div>

  </footer>
  ${modal(data)}
  `};

module.exports = footer;
