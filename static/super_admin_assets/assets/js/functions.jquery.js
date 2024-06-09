if (!$) {
    // Need this line because Django also provided jQuery and namespaced as django.jQuery
    $ = django.jQuery;
}

$(()=>{

    $(".select2").select2({
        tags: true,
    });

    $('html body').on('change','#id_country', function() {
        typeId = $(this).val();
        data ={
            typeId:typeId,
            typeName:'state',
            appendEl:'pro_state'
        }
        getSelectBoxData(data);
    });
    $('html body').on('change','#pro_state', function() {
        typeId = $(this).val();
        data ={
            typeId:typeId,
            typeName:'city',
            appendEl:'pro_city'
        }
        getSelectBoxData(data);
    });   

    $(".imgAdd").click(function(){
        $(this).closest(".row").find('.imgAdd').before('<div class="col-sm-4 imgUp"><div class="imagePreview"><img src="" alt="" /></div><label class="btn btn-primary">Upload<input name="cat_sample_img" type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
      });
      $(document).on("click", "i.del" , function() {
        $(this).parent().remove();
      });
      
      $(document).on("change",".uploadFile", function()
      {
        var uploadFile = $(this);
        var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
    
            if (/^image/.test( files[0].type)){ // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
    
                reader.onloadend = function(){ // set image data as background of div
                    //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
    
                    var img = new Image();
                    img.src = this.result;
    
                    setTimeout(function(){
                      var canvas = document.createElement("canvas");        
                      var MAX_WIDTH = 1080;
                      var MAX_HEIGHT = 1080;
                      var width = img.width;
                      var height = img.height;
                      if(Number(width) >= Number(1080)){
                        if (width > height) {
                          if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                          }
                        } else {
                          if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                          }
                        }
                      }
                      canvas.width = width;
                      canvas.height = height;
                      var ctx = canvas.getContext("2d");
                      ctx.drawImage(img, 0, 0, width, height);
                      var dataurl = canvas.toDataURL("image/jpeg");
                      uploadFile.closest(".imgUp").find('.imagePreview img').attr('src', dataurl);
                      uploadFile.closest(".imgUp").find('.imagePreview input').val(dataurl);                  
                    },100);
                  }
                }
    
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
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
            .then((response) => response.json())
            .then((data) => {               
                html = '';
                $.each(data, function(key,value){
                  html += "<option value="+key+">"+value+"</option>"
              });
              $('#id_productvariant_set-'+row_id+'-variation_value').html(html);
            });
            }

            

            async function getVrAttributeHtml(url = '', data={}) {
                const response = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin', 
                    headers: {
                    'Content-Type': 'text/html',
                    'X-CSRFToken': csrftoken,               
                    },
                    redirect: 'follow', 
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(data),
                })
                .then((response) => response.text())
                    .then((data) => {
                        $('#productvariant_set-group').html(data); 
                        $(".select2").select2();
                        var last_row_no = $('#last_row_no').val();                   
                    });
                }

                async function getVrAttributeHtmlModal(url = '', data={}) {
                    const response = await fetch(url, {
                        method: 'POST',
                        cache: 'no-cache',
                        credentials: 'same-origin', 
                        headers: {
                        'Content-Type': 'text/html',
                        'X-CSRFToken': csrftoken,               
                        },
                        redirect: 'follow', 
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(data),
                    })
                    .then((response) => response.text())
                        .then((data) => {
                            $('#variation_data').html(data); 
                            $(".select2").select2();
                            var last_row_no = $('#last_row_no_modal').val();                   
                        });
                    }

            async function addMoreAttributeHtml(url = '', data={}) {
                    const response = await fetch(url, {
                        method: 'POST',
                        cache: 'no-cache',
                        credentials: 'same-origin', 
                        headers: {
                        'Content-Type': 'text/html',
                        'X-CSRFToken': csrftoken,               
                        },
                        redirect: 'follow', 
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(data), 
                    })
                    .then((response) => response.text())
                        .then((data) => {
                            var last_row_no = $('#last_row_no').val();
                            $('#last_row_no').val(Number(last_row_no)+1);
                            $('#variation-row').append(data); 
                            $(".select2").select2();                       
                        });
                    }

                    async function addMoreAttributeModalHtml(url = '', data={}) {
                        const response = await fetch(url, {
                            method: 'POST',
                            cache: 'no-cache',
                            credentials: 'same-origin', 
                            headers: {
                            'Content-Type': 'text/html',
                            'X-CSRFToken': csrftoken,               
                            },
                            redirect: 'follow', 
                            referrerPolicy: 'no-referrer',
                            body: JSON.stringify(data), 
                        })
                        .then((response) => response.text())
                            .then((data) => {
                                var last_row_no = $('#detail_row_no_modal').val();
                                $('#detail_row_no_modal').val(Number(last_row_no)+1);
                                $('#variation-attr-row').append(data); 
                                // $(".select2").select2();                       
                            });
                        }



        async function commonPostData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin', 
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,               
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer', 
            })
            .then((response) => response.json())
            .then((data) => {               
                // if(data.status == 1) {            
                    showToast(data.message, data.status);
                // }
            });
            }
            async function createFormData(url = '', data) {
                const response = await fetch(url, {
                    method: 'POST',        
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    // 'Content-Type': 'text/plain',
                    'X-CSRFToken': csrftoken,       
                    },       
                    body: data
                })
                .then((response) => response.json())
                .then((data) => { 
                    $('.invalid-feedback').empty();
                    $('.invalid-feedback').hide();
                    if(data.status == 0){
                        $('.invalid-feedback').show();
                        $.each(data.errors, function(key,value) {                            
                            $('#error-'+key).text(value);
                        });
                    }else{
                        $('.product_uuid').val(data.product_uuid); 
                        $('.cat_uuid').val(data.cat_uuid);                        
                        showToast(data.message, data.status);
                    }  
                });
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


