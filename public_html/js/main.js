var socket = io.connect('http://localhost:3000');

document.getElementById('message').addEventListener('keypress', function () {
    var visitor_id = socket.id;
    var username = document.getElementById('username');

    if (username.value != '' && username.value != undefined && username.hasAttribute('disabled')) {
        socket.emit('writting', {
            visitor_id: visitor_id,
            username: username.value,
        });
    }
});

document.getElementById('send').addEventListener('click', function () {
    var visitor_id = socket.id;
    var username = document.getElementById('username').value;
    var message = document.getElementById('message').value;
    var error_message = document.getElementById('error_message');
    error_message.setAttribute('hidden', 'hidden');
    var success_message = document.getElementById('success_message');
    success_message.setAttribute('hidden', 'hidden');

    if ((username != undefined && username != '' && username.length > 3) && (message != undefined && message != '' && message.length > 10)) {
        socket.emit('new_message', {
            visitor_id: visitor_id,
            username: username,
            message: message,
        });

        resetInputs(message, success_message, error_message);
    } else if (username == undefined || username == '') {
        error_message.textContent = 'Username can\'t be null.';
        error_message.removeAttribute('hidden');
    } else if (username.length <= 3) {
        error_message.textContent = 'Username must be more than 3 characters.';
        error_message.removeAttribute('hidden');
    } else if (message == undefined || message == '') {
        error_message.textContent = 'Message can\'t be null.';
        error_message.removeAttribute('hidden');
    } else if (message.length <= 10) {
        error_message.textContent = 'Message must be more than 10 characters.';
        error_message.removeAttribute('hidden');
    }
});

function resetInputs(message, success_message, error_message) {
    error_message.setAttribute('hidden', 'hidden');
    document.getElementById('username').setAttribute('disabled', 'disabled');
    message.value = '';
    success_message.textContent = 'Message sent successfully.';
    success_message.removeAttribute('hidden');
}

socket.on('new_msg', function (new_msg) {
    console.log(new_msg);

    var message_html = '';
    if (new_msg.visitor_id == socket.id) {
        message_html += '<div class="container darker">';
        message_html += '   <img src="images/avatar.png" alt="Avatar" class="right" style="width:100%;">';
        message_html += '   <p class="username">' + new_msg.username + '</p>';
        message_html += '   <p>' + new_msg.message + '</p>';
        message_html += '</div>';
    } else {
        message_html += '<div class="container">';
        message_html += '   <img src="images/avatar.png" alt="Avatar" style="width:100%;">';
        message_html += '   <p class="username">' + new_msg.username + '</p>';
        message_html += '   <p>' + new_msg.message + '</p>';
        message_html += '</div>';
    }

    document.getElementById('chat_history').innerHTML += message_html;
    document.getElementById('writting').innerHTML = '';
});

socket.on('new_writting', function (new_writting) {
    console.log(new_writting);

    var writting_html = '';
    writting_html += '<span style="position: relative; bottom: 8px;"><strong>' + new_writting.username + '</strong> is writting </span>';
    writting_html += '<img src="images/writting.gif" style="width: 30px;" />';
    document.getElementById('writting').innerHTML = writting_html;
});