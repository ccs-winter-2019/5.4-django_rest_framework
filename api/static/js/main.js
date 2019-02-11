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
    $.ajax('/data/', {
      // 'dataType': 'json',
      'error': function(resp, err){
        console.log('We just had an error and now what should we do???');
        $('body').html('The server is broken!!!!');
        // console.log(resp, err);
      },
      'success': function (data) {
        console.log('data', data);

        data.forEach(showCandyItem);
      }
    });


    function showCandyItem(candy){
      $('body').append('<p>' + candy.name + '</p>');
    }


    // Register event handler on the .post button
    $('#add-candy-form').on('submit', function(event){
      event.preventDefault();
      console.log('Add candy');

      console.log();

      var titleUserTypedIn = $('#candy-title').val();
      var user = localStorage.getItem('logged_in_user');
      console.log(titleUserTypedIn);


      // var candy = {
      //   'name': $('#candy-title').val(),
      //   'is_chocolate':
      // }

      // POST ajax request to create a new piece of candy
      $.ajax('/data/', {
        'method': 'POST',
        'data': {'text': titleUserTypedIn},
        'success': function (data) {
          console.log('success!');
          showCandyItem(data);
        },
        'error': function(){

        }
      });

    });

  });
}(jQuery));
