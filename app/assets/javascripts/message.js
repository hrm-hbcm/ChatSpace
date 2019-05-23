$(document).on('turbolinks:load', function() {
$(function(){
function buildHTML(message){
  imageHTML = message.image ? `<img src="${message.image}">` : ''
    var html =
     `<div class="message" data-message-id=${ message.id }>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${ message.user_name }
          </div>
          <div class="upper-message__date">
            ${ message.date }
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${ message.content }
          </p>
        </div>
        ${ imageHTML }
      </div>`
    return html;
}
$('#new_message').on('submit', function(e){
  e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function() {
      alert('error');
    });
  });

var reloadMessages = setInterval(function(){
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  last_message_id = $('.message:last').data('message-id');
  $.ajax({
    url: '/groups/:group_id/api/messages',
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function(message){
      console.log(message)
      insertHTML = buildHTML(message);
      $('.messages').append(insertHTML)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    });
  })
  .fail(function(){
    alert('error');
  })
  } else {
    clearInterval(reloadMessages);
  }} , 5000 )
});
});
