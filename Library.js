function SearchQueries(){
    text = document.getElementById("Search").value;
    document.getElementById("TestOutput").textContent = text;
}

document.getElementById("Search").addEventListener("keypress",function(event){
    if (event.key == "Enter"){
        SearchQueries();
    }
});
