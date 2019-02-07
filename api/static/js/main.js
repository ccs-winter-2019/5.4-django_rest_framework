(function($){
  $(function(){
    console.log('Ready to go!');

    // You need to send a CSRF Token when POSTing
    // You do this by adding this to your project
    // https://docs.djangoproject.com/en/2.1/ref/csrf/#setting-the-token-on-the-ajax-request
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    // AJAX Request to get a list of items
    $.ajax('http://localhost:8000/data/', {
      'dataType': 'json',
      'error': function(resp, err){console.log(resp, err)},
      'success': function (data) {
        console.log('data', data);

        data.forEach(function(candy){
          $('body').append('<p>' + candy.name + '</p>');
        })
      }
    });

    // Register event handler on the .post button
    $('.post').on('click', function(){

      // POST ajax request to create a new piece of candy
      $.ajax('http://localhost:8000/data/', {
        'method': 'POST',
        'data': {'name': 'thin mint', 'is_chocolate': true},
        'success': function (data) {
          console.log('success!');
        }
      });
    });

  });
}(jQuery));
