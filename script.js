const videoPlayer = document.getElementById("videoPlayer");
const videoList = document.getElementById("videoList");

let videos = [];
let currentIndex = 0;

fetch("videos.json")
  .then(response => response.json())
  .then(data => {
    videos = data.videos;

    // ▶️ Play first video automatically
    if (videos.length > 0) {
      playVideo(0, true);
    }

    videos.forEach((video, index) => {
      const div = document.createElement("div");
      div.className = "video-item";
      div.textContent = video.name;

      div.onclick = () => {
        playVideo(index, false);
      };

      videoList.appendChild(div);
    });
  })
  .catch(error => {
    console.error("Error loading videos:", error);
  });

// ▶️ Play video function
function playVideo(index, muted) {
  currentIndex = index;
  videoPlayer.src = videos[index].url;
  videoPlayer.muted = muted;
  videoPlayer.play();
}

// ⏭️ Auto play NEXT video when current ends
videoPlayer.addEventListener("ended", () => {
  let nextIndex = currentIndex + 1;

  if (nextIndex < videos.length) {
    playVideo(nextIndex, false);
  } else {
    // optional: restart playlist
    playVideo(0, false);
  }
});
