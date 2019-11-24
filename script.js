const movieApp = {};

movieApp.apiKey = `ddeff0fdf2d0c94ee533861e5e5bd368`;

// Input variables
movieApp.genreID = []; 

movieApp.releaseYear = [];

movieApp.voterAverage = [];

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
            // "original_language": "en",
            "vote_average.gte": 7,
            sort_by: "vote_count.desc",
        }
    }).then((result) => {
        movieApp.newResult = result.results.slice(0, 3);
        movieApp.newResult.forEach((movie, index) => {
            let movieHtml = `<button value="${index}"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster"></button>`;
            
            $(".resultPageSection").append(movieHtml);
            
            if (movieApp.newResult.length === 3) {
                $(".resultPageSection button").css({
                    "width": "calc(100% / 3)",
                })
            } else if (movieApp.newResult.length === 2) {
                $(".resultPageSection button").css({
                    "width": "calc(100% / 2)",
                })
            } else {
                $(".resultPageSection button").css({
                   "position": "absolute",
                   "left": "50%",
                   "transform": "translate(-50%)",
                })
            }
        })
    })
}

// Function to select the year by the user
movieApp.yearOfMaking = function() {
    movieApp.releaseYear = $('#year').val();
}

// Function to select the genre by the user on-click event handler
movieApp.movieGenre = function() {
    movieApp.genreID = $("input[type=radio]:checked").val();
}

// Function to hide the main page
movieApp.displaySearchPage = function () {
    $('.showBegins').hide();
}

// Function to reset the result page and back to main page
movieApp.displayMovies = function () {
    $('.resetButton').on('click', function() {
        $('.resultPageSection').empty();
        $('.showBegins').show();
        $('#year').val('');
        $("input[type=radio]").prop("checked", false);
    })
}

// Function to prevent user getting result before entering a valid year
movieApp.userSubmission = function() {
    $(".getMovies").on("click", function (e) {
        e.preventDefault();

        // If user enters the correct year but forget to select genre
        if (!$("input[type=radio]").is(':checked') && 
            $('#year').val() <= 2020 &&
            $('#year').val() >= 1895
        ) {
            swal({
                title: 'WARNING!',
                text: 'You Never Wanna Miss the Genre!!',
                imageUrl: 'image/joker.gif',
                imageWidth: 500,
                imageHeight: 300,
                imageAlt: 'Joaquin Phoenix in Joker Smiling',
            })
        // If user forget to enter both year and select genre
        } else if ($('#year').val() === "" && 
                    !$("input[type=radio]").is(':checked')) {
            swal({
                title: 'WARNING!',
                text: 'Arrrrr! You Forgot to Enter Year and Select Genre',
                imageUrl: 'image/shining2.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Jack Nicholson in Shining',
            })
        // If user enters a year before 1895 or after 2020    
        } else if ($('#year').val() > 2020 || $('#year').val() < 1895) {
            swal({
                title: 'WARNING!',
                text: 'Honey, Select a Year Between 1985 and 2020',
                imageUrl: 'image/pulpFiction.jpg',
                imageWidth: 600,
                imageHeight: 200,
                imageAlt: 'Marylin Monroe medium shot',
            })
        // If user enters the correct year and pick genre
        } else if ($('#year').val() !== "" &&
            $('#year').val() <= 2020 &&
            $('#year').val() >= 1895
        ) {
            movieApp.getInfo();
            movieApp.displaySearchPage();
            movieApp.displayMovies();
        }
    });
}

// Function to append the final result to the page
movieApp.resultInfo = function() {
    $('.resultPageSection').on('click', "button", function () {
        const displaySwitch = $(this).val();

        let movieHtml = `<h2>${movieApp.newResult[displaySwitch].title}</h2> <p>${movieApp.newResult[displaySwitch].overview}</p>`
        $(".finalResult").empty()
        $(".finalResult").append(movieHtml);
    })
}  

// Create init to start the movieApp initiating on click of submit button
movieApp.init = function() {
    movieApp.userSubmission();
    movieApp.resultInfo();
}

// document READY. Wait untill everything is loaded successfully
$(function () {
    movieApp.init();
});