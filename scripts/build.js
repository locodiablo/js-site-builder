const fs = require("file-system");
const fse = require("fs-extra");
const dirTree = require("directory-tree");
const bootstrapRoot = './node_modules/bootstrap/js/src';
// const thumb = require('node-thumbnail').thumb;
const paths = require('../src/js_build/paths.js');
const vars = require('../src/js_build/vars.js');
//

// RETURN SRC FILES AS OBJECT
const pageDefinitionsDir = dirTree(`./${paths.definitionsDir}`,{extensions:/\.js/,attributes:['type','extension']});
const imagesDirSrc = dirTree(`${paths.imagesDir}/gallery`,{extensions:/\.jpg/});

const buildActions = {
  directory: function(data,level){
    data.children.map((dirItem,index) =>
       {
         buildActions[dirItem.type](dirItem,level,index)
       }
    ).join("");
  },
  file: function(data,level,index){
    const pageContent = require(`../${data.path}`);
    const pageTemplate = require(`${paths.templatesDir}/${pageContent.config.html_template}`);
    const relativeUrl = data.path.replace(paths.definitionsDir,"");
    const outputUrl = relativeUrl.replace(data.extension,".html");
    pageContent.pageContentUrl = outputUrl.replace("index.html","");
    pageContent.navDirActive = `${level}`;
    fs.writeFile(`${paths.publicDir}${outputUrl}`, pageTemplate(pageContent), function(err) {});
    console.log(`Output ${data.name} into ${paths.publicDir}${outputUrl}`)
  }
}

const buildThumbs = {
  directory: function(data){
    data.children.map(dirItem => buildThumbs[dirItem.type](dirItem)).join("")
    console.log('buildThumb path',data.path)
  },
  file: function(data){
    let destPath = `${data.path.replace(data.name,'')}`
    destPath = destPath.replace('src','./public')
    thumb({
      source: `${data.path}`,
      destination: destPath,
      suffix: paths.thumbSuffix,
      width: 400,
      overwrite: true,
      concurrency: 4
    }, function(files, err, stdout, stderr) {
      //console.log('Image thumbs complete.');
    })
    console.log('destPath: '+ destPath)
  }
}

// BUILD PAGES
pageDefinitionsDir.children.forEach((ChildItem,index) => {
  let level = index
  buildActions[ChildItem.type](ChildItem,level,index)
})

function copyThumbs(){
  console.log('Start generate thumbnails...')
  imagesDirSrc.children.forEach(imgItem => {
    buildThumbs[imgItem.type](imgItem)
  })
}

// SETUP LOCALHOST DASHBOARD RESOURCES
fse.copy(`${paths.src}/assets`, `${paths.publicDir}/assets`)
//.then(() => copyThumbs())
.catch(err => console.error(err))
