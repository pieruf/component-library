var input_fields = 'input[type="text"], input[type="password"], textarea';
$(document).on('change', input_fields, function () {
	if($(this).val().length != 0 || $(this).attr('placeholder') != undefined) {
		$(this).siblings('label').addClass('filled');
	} else {
		$(this).siblings('label').removeClass('filled');
	}
});

$(document).ready(function() {
   
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