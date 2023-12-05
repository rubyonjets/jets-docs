$(document).ready(function() {
  $('#content h1, #content h2, #content h3').each(function() {
    let linkId = $(this).attr('id');
    let linkText = $(this).text();
    let href = window.location.href;
    href = href.replace(/#.*$/, '');
    let link = href + '#' + linkId;

    console.log("linkId = " + linkId);
    console.log("linkText = " + linkText);
    console.log("link =", + link);

    if (linkId !== undefined) {
      $('#page-menu ul').append('<li><a href="'+link+'">'+linkText+'</a></li>');
    }
  });

  // load with pure js here beause its faster than waiting for opal. opal shows again
  $('#page-menu').each(function() {
    if ($(this).find('li').length !== 0) {
      $(this).show();
    }
  })

});
