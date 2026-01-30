const videoPlayer = document.getElementById("videoPlayer");
const videoList = document.getElementById("videoList");

fetch("videos.json")
  .then(response => response.json())
  .then(data => {
    data.videos.forEach(video => {
      const div = document.createElement("div");
      div.className = "video-item";
      div.textContent = video.name;

      div.onclick = () => {
        videoPlayer.src = video.url;
        videoPlayer.play();
      };

      videoList.appendChild(div);
    });
  })
  .catch(error => {
    console.error("Error loading videos:", error);
  });
