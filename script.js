// Create app namespace to hold all methods

// Collect user input
// app.collectInfo = function () {

// }

const app = {};

app.apiKey = "ddeff0fdf2d0c94ee533861e5e5bd368";

// these will be our input variables
app.genreID = 28; //action movie genre
app.releaseYear = 2019; //year 
app.voterAverage = 8;

// Make AJAX request with user inputted data
app.getInfo = function () {
    $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie",
        method: "GET",
        dataType: "json",
        data: {
            api_key: app.apiKey,
            with_genres: app.genreID,
            "original_language": "en",
            primary_release_year: app.releaseYear,
            // "vote_average.gte": app.voterAverage,
        }
    }).then((result) => {
        console.log(result);
    })
}

$(function () {
    // app.init();
    app.getInfo();
});

// Display data on the page
// app.displayInfo = function () {

// }

// // Start app
// app.init = function () {

// }