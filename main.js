const baseApiUrl = "https://private-anon-86f6342d64-lyricsovh.apiary-mock.com/v1";

// använd param -notation för att hålla koll på vad funktioner gör !

/**
 * Takes an HTMLInputElement and returns true/false if it's empty/valid
 * @param {HTMLInputElement} input 
 */
const isNotEmpty = (input) => {
    if (input.value === "") {
        return false
    }

    return true
}

const setLyrics = (data) => {

    console.log(data)

    if (data.lyrics) {
        let textareaElement = document.createElement('textarea');
        textareaElement.className = "lyrics";

        textareaElement.innerHTML = data.lyrics;

        let output = document.getElementById('lyrics-output');

        output.innerHTML = "";
        if (output) output.append(textareaElement);
    }
}

/** 
 * Returns an url string for the lyrics.ovh api  
 */
const createUrl = (artist, song) => {
    let baseUrl = baseApiUrl;

    return `${baseUrl}/${artist}/${song}`;
}

/**
 * Returns a string with lyrics for a given artist/song
 * @param {string} artist 
 * @param {string} song 
 * @returns {string}
 */
const getLyrics = (artistInput, songInput) => {
    //use "isNotEmpty", it gives a value as either a string or null
    let artist = isNotEmpty(artistInput) ? artistInput.value : null
    let song = isNotEmpty(songInput) ? songInput.value : null

    if (artist && song) {
        // get stuff

        let url = createUrl(artist, song)

        // debugger;

        let request = new Request(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        fetch(request).then(res => {
            console.log('response', res);
            if (res.ok) {
                return res.json()
            } else {
                console.log('something went wrong')
            }

        }).then(data => {
            console.log(data)
            setLyrics(data)  
        })
    } else {
        alert('Try again!')
    }
}

/**
 * Adds event listener to get lyrics button
 */
const setupElements = () => {
    // kolla så alla element finns på sidan
    let artist = document.getElementById('artist'),
        song = document.getElementById('song'),
        button = document.getElementById('get-lyrics-button');

    if (artist && song && button) {
        button.addEventListener('click', () => {
            getLyrics(artist, song)
        })
    }
}

(init = () => {
    console.log('checking if doc ready')
    // om readystate på doket inte är complete så 
    // var inte elemneten alltid där på page-load och scriptet faila
    if (document.readyState == 'complete') {
        setupElements()
    } else {
        // settimeout definitionen:
        // setTimeout(callback, delay)

        setTimeout(() => { 
            init() 
        }, 50)
    }
})()