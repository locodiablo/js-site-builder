const vars = require("../vars.js");
var today = new Date();
// considered fonts: ['Alfa Slab One','Cairo','Poppins','Teko','Ubuntu','Russo One']

function head(data){
const head = data.head;
  return `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
    <title>${data.head.title} - ${vars.site_name}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta property="og:type" content="website">
    <meta property="og:title" content="${head.title}">
    <meta property="og:description" content="${head.hasOwnProperty('description') ? head.description : ''}">
    <meta property="og:url" content="">
    <meta property="og:site_name" content="${vars.site_name}">
    <meta property="og:locale" content="en_GB">
    <meta property="og:image" content="">
    <meta property="og:updated_time" content="${today.toISOString()}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${head.title}">
    <meta name="twitter:image" content="">

    <meta property="og:type" content="website">
    <meta property="og:title" content="${head.title}">
    <meta property="og:url" content="">
    <meta property="og:site_name" content="${vars.site_name}">
    <meta property="og:locale" content="en_GB">
    <meta name="twitter:card" content="">
    <meta name="twitter:title" content="${head.title}">

    <link rel="canonical" href="https://${vars.site_url}${data.pageContentUrl}" />
    <link rel="icon" href="/assets/images/brand/favicon-32x32.png" type="image/png" />
    <link rel="shortcut icon" href="/favicon.ico" />

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link rel="stylesheet" href="/assets/css/style.css?${today.getTime()}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "http://www.sjrollett.com",
      "name": "S.J.Rollett, Lead Designer",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "${vars.site_email}",
        "contactType": "Enquiries"
      }
    }
    </script>
  </head>
    `};

module.exports = head;
