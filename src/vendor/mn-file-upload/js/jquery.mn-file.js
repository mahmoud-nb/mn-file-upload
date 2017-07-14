/*
 * Author : Mahmoud Nbet
 * Email : mahmoud.nb@gmail.com
 * plugin name : MN-File Upload jQuery Plugin
 * version : 1.1
**/

;(function($) {
	'use strict';

	// this function use to customize HTML file inputs
    $.fn.mnFileInput = function(options) {
		
		var self = this; 
		this.$file = $(this).closest('.customFile');
		this.$selectedFile = this.$file.find('.selectedFile');
		
		// Get settings
		this.settings = $.extend({
			display: 'left',
			controlMsg : 'Choose a file',
			noFileSelectedMsg : 'No file selected',
			preview	: '',
			previewSupportedExt : ['png', 'jpeg', 'jpg', 'gif'],
			beforeChange : function(){},
			afterChange : function(){},
			afterPreview : function(){}
        }, options || {} );

        var $file = null;
        var $selectedFile = null;

        // init settings for each selected file
        $(this).each(function(index, element){
        	
        	$file = $(element).closest('.customFile');
        	$selectedFile = $file.find('.selectedFile');

	        if(!$file.attr('data-display'))
	        	$file.attr('data-display', self.settings.display);

	        if(!$file.attr('data-controlMsg'))
	        	$file.attr('data-controlMsg', self.settings.controlMsg);

	        if($selectedFile.text() == '')
		        $selectedFile.text(self.settings.noFileSelectedMsg);

        });
		
		// This function is used to load preview images
		this.loadPreview = function(input, preview, callback) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if(e.target.result){
						$(preview).attr('src', e.target.result);
						
						// call after preview loaded
						if(callback)
							callback(e);
					}	
				}
				reader.readAsDataURL(input.files[0]);	
			}
		}
		
		// on file change
        this.change(function(e) {
        	// call after before changed
			self.settings.beforeChange(e);
			var $valueDom = $(this).closest('.customFile').find('.selectedFile');
			$valueDom.addClass('inProgress');
			var filename = $('.customFile').data('controlMsg');
			if(e.target){
				var fullPath = e.target.value;
				filename = fullPath.replace(/^.*[\\\/]/, '');
				var extension = filename.split('.').pop();
				$valueDom.text(filename);
				$valueDom.removeClass('inProgress');
				
				if(self.settings.previewSupportedExt.indexOf(extension.toLowerCase()) >= 0 && self.settings.preview != '')
					self.loadPreview(this, self.settings.preview, self.settings.afterPreview(e));
				
				// call after file changed
				self.settings.afterChange(e);
			}
			
        });			
    };
})(jQuery);