function createProduct(formId) {
    action = $('form#'+formId).attr('action');
    formData = new FormData($('form#'+formId)[0]);
    createFormData(action, formData);
   
}

function getVariationAttribute(vThemeId){
    action = '/seller/theme-attributes/'+vThemeId;
    var cat_uuid = $('.cat_uuid').val();
    var product_uuid = $('.product_uuid').val();
    data = {
        cat_uuid: "220688da-0b0a-4cf1-a46f-ee5719291039",
        product_uuid: "8ad3602a-4800-422a-b562-38995d5b21e5",
    }
    getVrAttributeHtml(action, data);
}

function variationImage(theme_id, row_id){
    action = '/seller/get/variation/theme/attributes/';
    var cat_uuid = $('.cat_uuid').val();
    var product_uuid = $('.product_uuid').val();
    data ={
        theme_id:theme_id,
        row_id:row_id,
        cat_uuid: "220688da-0b0a-4cf1-a46f-ee5719291039",
        product_uuid: "8ad3602a-4800-422a-b562-38995d5b21e5",
    }
    getVrAttributeHtmlModal(action,data)
}

function addMoreAttribute(){
    var vThemeId = $('#variation_theme option:selected').val();

    var cat_uuid = $('.cat_uuid').val();
    var product_uuid = $('.product_uuid').val();

    var last_row_no = $('#last_row_no').val();
    if(vThemeId) {
        action = '/seller/add-more-theme-attr/'+vThemeId; 
        data = {
            cat_uuid: "220688da-0b0a-4cf1-a46f-ee5719291039",
            product_uuid: "8ad3602a-4800-422a-b562-38995d5b21e5",
            last_row_no:last_row_no,
        }       
        addMoreAttributeHtml(action, data);
    } else {
        message = "Please Select variation theme."
        showToast(message, 0);
    }   
}

function deleteAttr(row_id){
    $('#productvariant_set-'+row_id).remove();
}

function addMoreDetails(){
    var row_id = $('#detail_row_no').val();
    var new_id =  Number(row_id)+1;
    var html = '<tr id="detail_set-'+new_id+'"><td class="field-title">\
                        <input type="text" name="label[]" class="form-control form-control-sm" placeholder="Label">\
                        <div id="error-short_desc" class="invalid-feedback"></div>\
                    </td>\
                    <td class="field-title">\
                        <input type="text" name="value[]" class="form-control form-control-sm" placeholder="value">\
                        <div id="error-short_desc" class="invalid-feedback"></div>\
                    </td>\
                    <td class="delete_row_set-0" class="field-variation">\
                        <ul class="table-controls">\
                            <li><a href="javascript:void(0);" onclick="deleteDetailRow('+new_id+')" class="delete-item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></a></li>\
                        </ul>\
                    </td>\
                </tr>';
    $('#other-detail-row').append(html);
    $('#detail_row_no').val(new_id);
}

function addMoreVariation(theme_id){    
    var cat_uuid = $('.cat_uuid').val();
    var product_uuid = $('.product_uuid').val();
    var last_row_no = $('#detail_row_no_modal').val();

    action ="/seller/get/variation/theme/attributes/add/more/";
    data = {
        cat_uuid: "220688da-0b0a-4cf1-a46f-ee5719291039",
        product_uuid: "8ad3602a-4800-422a-b562-38995d5b21e5",
        last_row_no:last_row_no,
        theme_id:theme_id,
    }       
    addMoreAttributeModalHtml(action, data);
}


function deleteAttrModal(row_id){
    $('#variant_attr_set-'+row_id).remove();
}

function deleteDetailRow(row_id){
    $('#detail_set-'+row_id).remove();
}
function showToast(message, status){   
    if(status == 1){
         options = {
            text: message,
            actionTextColor: '#fff',
            backgroundColor: '#1abc9c',
            pos: 'top-right',
            duration: 5000,
        };
    }else{
         options = {
            text: message,
            actionTextColor: '#fff',
            backgroundColor: '#e7515a',
            pos: 'top-right',
            duration: 5000,
        };
    }
    Snackbar.show(options);      
}