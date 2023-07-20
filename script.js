let audioElement = new Audio('resources/songs/mehram.mp3');
let Playing = document.getElementById('playing');
let mySeekBar= document.getElementById('seekBar');
let gif= document.getElementById('gif');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let songIndex =0;
let currentSongName=document.getElementById('currentSong');
let songDuration= document.getElementsByClassName('songDuration');
let currentSongTime= document.getElementsByClassName('currentSongTime');
// audioElement.play();

// Create an Audio object with the source URL
// Add an event listener for the 'loadedmetadata' event, which is fired when the audio's metadata is loaded
audioElement.addEventListener('loadedmetadata', function() {
  // Access the duration property once the metadata is loaded
  let durationInSeconds = audioElement.duration;

  // You can convert the duration to minutes and seconds if you prefer
  let minutes = Math.floor(durationInSeconds / 60);
  let seconds = Math.floor(durationInSeconds % 60);

  console.log(`Duration: ${minutes}:${seconds}`);
});

// Load the audio (you can also autoplay it if needed)
audioElement.load();

let songs=[
    {songName:'Mehram (Kahani2)',filePath:'resources/songs/mehram.mp3',Tpath:"resources/thumbnails/mehram.jpg"},
    {songName:'Nindiya (Sarbjit)',filePath:'resources/songs/Nindiya (Sarbjit).mp3',Tpath:"resources/thumbnails/nindiya.jpg"},
    {songName:'Dil Hamara La ilaaj',filePath:'resources/songs/la-ilaaj.mp3',Tpath:"resources/thumbnails/lailaaj.jpg"},
    {songName:'Baatien kuch ankahi si',filePath:'resources/songs/Baatein-Kuch-Ankahee-Si.mp3',Tpath:"resources/thumbnails/bateinkuchankahisi.jpg"},
    {songName:'Pehli Dafa',filePath:'resources/songs/pehlidafa.mp3',Tpath:"resources/thumbnails/pehlidafa.jpg"},
    {songName:'Mera Mann Kehne Laga',filePath:'resources/songs/Mera Mann Kehne Laga.mp3',Tpath:"resources/thumbnails/meramann.jpeg"},
]
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].Tpath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})
// alert(songs[0].songName);
// event listerners

// play/pause
Playing.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        Playing.classList.remove('fa-play-circle');
        Playing.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        Playing.classList.remove('fa-pause-circle');
        Playing.classList.add('fa-play-circle');
        gif.style.opacity=0;
        makeAllplays();
    }

})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    mySeekBar.value=progress;
})
mySeekBar.addEventListener('change',()=>{
    audioElement.currentTime=mySeekBar.value *audioElement.duration/100;
})

makeAllplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');

        })
}

// Add a separate event listener for each individual song play/pause button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
      // Pause the current song if it's playing
      if (!audioElement.paused && songIndex === parseInt(e.target.id) - 1) {
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllplays(); // Remove the 'fa-pause-circle' class from all other buttons
        // Update the main play/pause button
        Playing.classList.remove('fa-pause-circle');
        Playing.classList.add('fa-play-circle');
      } else {
        // Play the selected song
        makeAllplays(); // Remove the 'fa-pause-circle' class from all other buttons
        songIndex = parseInt(e.target.id) - 1;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        currentSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        Playing.classList.remove('fa-play-circle');
        Playing.classList.add('fa-pause-circle');
      }
    });
  });
  
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src=songs[songIndex].filePath;
    currentSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    Playing.classList.remove('fa-play-circle');
    Playing.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 5
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=songs[songIndex].filePath;
    currentSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    Playing.classList.remove('fa-play-circle');
    Playing.classList.add('fa-pause-circle');

})
// Add event listener for the 'backwardButton'
document.getElementById('backward').addEventListener('click', () => {
    // Decrease the currentTime by 10 seconds
    audioElement.currentTime -= 5;
  });
  
  // Add event listener for the 'forwardButton'
  document.getElementById('forward').addEventListener('click', () => {
    // Increase the currentTime by 10 seconds
    audioElement.currentTime += 5;
  });
  const aboutButton= document.getElementById('aboutbtn');
  const closeButton = document.getElementById('closebtn');
  const aboutSec = document.getElementById('aboutSec');
  
  // Add a click event listener to the close button
  closeButton.addEventListener('click', () => {
    aboutSec.style.display = 'none';
  });
  aboutButton.addEventListener('click', () => {
    aboutSec.style.display = 'Block';
    

  });