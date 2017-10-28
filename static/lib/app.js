$(function() {
  var activeDude;

  $('.faq-item').click(function() {
    if(activeDude) {
      activeDude.hide();
    }
    var key = $(this).attr('for');
    activeDude = $('#' + key).toggle();
  });
});