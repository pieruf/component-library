var input_fields = 'input[type="text"], input[type="password"], textarea';
$(document).on('change', input_fields, function () {
	if($(this).val().length != 0 || $(this).attr('placeholder') != undefined) {
		$(this).siblings('label').addClass('filled');
	} else {
		$(this).siblings('label').removeClass('filled');
	}
});

$(document).ready(function() {
   
   // Check for filled input elements
   $(input_fields).each(function(index, element) {
	    if ($(element).val().length > 0 || $(this).attr('placeholder') != undefined) {
	      $(this).siblings('label').addClass('filled');
	    } else {
	      $(this).siblings('label').removeClass('filled');
	    }
	});
	
	// Visually replaces all select elements with lists
	$('select').each(function() {
	    createSelect($(this));
	});
	
	// Validate email address
	var emailaddressvalidator = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	$('.input-email').each(function () {
		$(this).find('input[type=text]').bind('input propertychange', function() {
			if ($(this).val()) {
				if (emailaddressvalidator.test($(this).val())) {
					$(this).parent().removeClass('input-invalid');
					$(this).parent().addClass('input-valid');
				} else {
					$(this).parent().removeClass('input-valid');
					$(this).parent().addClass('input-invalid');
				}
			} else {
				$(this).parent().removeClass('input-invalid');
				$(this).parent().removeClass('input-valid');
			}
		});
	});
	
	// Validate phone numbers (+prefix and a minimum of six numbers)
	var phonenumbervalidator = /^(\+\s*[0-9]{2,3})*\s*[0-9,\s]{6,}$/;
	$('.input-phone').each(function () {
		$(this).find('input[type=text]').bind('input propertychange', function() {
			if ($(this).val()) {
				if (phonenumbervalidator.test($(this).val())) {
					$(this).parent().removeClass('input-invalid');
					$(this).parent().addClass('input-valid');
				} else {
					$(this).parent().removeClass('input-valid');
					$(this).parent().addClass('input-invalid');
				}
			} else {
				$(this).parent().removeClass('input-invalid');
				$(this).parent().removeClass('input-valid');
			}
		});
	});
	
	// Set the checked attribute on checkboxes based on label clicks
	$('input[type=checkbox]').each(function () {
		$(this).on('click', function() {
			if ($(this).attr('checked')) {
				$(this).removeAttr('checked');
			} else {
				$(this).attr('checked', true);
			}
		});
	});
	
	/* Radiobutton debug 
	$('input[type=radio]').each(function () {
		$(this).on('click', function() {
			alert($('[name='+groupname+']:checked').val()); 
		});
	});*/
	
	/* Mobile menu */
	$('#nav-hamburger').on('click', function() {
		$('.nav-menu').toggleClass('nav-mobile');
	});
	
	
	$('.nav-menu ul li').each(function () { 
		$(this).on('click', function() {
			$(this).find('ul').toggleClass('nav-submenu-mobile');
			$(this).find('i').toggleClass('nav-more-expanded');
		});
	});
	
	$('.tab-names a').each(function () { 
		$(this).on('click', function() {
			var parentid = $(this).parent().parent().attr('id');
			var tabid = $(this).attr('data-tab');
			
			$('#' + parentid).find('.tab-names a').each(function (){
				$(this).removeClass('tab-name-active');
			});
			$(this).addClass('tab-name-active');
			
			$('#' + parentid).find('.tab-content').each(function (){
				$(this).removeClass('tab-active');
			});
			$('#'+tabid).addClass('tab-active');
		});
	});
	
	// Autoresize text-areas
	$('textarea').each(function() {
		var textarea = $(this);
    	var offset = this.offsetHeight - this.clientHeight;
		$(this).on('keyup input', function() {
			resizeTextarea(this);
		});
		var resizeTextarea = function(area) {
			$(area).css('height', 'auto');
        	$(area).css('height', area.scrollHeight + offset);
		};
	});
	
});

/*
* Builds a list out of select elements
*/
function createSelect(select) {
	var id = select.attr('id');
	var parentdiv = select.parent()
	// var caret = $(document.createElement("span"));
	var caret = $(document.createElement("i"));
	caret.addClass("material-icons caret-icon");
	
	var input = $(document.createElement("input"));
	var selectcontent = $(document.createElement("div"));
	selectcontent.addClass("select-content");
	
	var ul = $(document.createElement("ul"));
	selectcontent.append(ul);
	
	input.attr({ type: 'text', readonly: 'true', value: 'Choose an option'})
	input.on('click', function () {
		selectcontent.toggleClass("active-select");
		caret.toggleClass("caret-icon-active");
	});
	caret.on('click', function () {
		selectcontent.toggleClass("active-select");
		caret.toggleClass("caret-icon-active");
	});
	
	ul.attr('id', id);
	$("#" + id + " option").each(function() {
		var li = $(document.createElement("li"));
		var option = $(this).text();
	    li.append(option);
	    li.on('click', function() {
		    // Reset the selection in the original select element
		    $('#' + id).find("option").attr('selected', false);
		    var selected = $(this).text();
		    input.attr('value', selected);
		    selectcontent.toggleClass("active-select");
		    caret.toggleClass("caret-icon-active");
		    // Select the right option of the original select element
		    $("#" + id + " option").filter(function () {
			    return $(this).html() == selected; 
			}).attr('selected', true);
	    });
	    ul.append(li);
	});
		
	parentdiv.append(caret);
	parentdiv.append(input);
	parentdiv.append(selectcontent);
}