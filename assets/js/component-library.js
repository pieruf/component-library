var input_fields = 'input[type=text], textarea';

$(document).ready(function() {
   
   $(input_fields).each(function(index, element) {
	    if ($(element).val().length > 0) {
	      $(this).siblings('label, i').addClass('filled');
	    } else {
	      $(this).siblings('label, i').removeClass('filled');
	    }
	});
});

$(document).on('change', input_fields, function () {
  if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
    $(this).siblings('label').addClass('filled');
  }
});