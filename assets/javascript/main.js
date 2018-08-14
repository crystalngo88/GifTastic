var topics = ["Rachel Green", "Monica Geller", "Joey Tribbiani", "Ross Geller", "Phoebe Buffay", "Chandler Bing"]
      function renderButtons(){
        console.log('running renderButtons')

        $('#buttonsContainer').empty();
        for (var i = 0; i < topics.length; i++){
        var button = $("<button>");
          button.addClass("gif");
          button.attr("data-name", topics[i]);

          button.text(topics[i]);
          $("#buttonsContainer").append(button);
        }

    $("button").on("click", function(data) {
      console.log('running button click')
      $("#gifsContainer").empty();
      //create button for each topic with same value to search
      var friend = $(this).attr("data-name").trim();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        friend + "&api_key=ViqB7iyqW6TmyCQYSFHpgGxhdfLaOTPp";

      console.log('queryURL:', queryURL)
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < 10; i++) {
            var friendDiv = $("<div />");
            var img = $("<img />");
            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("status", 'still');
            img.attr('animatedSource', results[i].images.fixed_height.url);
            img.attr('stillSource', results[i].images.fixed_height_still.url);

            img.addClass('gif');
            var rating = results[i].rating;
            var p = $("<p/>").text("Rating: " + rating);

            friendDiv.append(img);
            friendDiv.append(p);

            $("#gifsContainer").prepend(friendDiv)
        };

        $("img").on("click", function() {
            var state = $(this).attr("status")
      
            if(state === "still") {
              $(this).attr("status", "animate")
              $(this).attr("src", $(this).attr("animatedSource"))
            }
      
            if(state === "animate") {
              $(this).attr("status", "still")
              $(this).attr("src", $(this).attr("stillSource"))
            }
          });

       });
        
    });
      }

      $("#submitButton").on("click", function(event){
        event.preventDefault();
        console.log('running submitbutton')
        $("#gifsContainer").empty();
        var userInput = $("#user-input").val().trim(); 
        topics.push(userInput);
        $("#user-input").val("")
        renderButtons();
      });

      renderButtons();