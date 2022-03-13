//https://api.lyrics.ovh/v1/Passenger/let-her-go

//https://api.lyrics.ovh/suggest/let-her-go



const searchBTN = document.getElementById('fa-search');

searchBTN.addEventListener("click", function() {
    const inputValue = document.getElementById('inpt').value;

    const url = `https://api.lyrics.ovh/suggest/${inputValue}`
    fetch(url)
        .then(response => response.json())
        .then(info => shoSong(info.data))

    function shoSong(data) {
        const contaner = document.getElementById('contaner')
        contaner.innerHTML = ''
        data.map(readon => {
            const div = document.createElement('div')
            div.innerHTML = `
               <div class="main">
        <div class="card text-center">
            <div class="card-body">
                <h4 class="card-title">${readon.title}</h4>
                <h5 class="card-subtitle mb-2 text-muted">${readon.artist.name}</h5><br>
                <audio controls>
                    <source src="${readon.preview}" type="audio/mpeg">
                </audio> <br><br>
                <a href="#" class="btn btn-primary" onclick="faceLyricsSongs('${readon.artist.name}','${readon.title}')">Lyrics-Song</a>
            </div>
        </div>
               `
            contaner.appendChild(div)
        })
    }

})

function faceLyricsSongs(titl, artis) {

    const url = `https://api.lyrics.ovh/v1/${titl}/${artis}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById('lyrics-song').innerText = data.lyrics;
        })

}

//



document.getElementById('inpt').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        searchBTN.click()
    }
})