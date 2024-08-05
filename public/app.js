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

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
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
        localStorage.setItem('username', username);
        alert(data.message);
        displayUserStatus();
    }
    else{
        alert(data.message)
    }
})

document.getElementById('report-form').addEventListener('submit', async event => {
    event.preventDefault();
    // this prevents a page reload after pressing submit
    const title = document.getElementById('report-title').value;
    const description = document.getElementById('report-desc').value;
    const token = localStorage.getItem('token')
    const response = await fetch('/incident', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, description})
    });
    const data = await response.json();
    alert(data.message); // display browser message
})

document.getElementById('dashboard-button').addEventListener('click', async event => {
    const token = localStorage.getItem('token')

    if(!token){
        alert('You must be logged in to use the dashboard.');
        return;
    }
    const response = await fetch('/dashboard', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
        const data = await response.json();
        if (data.message){
            // check if the data contains a message - like an error!
            alert(data.message);
        }
        else{
            // no message implies success!

            // clear existing list
            const incidentList = document.getElementById('incident-list');
            incidentList.innerHTML = '';

            // go over the incidents and display them!
            if(data.incidents.length === 0){
                const li = document.createElement('li');
                alert('No available incidents')
            }
            else {
                data.incidents.forEach(incident => {
                    const li = document.createElement('li');
                    li.textContent = `Title: ${incident.title}, Description: ${incident.description}`;
                    incidentList.appendChild(li);
                })
            }

        }

})

function displayUserStatus() {
    const username = localStorage.getItem('username')
    const usernameDisplay = document.getElementById('username-display');
    if(username){
        usernameDisplay.textContent = `Logged in as: ${username}`
    } else{
        usernameDisplay.textContent = 'Not logged in';
    }
}

// on page load, display user
document.addEventListener('DOMContentLoaded', displayUserStatus);

document.getElementById('tests').addEventListener('submit', async event => {
    event.preventDefault();
    // this prevents a page reload after pressing submit


    //alert(data.message); // display browser message
})