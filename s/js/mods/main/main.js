require(["js/libs/jquery-1.6.2.js",
        "js/libs/mustache.js",
        "text!tpls/greeting.mustache"],
    function(_, _, tGreet) {

        $(function() {
            $('h1:first').html("hello loaded");

            $("body").append(Mustache.to_html(tGreet, {place: "mousehouse", thing: "cheese"}));
        });
    }
);
