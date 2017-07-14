$(function() {
	'use strict';
	$(".customFile > input.file").mnFileInput();
	// widthPreview
	$(".customFile > input.widthPreview").mnFileInput({
		'preview': '.preview'
	});
	// widthCallback
	$(".customFile > input.widthCallback").mnFileInput({
		'preview': '.preview2',
		'beforeChange' : function(e){
			alert('beforeChange >> image to load src = '+e.target.value);
			$('.preview2').hide();
		},
		'afterChange' : function(e){
			alert('afterChange >> loaded image src = '+e.target.value);
		},
		afterPreview: function(e){
			console.log('afterPreview');
			$('.preview2').fadeIn(3000);
		}
	});
});