const modal = require("./modal.js")
const vars = require("../vars.js")

function footer(data){return `
  <footer class="footer py-4" role="contentinfo">

    <div class="${vars.css_classes.containers.default}">

      <div class="row pt-3 px-3 mt-4 px-sm-0 justify-content-center align-items-start">

        <div class="col-12 col-md-4 col-lg-6">
          <h3 class="mb-3 text-left fg-white">Explore</h3>
          footer links
        </div>

        <div class="col-12 col-md-8 col-lg-6" id="nav-footer-contact">

          <div class="row">

            <div class="col-12 order-sm-last col-sm-6 col-md-8-col-lg-6">

              <div class="row my-4">

                <div class="col col-6">
                  <a href="/about/contact" class="d-block py-2 btn btn-light">
                    <div class="site-icon my-2 icon-location"></div>
                    Find us
                  </a>
                </div>

                <div class="col col-6">
                  <a href="tel:${vars.site_tel}" class="d-block py-2 btn btn-light">
                    <div class="site-icon my-2 icon-phone"></div>
                    Call
                  </a>
                </div>

              </div>

              <a href="mailto:${vars.site_email}" class="d-block py-2 btn my-3 btn-light">
                <span class="site-icon icon-envelope fg-white mr-2"></span>
                info@the-site.com
              </a>

              <p>Mon - Fri: 08:30 - 17:00</p>
              <p>​​Sat: 08:30 - 11:30</p>
              <p>Sun: Closed</p>

            </div>

            <div class="col-12 col-sm-6 col-md-4-col-lg-6">

              <div class="mb-4">
                <h3 class="mb-3 text-left fg-white">Address</h3>
                <p>
                ${vars.site_address_full.map(eachLine => `${eachLine}`).join("<br>")}
                </p>
              </div>

            </div>
          </div>


        </div>



        <div id="---nav-footer-contact" class="col-12 col-xl-6" style="display: none">

          <div class="my-4">
            <p>
              09:00 - 18:00 <span class="ml-2 fg-olive">Open now</span>
            </p>

            <div class="row my-4">

              <div class="col col-6">
                <a href="/about/contact" class="d-block py-2 btn btn-light">
                  <div class="site-icon my-2 icon-location"></div>
                  Find us
                </a>
              </div>

              <div class="col col-6">
                <a href="tel:${vars.site_tel}" class="d-block py-2 btn btn-light">
                  <div class="site-icon my-2 icon-phone"></div>
                  Call
                </a>
              </div>

            </div>

            <a href="mailto:${vars.site_email}" class="d-block py-2 btn my-3 btn-light">
              <span class="site-icon icon-envelope fg-white mr-2"></span>
              info@the-site.com
            </a>
          </div>

          <div class="my-4">
            <h3 class="my-3 text-left fg-white">Address</h3>
            <p>
            ${vars.site_address_full.map(eachLine => `${eachLine}`).join("<br>")}
            </p>
          </div>

          <div class="my-3">
            <p class="small text-muted fg-white">Social channels:</p>
            ${vars.site_socials.map(each_social => `
              <a href="${each_social.url}" class="btn btn-light mr-3">
                <span class="site-icon ${each_social.type}"></span>
                <div class="social-text ">${each_social.type}</div>
              </a>
            `).join("")}

          </div>

        </div>

      </div>
    </div>

    <div class="${vars.css_classes.containers.default} my-4">
      &copy;${vars.date.year} ${vars.site_name_full}. All rights reserved.
    </div>

  </footer>
  ${modal(data)}
  `};

module.exports = footer;
