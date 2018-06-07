const twitterCheckbox = document.getElementById('twitter');
const redditCheckbox = document.getElementById('reddit');
const subreddits = document.getElementById('subreddit');
const remove = document.getElementsByClassName('remove');
const exit = document.getElementById('exit');
const username = document.getElementById('username');
const password = document.getElementById('password');
const apikey = document.getElementById('apikey');

let options;
chrome.storage.sync.get(['options'], (result) => { //Shows default of Twitter and Reddit options on.
  options = result.options;
  console.timeStamp();
  twitterCheckbox.checked = options.TwitterOn;
  redditCheckbox.checked = options.RedditOn;
  if (options.Username && options.Password) {
      $("#registerContainer").hide();
      $("#options").show();
      $("#title").show();
      $("#register").hide();
      $("#changeKey").hide();
      $("#loginTitle").hide();
      $("#loginContainer").hide();
  }
  listUpdate();
})

//Hides initially.
$("#title").hide();
$("#options").hide();
$("#loginTitle").hide();
$("#loginContainer").hide();

twitterCheckbox.addEventListener('change', e => { //Twitter checkbox on off.
    chrome.storage.sync.set({options: {...options, TwitterOn: e.target.checked}}, () => {
        // console.log('Set Twitter to:', e.target.checked);
    })
})

redditCheckbox.addEventListener('change', e => { //Reddit checkbox on off.
    chrome.storage.sync.set({options: {...options, RedditOn: e.target.checked}}, () => {
        // console.log('Set Reddit to: ', e.target.checked);
    })
})

const listUpdate = () => { //Updates the list of subreddits that the app will run on.
    $("#list").empty();
        for (let i = 0; i < options.Subreddits.length; i++) {
            $("#list").append( //Adds the name of subreddit with a button to remove.
                `<li style="clear:both;">${options.Subreddits[i]}
                    <button class="remove" style="border: none; box-shadow: none; background: none; float: right; margin-top: -3px; cursor: pointer;">
                            <svg style="stroke: #ccc; width: 10px; height: 10px;" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 15.642 15.642">
                              <path fill-rule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>
                            </svg>
                    </button>
                </li>`)
        }
    $(".remove").on('click', function () { //Handles the remove button.
        const text = $(this).parent().text().trim(); //Grabs the subreddit name from the parent of the button you click.
        const ix = options.Subreddits.indexOf(text);
        if (ix !== -1) {
            options.Subreddits.splice(ix, 1);
            setTimeout(listUpdate, 1); //Refreshes the list after the subreddit has been removed.
        }
    })
}

subreddits.addEventListener('change', e => { //Handles adding subreddits.
    var found = false;
    let r = (("r/" + e.target.value.trim()).toLowerCase());
    for (let i = 0; i < options.Subreddits.length; i++) {
        if (r == options.Subreddits[i]) {
            found = true;
            break;
        }
    }
    if (!found) {
      options.Subreddits.push(r);
      listUpdate(); //Updates the list after the subreddit has been pushed to the array of subreddits.
      chrome.storage.sync.set({options: options}, () => {
      });
      document.getElementById("error").classList.remove("hasError"); //Removes error message if there is one.
    } else { document.getElementById("error").classList.add("hasError"); /*Provides error message if subreddit is already in the array.*/ }
    e.target.value = ""; //Resets field to empty.
})

$("#exit").on('click', function () { window.close() });


$("#registration").submit(function (event) {
    event.preventDefault();

    if (username.value && password.value && apikey.value) {
        // chrome.storage.sync.set({options: {...options, }}, () => {
        //     console.log("Username set to: ", username.value);
        //     console.log("Password set to: ", password.value);
        //     console.log("API Key set to: ", apikey.value);
        // });
      fetch(`https://glacial-peak-84659.herokuapp.com/register/${username.value}/${password.value}/${apikey.value}`, { method: "GET" })
    	.then((response) => response.json())
    	.then((res) => {
        if(res.success){
          console.log('res.hashedUser: ', res.hashedUser);
          console.log('inside registration, options: ', options);
          options = {...options, Token: res.hashedUser, Username: username.value, Password: password.value, APIKey: apikey.value };
          chrome.storage.sync.set({ options });
          $("#registerContainer").hide();
          $("#options").show();
          $("#title").show();
          $("#register").hide();
          $("#loginTitle").hide();
          $("#loginContainer").hide();
      	} else {
    	    console.log(res.error);
    	  }
      })

    }
})

$(".lo").on('click', function () {
    $("#registerContainer").show();
    $("#options").hide();
    $("#title").hide();
    $("#register").show();
    $("#changeKey").hide();
    $("#loginTitle").hide();
    $("#loginContainer").hide();
    chrome.storage.sync.set({options: {...options, Username: "", Password:"", APIKey: ""}}, () => {
        $("#username").val("")
        $("#password").val("")
        $("#apikey").val("")
        console.log("Username set to: ", username.value);
        console.log("Password set to: ", password.value);
        console.log("API Key set to: ", apikey.value);
    })
});

$(".l").on('click', function () {
    $("#registerContainer").hide();
    $("#options").hide();
    $("#title").hide();
    $("#register").hide();
    $("#changeKey").hide();
    $("#loginTitle").show();
    $("#loginContainer").show();
})

$(".r").on('click', function () {
    $("#registerContainer").show();
    $("#options").hide();
    $("#title").hide();
    $("#register").show();
    $("#changeKey").hide();
    $("#loginTitle").hide();
    $("#loginContainer").hide();
})

$("#login").submit(function (event) {
    event.preventDefault();
        let user = document.getElementById("login_username").value;
        let pwd = document.getElementById("login_password").value;
    if (user && pwd) {
        // chrome.storage.sync.set({options: {...options, Username: user, Password: pwd}}, () => {
        //     console.log("Username set to: ", user);
        //     console.log("Password set to: ", pwd);
        // })
        const URL = `https://glacial-peak-84659.herokuapp.com/login/${user}/${pwd}`;
        console.log(URL);
        fetch(URL, { method: "GET" })
        .then((response) => response.json())
        .then((res) => {
          if(res.success){
            console.log('res.hashedUser: ', res.hashedUser);
            console.log('inside login, options: ', options);
            options = { ...options, Token: res.hashedUser, Username: user, Password: pwd };
            chrome.storage.sync.set({ options });
            $("#registerContainer").hide();
            $("#options").show();
            $("#title").show();
            $("#register").hide();
            $("#loginTitle").hide();
            $("#loginContainer").hide();
          } else {
            console.log(res.error);
          }
        })

    }
})
