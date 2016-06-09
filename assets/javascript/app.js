$(document).ready(function(){
  console.log('ready!');


  var shows = ['Family Guy','The Simpsons','Breaking Bad','Sons of Anarchy','Game of Thrones','The Walking Dead'];

  //holds array still urls
  var staticURL = [];
  //array holds all animated urls
  var animatedURl = [];


   //functions makes everything work
  function render() {


    //clears the button section then makes new button for each item in the array
    $("#buttonArea").empty();
    for (var i = 0; i < shows.length; i++) {
          var newButton = $("<button>");
          newButton.text(shows[i]);
          newButton.attr("data-name",shows[i]);
          newButton.addClass("show");
          $("#buttonArea").append(newButton);

    };


      //when you click on add button
      $(".show").click(function() {

        //empties arrays
        animatedURl = [];
        staticURL = [];

        //empties gif area
        $("#gifArea").empty();

        //plugs name of show that will going into the url used with the api
        var replace = $(this).attr("data-name");
        var queryURl = "https://api.giphy.com/v1/gifs/search?q=" + replace + "&api_key=dc6zaTOxFJmzC&limit=10";

        //ajax call
        $.ajax({url: queryURl,
          method:"GET"})

        .done(function(gif){

          //logging stuff for debugging
          console.log(gif);
          console.log(queryURl);

          //make divs and img and append them 
          for (var i = 0; i < 10; i++) {

            animatedURl.push(gif.data[i].images.fixed_height.url);
            staticURL.push(gif.data[i].images.fixed_height.url);


            var newDiv = $("<div>");
            newDiv.addClass("gifDiv");

            var p = $("<p>");
            p.text(gif.data[i].rating);

            if (gif.data[i].rating == "") {
              p.text("n/a")
            };

            var newGif = $("<img>");

            newGif.attr("data-number",i)
            newGif.attr("src", gif.data[i].images.fixed_height_still.url);

            newDiv.append(p);
            newDiv.append(newGif);


            $("#gifArea").append(newDiv);



            //this function plays and pause gif
            newGif.click(function(){
              if ( $(this).attr("src") == staticURL[$(this).attr("data-number")]) {
                  $(this).attr("src",animatedURl[$(this).attr("data-number")])
              }

              else {
                $(this).attr("src",staticURL[$(this).attr("data-number")]);

              };


            });
          };


        });
      });

  };

  //putting initial button on the page
  render();
  

  //function adds add button to the list of button
  $("#addShow").click(function(){
      var addedButton = $("#inputBox").val();
      $ ("#inputBox").val(null);
      shows.push(addedButton);
      render();

  });

});
