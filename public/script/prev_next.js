var myCarousel   = $('#myCarousel');
var itemFirst    = myCarousel.find('.carousel-inner > .item:first-child');
var itemLast     = myCarousel.find('.carousel-inner > .item:last-child');
var controlLeft  = myCarousel.find('a.left.carousel-control');
var controlRight = myCarousel.find('a.right.carousel-control');

hideControl();

myCarousel.on('slid.bs.carousel', function() {
  hideControl(); 
});
myCarousel.on('slide.bs.carousel', function() {
  showControl(); 
});

function hideControl() {
  if ( itemFirst.hasClass('active') ) {
    controlLeft.css('display', 'none');
  }
  if ( itemLast.hasClass('active') ) {
    controlRight.css('display', 'none');
    myCarousel.carousel('pause');  // stop from cycling through items
  } 
}

function showControl() {
  if ( itemFirst.hasClass('active') ) {
    controlLeft.css('display', 'block');
  }
  if ( itemLast.hasClass('active') ) {
    controlRight.css('display', 'block');
  }
}