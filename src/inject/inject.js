$(document).ready(function(){
  if(isNode) {
    var $d = $('a[aria-label^=Download]');
    console.log($d.attr('href'));
  }
});

function isNode() {
  return $('a[title="package.json"]').length > 0;
}
