
//hide context box
var hideContext = function(){
    $('#clarify-box').hide();
}

//show context box
var unhideContext = function() {
	$('#clarify-box').show();
}

var addListeners=function(){
    hideContext();
 
    $(window).scroll(function(){
        hideContext();
    });
}

var removeListeners=function(){
    $(window).unbind('scroll');
	unhideContext();
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

//on init perform based on chrome storage value
window.onload=function(){  
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            addListeners();
        }else{
            removeListeners();
        } 
    });
}

