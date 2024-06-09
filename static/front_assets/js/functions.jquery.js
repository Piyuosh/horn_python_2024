if (!$) {
    // Need this line because Django also provided jQuery and namespaced as django.jQuery
    $ = django.jQuery;
}

$(()=>{
    $('[name="payment_type"]').on('change', function() {
        var $value = $(this).attr('id');
        $('.payment-text').slideUp();
        $('[data-method="'+$value+'"]').slideDown();
    });
        var minVal = parseInt($('.min-price span').text());
            var maxVal = parseInt($('.max-price span').text());
            $( "#prices-range" ).slider({
                range: true,
                min: minVal,
                max: maxVal,
                step: 5,
                values: [ minVal, maxVal ],
                slide: function( event, ui ) {
                    
                    $('input#min-price').val(ui.values[ 0 ]);
                    $('input#max-price').val(ui.values[ 1 ]);
                    $('.min-price span').text(ui.values[ 0 ]);
                    $('.max-price span').text(ui.values[ 1 ]);
                }
            });
    $('html body').on('change', '.filterForm', function(){
        action = $('form.filterForm').attr('action');
        formData = new FormData($('form.filterForm')[0]);
        var sorting = $('#sorting option:selected').val();
        var item_par_page = $('#item_par_page option:selected').val();
        formData.append('sorting',sorting);
        formData.append('item_par_page',item_par_page)

        filterProduct(action, formData);
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
                      var MAX_WIDTH = 200;
                      var MAX_HEIGHT = 200;
                      var width = img.width;
                      var height = img.height;
                      if(Number(width) >= Number(100)){
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

    async function filterProduct(url = '', data = '') {
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            // 'Content-Type': 'text/html',
            'X-CSRFToken': csrftoken,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: data
        })
        .then((response) => response.text())
        .then((data) => {  
            $('#filterProduct').html(data);           
            $.getScript('/static/front_assets/js/bundle.js'); 
           
            $.getScript('/static/front_assets/js/rating.js');  
        });
        }


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


            async function getSelectBoxData(data = {}) {
                url = '/account/get-location-data';
                const response = await fetch(url, {
                    method: 'POST',        
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,       
                    },       
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((data) => { 
                    var html = ''; 
                     if(data.status == 1) {
                        $('#'+data.appendEl).empty();
                        html += '<option value="0" selected disabled>-----------</option>';
                         $.each(data.data, function(key,value){
                            html += "<option value="+Object.keys(value)[0]+">"+Object.values(value)[0]+"</option>";
                         });
                        $('#'+data.appendEl).html(html);
                     }
                });
                }
            
async function addToCartData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',        
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,       
        },       
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {  
        if(data.status == 1) {  
            alert(data.cart_key);
        }          
        showToast(data.message, data.status);
        
    });
    }
       async function deleteCartItemData(url = '', data = {}, deleteDiv='') {
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
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((data) => {  
                // if(data.status == 1) {            
                    showToast(data.message, data.status);
                // }
            });
            }

            async function postJsonData(url = '', data = {}) {
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
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((data) => {  
                    // if(data.status == 1) {            
                        showToast(data.message, data.status);
                    // }
                });
                }
            
                async function quickViewHtmlData(url = '', data = {}) {
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
                        body: JSON.stringify(data)
                    })
                    .then((response) => response.text())
                    .then((data) => {  
                        $('#quickViewHtmlData').html(data);
                        $('#ModalquickView').modal();
                        $.getScript('/static/front_assets/js/bundle.js'); 
                        $('.tt-mobile-product-slider').slick({
							dots: true,
							arrows: false,
							infinite: true,
							speed: 300,
							slidesToShow: 1,
							slidesToScroll: 1,							
					});
                        $.getScript('/static/front_assets/js/rating.js');  
                    });
                    }

            async function htmlData(url = '') {
                var cookie_value = Cookies.get('cart_key');
                const response = await fetch(url,{
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'text/html',
                    'X-CSRFToken': csrftoken,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({'cookie_value':cookie_value}),
                })
                .then((response) => response.text())
                .then((data) => {                   
                   $('.tt-cart-layout').html(data); 
                   var count_cart = $('#tt-badge-cart').val();
                   $('.tt-badge-cart').text(count_cart); 
                   $.getScript("/static/front_assets/js/bundle.js");                      
                });
            }

            async function addBookHtmlData(url = '') {
                const response = await fetch(url,{
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'text/html',
                    'X-CSRFToken': csrftoken,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
                .then((response) => response.text())
                .then((data) => {                   
                   $('#addressBookList').html(data);                    
                });
            }

            async function addBookHtmlDataCheckout(url = '') {
                const response = await fetch(url,{
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'text/html',
                    'X-CSRFToken': csrftoken,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
                .then((response) => response.text())
                .then((data) => {                   
                   $('#addressBookListCheckout').html(data);                    
                });
            }


            

            async function userInfoHtmlData(url = '') {
                const response = await fetch(url,{
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'text/html',
                    'X-CSRFToken': csrftoken,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
                .then((response) => response.text())
                .then((data) => {                   
                   $('#profileData').html(data);                    
                });
            }

            async function cartPageHtmlData(url = '') {
                const response = await fetch(url,{
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'text/html',
                    'X-CSRFToken': csrftoken,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
                .then((response) => response.text())
                .then((data) => {                   
                   $('.cart_item_page').html(data);                  
                });
            }

            async function checkoutPageHtmlData(url = '') {
                const response = await fetch(url,{
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'text/html',
                    'X-CSRFToken': csrftoken,
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
                .then((response) => response.text())
                .then((data) => {
                    $('#checkoutInfo').html(data);  
                    var orderItem = $('#orderItem').val();                    
                    if(parseInt(orderItem) === parseInt(0)){                       
                        var html = '<div class="container-indent nomargin">\
						<div class="tt-empty-cart">\
							<span class="tt-icon icon-f-39"></span>\
							<h1 class="tt-title">SHOPPING CART IS EMPTY</h1>\
							<p>You have no items in your shopping cart.</p>\
							<a href="/" class="btn">CONTINUE SHOPPING</a>\
						</div>\
					</div>'; 
                        $('.checkout_info_main').html(html);
                    }              
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
                    showToast(data.message, data.status);
            });
            }
            async function updaterFormData(url = '', data) {
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
                            $('#billingModal #error_'+key).text(value);
                            $('#changePass #error_'+key).text(value);
                            $('#updateProfile #error_'+key).text(value);
                            $('#contactForm #error_'+key).text(value);
                            $('#registerForm #register-error-'+key).text(value);
                        });
                    }else{
                        $('#changePass').modal('hide');
                        $('#updateProfile').modal('hide');
                        $('#billingModal').modal('hide');
                        showToast(data.message, data.status);
                    }  
                });
                }


                async function registerFormData(url = '', data) {
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
                                $('#registerForm #register-error-'+key).text(value);
                            });
                        }else{                            
                            showToast(data.message, data.status);
                        }  
                    });
                    }

                    
                async function shippingEstimateFormData(url = '', data) {
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
                                $('#shipping_estimate #error_'+key).text(value);                                
                            });
                        }else{
                            $('#shippingEstimateResult').html(data.html);
                        }  
                    });
                    }

                async function addressBookHtmlData(url = '') {
                    const response = await fetch(url,{
                        method: 'POST',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                        'Content-Type': 'text/html',
                        'X-CSRFToken': csrftoken,
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                    })
                    .then((response) => response.text())
                    .then((data) => {
                        $('#addressBook').html(data);
                        $('#billingModal').modal(); 
                        $('input[name="shipping_title"]').on('change', function() {
                            $('input[name="shipping_title"]').not(this).prop('checked', false);  
                        });
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

function registerMe() { 
    let action = $('form#registerForm').attr('action');
    formData = new FormData($('form#registerForm')[0]);
    registerFormData(action, formData);
}

function addToCart(){
   let action = $('form#addToCartForm').attr('action');
   dataString = {
        product_id:$('form#addToCartForm #product_id').val(),
        item_qty:$('form#addToCartForm #item_qty').val(),
    }
   addToCartData(action, dataString);
   cartList();
}

function buyNow(){
    addToCart();
    window.location.href = "/cart/checkout/";
}

function addToCartOther(product_id){
    action = "/cart/add-cart/"+product_id;
    addToCartData(action);
    cartList();
 }

function cartList(){
    action = "/cart/cart-item-list";
    htmlData(action);
    
}

function deleteCartItem(product_id){
    action = "/cart/remove_cart_item/"+product_id
    deleteCartItemData(action);
    cartItemListPage();
    checkoutData();
    cartList();
    
}
function incQuantity(product_id) {
    action = "/cart/add-cart/"+product_id
    commonPostData(action);
    cartItemListPage();
    cartList();
    
}

function decQuantity(product_id) {
    action = "/cart/decrease_quantity/"+product_id
    commonPostData(action);
    cartItemListPage();
    cartList();
    
}

function cartItemListPage() {
    action = "/cart/cart-item-page"
    cartPageHtmlData(action);
}

function checkoutData(){
    action = "/cart/checkout-ajax"
    checkoutPageHtmlData(action);
}

function profileFormSubmit(formId) {
    action = $('form#profileForm').attr('action');
    formData = new FormData($('form#profileForm')[0]);
    updaterFormData(action, formData);
    userInfo();
}

function changePassword(){
    action = $('form#changePassForm').attr('action');
    formData = new FormData($('form#changePassForm')[0]);
    updaterFormData(action, formData)
}
function addressBookForm(addressType){
    action = '/account/get-address-book-form/'+addressType;
    addressBookHtmlData(action);
}

function addressBookUpdate(addressType){
    action = $('form#addressForm').attr('action');
    formData = new FormData($('form#addressForm')[0]);    
    updaterFormData(action, formData);
    addBookHtmlList();
    addBookHtmlListCheckout();
}

function addBookHtmlList() {
    action = '/account/address-book-list';
    addBookHtmlData(action);
}

function addBookHtmlListCheckout() {
    action = '/account/address-book-list-checkout';
    addBookHtmlDataCheckout(action);
}

function deleteAddBook(id) {
    action = '/account/delete-address-book/'+id;
    commonPostData(action);
    addBookHtmlList();
}
function editAddBook(id,addType){
    action = '/account/address-book-edit-form/'+id+'/'+addType;
    addressBookHtmlData(action);
}

function userInfo(){
    action = '/account/user-profile-info';
    userInfoHtmlData(action);
}
function quickView(pro_uuid) {
    action = '/quick-view';
    data = {
        pro_uuid:pro_uuid
    }
    quickViewHtmlData(action, data);    
}

function shippingEstimate(formId) {
    action = $('form#'+formId).attr('action');
    formData = new FormData($('form#'+formId)[0]);    
    shippingEstimateFormData(action, formData);
}

function getState(countryId){    
        typeId = countryId;
        data ={
            typeId:typeId,
            typeName:'state',
            appendEl:'add_state'
        }
        getSelectBoxData(data);   
}
function getCity(stateId){    
    typeId = stateId;
    data ={
        typeId:typeId,
        typeName:'city',
        appendEl:'add_city'
    }
    getSelectBoxData(data);   
}
function addToWishlist(pro_uuid) {
    // alert(pro_uuid);
    action = '/cart/add-to-wishlist';
    data ={
        pro_uuid:pro_uuid
    }
    postJsonData(action,data)
}

function addToCompare(pro_uuid) {
    action = '/cart/add-to-compare';
    data ={
        pro_uuid:pro_uuid
    }
    postJsonData(action,data)
}

function removeCompareProduct(id) {
    action = '/cart/remove-compare-product';
    data ={
        id:id
    }
    postJsonData(action,data)
}

function removeWishlistProduct(id) {
    action = '/cart/remove-wishlist-product';
    data ={
        id:id
    }
    postJsonData(action,data)
}

function contactUs(params) {
    action = $('form#'+params).attr('action');
    formData = new FormData($('form#'+params)[0]);    
    updaterFormData(action, formData);
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