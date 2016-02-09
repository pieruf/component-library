var input_fields = 'input[type="text"], input[type="password"], textarea';

$(document).ready(function() {
   
   $(input_fields).each(function(index, element) {
	    if ($(element).val().length > 0 || $(this).attr('placeholder') != undefined) {
	      $(this).siblings('label').addClass('filled');
	    } else {
	      $(this).siblings('label').removeClass('filled');
	    }
	});
	
});

$(document).on('change', input_fields, function () {
	if($(this).val().length != 0 || $(this).attr('placeholder') != undefined) {
		$(this).siblings('label').addClass('filled');
	} else {
		$(this).siblings('label').removeClass('filled');
	}
});
