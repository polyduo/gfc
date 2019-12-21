window.pldNumOfEntries = 0;

if(screen.width <= 767){
    console.log("ASDASD")
    window.pldPerPage = 3;
}else{
    console.log("XCXZCZXC")
    window.pldPerPage = 9;
}
window.pldIndex = 0;
window.freebie_link = [];
window.freebie_time = [];

url = 'https://spreadsheets.google.com/feeds/cells/1sjXUERSpSOFM8Hk3SdG25sBsuUzphhcmjfVE9PsLmVA/1/public/full?alt=json';
url2 = 'https://spreadsheets.google.com/feeds/cells/1sjXUERSpSOFM8Hk3SdG25sBsuUzphhcmjfVE9PsLmVA/1/public/full?alt=json';


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

/*function loadFreebies(){

    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        console.log(data)
        entries = data.feed.entry;
        theGrid = document.getElementById("freebies");
        // entries.reverse();

        // if result is more than 0
        if (Array.isArray(entries) && entries.length) {
            
            // console.log(entries);
            var freebie_link = [];
            var freebie_time = [];

            // parsing JSON file
            // entries.forEach(entry => {
            entries.forEach(function (entry, i) {
                
                if(entry.gs$cell.col == 1){
                    // console.log("link: "+entry.content.$t)
                    freebie_link[i] = entry.content.$t;
                }else{
                    // console.log("date: "+entry.content.$t)
                    freebie_time[i-1] = entry.content.$t;
                }
            });            

            // looping the data
            freebie_link.reverse();
            freebie_time.reverse();

            freebie_link.forEach(function(frb, i){
                

                var freebie = document.createElement('div');
                freebie.classList.add('p-widget__box');
                // freebie.href = frb;
                // freebie.target = "_blank";

                // check the time
                var time_posted = ""
                if(freebie_time[i]){
                    var time_posted = moment(freebie_time[i]).fromNow();   
                    time_posted = "" + time_posted;
                }else{
                    time_posted = "Date not set."
                }

                // freebie.innerHTML = '<div>COLLECT HOF FREE SPINS' + '<span class="unique-id">ID:'+makeid(10)+'</span><span class="posted-time">' + time_posted+"</span></div>";
                freebie.innerHTML = `<div class="pw-item">
                        <a class="freebie" href="`+frb+`" target="_blank">
                            <div class="freebie__icon">
                                <img src="https://wsopdailyfreechips.com/wp-content/uploads/2019/01/wsop-icon.png" />
                            </div>
                            <div class="freebie__meta">
                                <h3 class="pw-item__title">COLLECT FREE CHIPS</h3>
                                <span class="pw-item__unique-id">ID:`+makeid(10)+`</span>
                                <span class="pw-item__posted-time">`+time_posted+`</span>
                            </div>
                        </a>
                    </div>`;
                theGrid.appendChild(freebie);

            });
    
            loading = document.getElementById("loading");
            loading.remove();
            

        }else{
            console.log("array is empty")
            // display default
        }

    });
}


loadFreebies();*/


function initialFetch(){

    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        // console.log(data)
        
        entries = data.feed.entry;
        entries.reverse();
        if (Array.isArray(entries) && entries.length) {
            
            window.pldNumOfEntries = data.feed.entry.length/2;
            window.pldPerPage = 9;


            // parsing JSON file
            // entries.forEach(entry => {
            entries.forEach(function (entry, i) {
                
                if(entry.gs$cell.col == 1){
                    // console.log("link: "+entry.content.$t)
                    // freebie_link[i] = entry.content.$t;
                    window.freebie_link.push(entry.content.$t);
                }else{
                    // console.log("date: "+entry.content.$t)
                    // freebie_time[i-1] = entry.content.$t;
                    window.freebie_time.push(entry.content.$t);
                }
            });

            // Looping the initial freebies
            for (let i = 0; i < window.pldPerPage; i++) {
                theGrid = document.getElementById("freebies");
                createFreebie(theGrid, window.freebie_link[i], window.freebie_time[i])
                window.pldIndex++;
            }
            loading = document.getElementById("loading");
            loading.remove();
        }
    });
}
initialFetch();

function loadFreebies(){
    theGrid = document.getElementById("freebies");
    if( window.pldIndex < window.pldNumOfEntries){
        console.log("Adding 9 more");
        // console.log(window.pldIndex);
        c = window.pldIndex;
        for (let i = c; i < (c+window.pldPerPage); i++) {
            theGrid = document.getElementById("freebies");
            createFreebie(theGrid, window.freebie_link[i], window.freebie_time[i])
            window.pldIndex++;
        }
        
    }else{
        console.log("Limit reached");
        loadMore = document.getElementById("load-more");
        loadMore.classList.add('load-more__disabled');
        loadMore.background = "#aaa";
        loadMore.cursor = "none;"
        loadMore.color = "#666;"
        loadMore.pointerEvents = "none";
        loadMore.innerHTML = "LIMIT REACHED";
    }

    loading = document.getElementById("loading");
    loading.remove();
    
}

function createFreebie(theGrid, link, time){

    if(link){
        console.log(link +" | "+time);

        var freebie = document.createElement('div');
        freebie.classList.add('p-widget__box');

        // // check the time
        var time_posted = ""
        if(time){
            var time_posted = moment(time).fromNow();   
            time_posted = "Posted " + time_posted;
        }else{
            time_posted = "Date not set."
        }

        freebie.innerHTML = `<div class="pw-item">
                <a class="freebie" href="`+link+`" target="_blank">
                    <div class="freebie__icon">
                        <img src="https://wsopdailyfreechips.com/wp-content/uploads/2019/01/wsop-icon.png" />
                    </div>
                    <div class="freebie__meta">
                        <h3 class="pw-item__title">COLLECT FREE CHIPS</h3>
                        <span class="pw-item__unique-id">ID: `+(window.pldNumOfEntries-window.pldIndex)+`</span>
                        <span class="pw-item__posted-time">`+time_posted+`</span>
                    </div>
                </a>
            </div>`;
        theGrid.appendChild(freebie);

    }else{
        console.log("not valid");
    }

    
}


function loadMore(){
    // alert("okay my boi");
    theGrid = document.getElementById("freebies");
    var loading = document.createElement('div');
    loading.id = 'loading';
    theGrid.appendChild(loading);
    //code before the pause
    setTimeout(function(){
        //do what you need here
        loadFreebies();
    }, 1000);
    
}

