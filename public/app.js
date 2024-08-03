document.getElementById('register-form').addEventListener('submit', async event => {
    event.preventDefault();
    // this prevents a page reload after pressing submit

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const response = await fetch('/register', {
        method: 'POST', // send to server
        headers: {
            'Content-Type': 'application/json' // specify the body will be JSON format
        },

        body: JSON.stringify({ username, password }) // convert JS obj to JSON (POST needs str)
    });
    const data = await response.json();
    alert(data.message); // display browser message


})

document.getElementById('login-form').addEventListener('submit', async event => {
    event.preventDefault();
    // this prevents a page reload after pressing submit
    const username = document.getElementById('login-username-username').value;
    const password = document.getElementById('login-password-password').value;
    const response = await fetch('/login', {
        method: 'POST', // send to server
        headers: {
            'Content-Type': 'application/json' // specify the body will be JSON format
        },

        body: JSON.stringify({ username, password }) // convert JS obj to JSON (POST needs str)
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        alert(data.message)
    }
})


document.getElementById('tests').addEventListener('submit', async event => {
    event.preventDefault();
    // this prevents a page reload after pressing submit


    alert(data.message); // display browser message
})