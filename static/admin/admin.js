if (!$) {
    // Need this line because Django also provided jQuery and namespaced as django.jQuery
    $ = django.jQuery;
}

$(document).ready(function(){
    $(".module").delegate("[id$=-variation]", "change", function() {
        var row = $(this).attr("id").split('id_productvariant_set-')[1].split("-variation")[0];
        var variation_id = $(this).val();        
        var data = {"variation_id":variation_id};        
        var url = '/variation/variant-value';
        data = {attribute_id:variation_id};
        postData(url, data, row)
    });
});


    const csrftoken = getCookie('csrftoken');

    	// Example POST method implementation:
        async function postData(url = '', data = {}, row_id) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                //mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
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
                html = '';
                $.each(data, function(key,value){
                  html += "<option value="+key+">"+value+"</option>"
              });
              $('#id_productvariant_set-'+row_id+'-variation_value').html(html);
            });
            }
          

function getVariationValueInline(selected) {
  
    // if(selected){
    //     var url = '/variation/variant-value';
    //     data = {attribute_id:selected};
    //     postData(url, data);	
    // }
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