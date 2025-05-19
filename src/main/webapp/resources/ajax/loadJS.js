
var randomNumber='1.0.';
var allJsArray=["./resources/js/materialize.js?version="+randomNumber,
	            "./resources/js/plugins/data-tables/js/jquery.dataTables.min.js?version="+randomNumber,
	            "./resources/custom_js/bootstrap.min.js?version="+randomNumber,
	            "./resources/js/plugins/perfect-scrollbar/perfect-scrollbar.min.js?version="+randomNumber,
	            "./resources/js/plugins.js?version="+randomNumber,
	            "./resources/project_js/CLDRPluralRuleParser.js?version="+randomNumber,
	            "./resources/i18n_library/i18n.js?version="+randomNumber,
	            "./resources/i18n_library/messagestore.js?version="+randomNumber,
	            "./resources/i18n_library/fallbacks.js?version="+randomNumber,
	            "./resources/i18n_library/language.js?version="+randomNumber,
	            "./resources/i18n_library/parser.js?version="+randomNumber,
	            "./resources/i18n_library/emitter.js?version="+randomNumber,
	            "./resources/i18n_library/bidi.js?version="+randomNumber,
	            "./resources/i18n_library/history.js?version="+randomNumber,
	            "./resources/i18n_library/min.js?version="+randomNumber,
	            "./resources/js/countries.js?version="+randomNumber,
	            "./resources/project_js/backbutton.js?version="+randomNumber,
	            "./resources/project_js/dragableModal.js?version="+randomNumber,
	            "./resources/project_js/enterKey.js?version="+randomNumber,
	            "./resources/project_js/viewConsignment.js?version="+randomNumber,
	            "./resources/project_js/validationMsg.js?version="+randomNumber,
	            "./resources/project_js/_dateFunction.js?version="+randomNumber,
	            "./resources/project_js/globalVariables.js?version="+randomNumber,
	            "./resources/ajax/keyBoardShortcut.js?version="+randomNumber];

 
function addAllScript(alljsArray,index) {
 if(alljsArray.length==index){
	
	 return ;
 }
    	var s = document.createElement('script');
    	 s.setAttribute('src', alljsArray[index])
	   
    	 s.onload = function (){
    		 addAllScript(alljsArray,++index)
    	 };
    	 s.onerror= function(){
    		
    	 };
	    document.body.appendChild(s);

 
}

function initScriptLoad(pageName){
	addAllScript(allJsArray,0);
}



 