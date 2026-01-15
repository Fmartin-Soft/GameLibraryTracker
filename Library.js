async function SearchQueries(){
    text = document.getElementById("Search").value; //get the value of the search bar
    data = await Apifetch(text); //wait for the Apifetch function
    document.getElementById("TestOutput").textContent = JSON.stringify(data); //set the testoutput to the JSON but cast it first
}

//an asyncronous function of Apifetch, fetches results based on what is inputted into the seach bar
async function Apifetch(text){
    //error catching
    try{ 
    //basic API calls
    response = await fetch("https://corsproxy.io/?https://api.igdb.com/v4/games/",{ //fetch this: // corsproxy is used as igdb doesnt allow browser JS to call it
        method: 'POST', // use the method of post
        //include these headers
        headers: {
            'Accept':'application/json',
            'Client-ID': 'SECRET', //MY client ID
            'Authorization': 'Bearer SECRET', // MY secret ID, hopefully this isnt here
        },

        body: `fields summary; search "${text}"; limit 1;` //specific search querie. Right now its searching for the summary of the game thats enterened into the search bar
    });

    data = await response.json(); //wait for the result
    return data; // return the data
    }catch(error){  //if error is caught
        return error; //return the error
    }
}

//event listenener for keypresses
document.getElementById("Search").addEventListener("keypress",function(event){
    if (event.key == "Enter"){
        SearchQueries();
    }
});
