//Request function
const getParks = (states, limit) => {
  fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=ga&stateCode=${states}&limit=${limit}
    &api_key=zKMGViuYG0dAD6tASWELg5wOsuhV7kfdtDXD7IN0`
  )
    .then(res => res.json())
    .then(json => getParkHtml(json.data));
};

//Converts Result To Html
const getParkHtml = arr => {
  const resultHtml = arr
    .map(
      ({ fullName, description, url, directionsUrl }) => `<div class="location">
<h3>${fullName}</h3>
<p>${description}</p>
<a href="${url}">Check Out Their Link</a>
<br />
<a href="${directionsUrl}">Get Directions</a>
</div>`
    )
    .join("");
  $(".results").html(resultHtml);
};

const handleSubmit = () => {
  $(".form").on("submit", e => {
    e.preventDefault();
    const state1 = $(".state1").val();
    const state2 = $(".state2").val();
    const state3 = $(".state3").val();
    const states = [];
    if (state1) states.push(state1);
    if (state2) states.push(state2);
    if (state3) states.push(state3);
    const querystates = states.join();
    console.log(querystates);
    const limit = $("#input2").val();
    getParks(querystates, limit ? limit : 10);
  });
};
const main = () => {
  handleSubmit();
};

$(main);
