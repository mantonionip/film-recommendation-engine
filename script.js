const movieApp = {};

movieApp.apiKey = `ddeff0fdf2d0c94ee533861e5e5bd368`;

// Input variables
movieApp.genreID = []; 

movieApp.releaseYear = [];

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
            sort_by: "vote_count.desc",
        }
    }).then((result) => {
        movieApp.newResult = result.results.slice(0, 3);
        movieApp.newResult.forEach((movie, index) => {
            let movieHtml = 
            `<div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} pxoster">
                    </div>
                    <div class="flip-card-back">
                        <h2>${movie.title}</h2>
                        <p class="rating">Rating: ${movie.vote_average}/10</p>
                        <p class="synopsis"><span class="span">Synopsis:</span> ${movie.overview}</p>
                    </div>
                </div>
            </div>`
            
            $(".resultPageSection").append(movieHtml); 
        })
    })
}

// Function to display the instruction alert
movieApp.instructions = function () {
    $(".instructions").on("click", function () {
        swal(
            'Instructions',
            'Pick a Year, select your favorite genre, and get the first three high rated films. When you hover over the selected poster, it flips and you can get more info about your favorite film!',
        )
    })
}

// Function to select the year by the user 
movieApp.yearOfMaking = function() {
    movieApp.releaseYear = $('#year').val();
}

// Function to select the genre by the user
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
        // removes result page
        $('.resultPageSection').empty();
        // displays main page
        $('.showBegins').show();
        // resets year input
        $('#year').val('');
        // resets genre boxes
        $("input[type=radio]").prop("checked", false);
        // hides footer on the main page
        $('footer').empty();
        // hides reset button on the main page
        $('.resetButton').css({
            "display": "none"
        });
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
                text: 'Arrrrr! You Forgot to Pick  a Year and Select Genre',
                imageUrl: 'image/shining2.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Jack Nicholson in Shining',
            })

        // If user enters a year before 1895 or after 2020    
        } else if ($('#year').val() > 2020 || $('#year').val() < 1895) {
            swal({
                title: 'WARNING!',
                text: 'Honey, Select a Year Between 1895 and 2020',
                imageUrl: 'image/pulpFiction.jpg',
                imageWidth: 600,
                imageHeight: 200,
                imageAlt: 'Emma Thorman in Pulp Fiction lying on the bed smoking',
            })

        // If user enters the correct year and pick genre
        } else if ($('#year').val() !== "" &&
            $('#year').val() <= 2020 &&
            $('#year').val() >= 1895
        ) {
            movieApp.getInfo();
            movieApp.displaySearchPage();
            movieApp.displayMovies();
            movieApp.showFooter();

            // display reset button on the result page
            $('.resetButton').css({
                "display": "block"
            });
        }
    });
}

movieApp.showFooter = function() {
    const displayFooter = 
    `<div class="wrapper">
        <p>Copyright &#169; 2019 <span>Mehdi Pilehvarian</span> and <span>Wade Butler</span></p>
    </div>`
    // appends footer tot the second page on a user click
    $('footer').append(displayFooter);
}

// Create init to start the movieApp initiating on click of submit button
movieApp.init = function() {
    movieApp.instructions();
    movieApp.userSubmission();    
}

// document READY. Wait untill everything is loaded successfully
$(function () {
    movieApp.init();
});