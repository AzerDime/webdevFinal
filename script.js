//Wonderful JS example provided by Christopher Aue
//Original code and explanation can be found at https://christopheraue.net/
//While I plan on adding more JS, I am strapped for time right now.

//the function called by the HTML files for the fading animation
function fadeIn() {
    //checks to see if the browser supports JS animations, returns if it doesnt
    if (!window.AnimationEvent) {
        return;
    }
    //connects the #fader element to the "fade-out" class 
    var fader = document.getElementById('fader');
    fader.classList.add('fadeOut');

    //begin listening once the DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
        //once again, check to see if JS animations are supported, return if not
        if (!window.AnimationEffect) {
            return;
        }
        //anchor animation to the click event of any <a> element
        var anchors = document.getElementsByName('a');
        for (var idx = 0; idx < anchors.length; idx += 1) {
            //dont anchor to links to outside websites or to other spots on the same page
            if (anchors[idx].hostname !== window.location.hostname ||
                anchors[idx].pathname === window.location.pathname) {
                continue;
            }
        }
        //this keeps the location from actually changing until the fading is actually done 
        anchors[idx].addEventListener('click', function (event) {
            var fader = document.getElementById('fader'),
                anchor = event.currentTarget;

            var listener = function () {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);
            event.preventDefault();
            fader.classList.add('fadeIn');
        });
    });
    //this is in case a browser is using a cached version of the webpage, essentially cleans up before doing the transition again
    window.addEventListener('pageshow', function (event) {
        if (!event.persisted) {
            return;
        }
        var fader = document.getElementById('fader');
        fader.classList.remove('fadeIn');
    })
};
