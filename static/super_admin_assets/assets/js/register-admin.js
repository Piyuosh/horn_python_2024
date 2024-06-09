if (!$) {
    // Need this line because Django also provided jQuery and namespaced as django.jQuery
    $ = django.jQuery;
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

	const csrftoken = getCookie('csrftoken');

	async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		//mode: 'cors', // no-cors, *cors, same-origin
		//cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		//credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken,
		// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		//redirect: 'follow', // manual, *follow, error
		//referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	}) // parses JSON response into native JavaScript objects
	.then((response) => response.json())
  							.then((data) => {
								  $('.invalid-feedback').html(' ');
                                  $('.invalid-feedback').hide();                                  
								if(data.status==0){ 
									$.each(data.errors, function(key,value){
										$('#'+key+'-error').html(value);
                                        $('#'+key+'-error').show();
									});
								}else{
									  window.location.href = "/seller/dashboard"
								}
								
							  });
	}
function registerFormsSubmit(formId){
   	data = {
			first_name:$('form#'+formId+' #id_first_name').val(),
			last_name:$('form#'+formId+' #id_last_name').val(),
			mobile_no:$('form#'+formId+' #id_mobile_no').val(),
			email:$('form#'+formId+' #id_email').val(),
			password:$('form#'+formId+' #id_password').val(),
			confirm_password:$('form#'+formId+' #id_confirm_password').val(),
	}
    let form_url = $('#'+formId).attr('action');    
    postData(form_url, data);
}

function loginFormsSubmit(formId){
	data = {		 
		 email:$('form#'+formId+' #id_email').val(),
		 password:$('form#'+formId+' #id_password').val()		 
 }
 let form_url = $('#'+formId).attr('action');    
 postData(form_url, data);
}
   

