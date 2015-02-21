$(document).ready(function(){
  if(isNode) {

    $(".only-with-full-nav").append('<a href="#" class="minibutton sidebar-button"><span class="octicon octicon-rocket rocket"></span> Deploy to Azure</a>');

    var path = $('a[aria-label^=Download]').attr('href');
  }
});

function isNode() {
  return $('a[title="package.json"]').length > 0;
}
