async function SearchQueries(){
    text = document.getElementById("Search").value; //get the value of the search bar
    data = await ApiGamefetch(`fields name,rating,rating_count,platforms,cover,url; search "${text}"; limit 1;`); //searching for the game plus details
    imgurl = await ApiGamefetch(`fields cover.url; where id=${data[0].id};`); //searching for the url cover
    document.getElementById("TestOutput").textContent = data[0].name; //set the testoutput to the JSON but cast it first
    document.getElementById("TestImage").src = "https:" + imgurl[0].cover.url.replace("t_thumb","t_cover_big");
}

//an asyncronous function of Apifetch, fetches results based on what is inputted into the seach bar
async function ApiGamefetch(body){
    //error catching
    try{ 
    //basic API calls
    response = await fetch("https://corsproxy.io/?https://api.igdb.com/v4/games/",{ //fetch this: // corsproxy is used as igdb doesnt allow browser JS to call it
        method: 'POST', // use the method of post
        //include these headers
        headers: {
            'Accept':'application/json',
            'Client-ID': 'CID', //MY client ID
            'Authorization': 'Bearer ID', // MY secret ID, hopefully this isnt here
        },

        body: `${body}` //dynamic search body.
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
