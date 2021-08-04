const videoCardContainer = document.querySelector(".video-container");

let apiKey = "AIzaSyAO-TYd2kVQtS0J1gti4sCmDuQ81-S5m-c";
let videoHttp = "https://www.googleapis.com/youtube/v3/videos?";
let channelHttp = "https://www.googleapis.com/youtube/v3/channels?";

fetch(videoHttp + `key=${apiKey}&part=snippet&part=statistics&chart=mostPopular&maxResults=100&regionCode=ID`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video) => {
  fetch(channelHttp + `key=${apiKey}&part=snippet&part=statistics&id=${video.snippet.channelId}`)
    .then((res) => res.json())
    .then((data) => {
      video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video);
    });
};

const formatTime = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  let result;

  if (dt < 10) {
    dt = "0" + dt;
  }

  let mname = ["None", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  result = `${dt} ${mname[month]} ${year}`;
  return result;
};

const formatNumber = (number) => String(number).replace(/(.)(?=(\d{3})+$)/g, "$1,");

const makeVideoCard = (video) => {
  videoCardContainer.innerHTML += `
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${video.id}'">
    <img src="${video.snippet.thumbnails.high.url}" class="thumbnail" />
    <div class="content">
      <img src="${video.channelThumbnail}" class="channel-icon" />
      <h4 class="title">${video.snippet.title}</h4>
      <div class="info">
        <p class="channel-name">${video.snippet.channelTitle}</p>
        <p class="views">${formatNumber(video.statistics.viewCount)} x ditonton</p><p class="upload-time">${formatTime(video.snippet.publishedAt)}</p>
      </div>
    </div>
  </div>
  `;
};

// Search Bar
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
