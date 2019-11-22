const movieApp = {};

movieApp.apiKey = "ddeff0fdf2d0c94ee533861e5e5bd368";

// these will be our input variables
movieApp.genreID = 0; //action movie genre
movieApp.releaseYear = 0; //year 
movieApp.voterAverage = 8;

// Make AJAX request with user inputted data
movieApp.getInfo = function () {
    movieApp.yearOfMaking();
    movieApp.movieGenre();
    return $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie",
        method: "GET",
        dataType: "json",
        data: {
            api_key: movieApp.apiKey,
            with_genres: movieApp.genreID,
            primary_release_year: movieApp.releaseYear,
            "vote_average.gte": 7,
            // "vote_count.gte": 500
            sort_by: "vote_count.desc",
        }
    }).then((result) => {
        movieApp.newResult = result.results.slice(0, 3);
        // console.log(newResult);
        // let movieHtml = `<h2>${newResult[0].title}</h2> <p>${newResult[0].overview}</p> <img src="https://image.tmdb.org/t/p/w500${newResult[0].poster_path}" alt="${newResult[0].title} poster">`
        // $(".resultPageSection").append(movieHtml)
        $(".resultPageSection").empty()
        movieApp.newResult.forEach((movie, index) => {
            let movieHtml = `<button value="${index}"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster"></button>`;
            // movieHtml = `${movie.poster_path}`
            $(".resultPageSection").append(movieHtml)
            
            $(".resultPageSection button").css({
                "width": "calc(100% / 3)",
            })
        })
    })
}

// Function to display the selected film's info



// Function to select the year by the user
movieApp.yearOfMaking = function() {
        movieApp.releaseYear = $('#year').val();
}

// Function to select the genre by the user on-click event handler
movieApp.movieGenre = function() {
        movieApp.genreID = $("input[type=radio]:checked").val();
}

$(function () {
    $("input[type=submit]").on("click", function(e){
        e.preventDefault();
        movieApp.getInfo();
    });
    $('.resultPageSection').on('click', "button", function() {
        const displaySwitch = $(this).val();
        // console.log(movieApp.newResult[displaySwitch]);

        let movieHtml = `<h2>${movieApp.newResult[displaySwitch].title}</h2> <p>${movieApp.newResult[displaySwitch].overview}</p>`
        $(".finalResult").empty()
        $(".finalResult").append(movieHtml);
    })
});