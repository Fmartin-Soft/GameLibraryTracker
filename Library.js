function onStart(){
    //Check for existing localstorage
        //if so, loadLocal()
}

function loadLocal(){
    //check how many entries there are
    //for each entry, 
        //load and create boxartURL
        //load name
        //load platforms
        //send into addSingleElement()
}

function createLocalEntry(URL,name,platforms){
    //unpack URL (grab the ending string)
    //check if localStorage exists
        //if TRUE unpack current localStorage
        //add new entry on end current (¦URL,name,platforms¦)

        //if FALSE create new storage key
        //add new entry (¦URL,name,platforms¦)


}


async function SearchQueries(){
    gameQuery = "games/";
    platformQuery = "platforms/";
    text = document.getElementById("Search").value; //get the value of the search bar
    textData = await IgdbApiFetch(`fields name,rating,rating_count,platforms,cover,url; search "${text}"; limit 1;`,gameQuery); //searching for the game plus details
    imgurl = await IgdbApiFetch(`fields cover.url; where id=${textData[0].id};`,gameQuery); //searching for the url cover
    platformUrl = await IgdbApiFetch(`fields platform_logo.url,name; where id=(${textData[0].platforms.join(",")});`,platformQuery)
    await addSingleElement(textData[0].name,platformUrl,"https:" + imgurl[0].cover.url.replace("t_thumb","t_cover_big"));
    
    //createlocalEntry()
}

//an asyncronous function of Apifetch, fetches results based on what is inputted into the seach bar
async function IgdbApiFetch(body,Query){
    //error catching
    try{ 
    //basic API calls
    response = await fetch(`https://corsproxy.io/?https://api.igdb.com/v4/${Query}`,{ //fetch this: // corsproxy is used as igdb doesnt allow browser JS to call it
        method: 'POST', // use the method of post
        //include these headers
        headers: {
            'Accept':'application/json',
            'Client-ID': 'ID', //MY client ID
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

//To dynamically add Divs
function addSingleElement(Text,platforms,ImgURL){
    const div = document.createElement("div"); //create div container
    
    div.className = "SingleEntry"; //give it a class

    //define the innerHTML of the div
    div.innerHTML = `
    <img src=${ImgURL}>
    <div class="info">
        <p>${Text}</p> 
        <div class="platforms"></div>
    </div>
    <button onclick="removeSingleElement(event)">X</button>
    `
    

    document.getElementById("Library").appendChild(div);  //add the div to the Library div


    //for loop to get all platforms the api returned
    let platformHTML = "";

    for(let i = 0; i < platforms.length; i++){
        platformHTML += `
        <p>${platforms[i].name}</p>
        `
    }


    div.querySelector(".platforms").innerHTML = platformHTML; //find platform div then add platformHTML into the innerHTML

    const line = document.createElement("hr"); //add line to seperate entries

    document.getElementById("Library").appendChild(line); 


}

function removeSingleElement(event){
    const tar = event.target.parentElement; //targets parent element
    const next = tar.nextElementSibling; //next element after parent

    //if its a line (should be), delete it
    if (next && next.tagName === "HR"){
        next.remove();
    }
    tar.remove(); // finally remove the parent div
}