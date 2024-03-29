$(document).ready(function () {

    const notesStorageIdentifier = "notes";
    const dateOfNotesItendtifier = "DON";

    var notes = JSON.parse(localStorage.getItem(notesStorageIdentifier));
    var dateOfNotes = localStorage.getItem(dateOfNotesItendtifier);
    
    function setNotesColoring() {
        // var now = moment("1500", "hmm").get("h") - 9;       /* FOR TESTING ONLY */
        var now = moment().get("h") - 9;

        $(".timeBlock").each(function (index) {

            $(this).children(".description").removeClass("past present future");

            if (index < now) {
                $(this).children(".description").addClass("past");
            }
            else if (index === now) {
                $(this).children(".description").addClass("present");
            }
            else {
                $(this).children(".description").addClass("future");
            };


        });
    };

    function saveNotes(event) {

        event.preventDefault();

        var index = $(".saveBtn").index(this);

        notes[index] = $(this).parent().children(".description").val();

        localStorage.setItem(notesStorageIdentifier,JSON.stringify(notes));

    }

    function fillUpNotesFromStorage(){
        $(".description").each(function(index) {
            if(notes[index] !== null && notes[index] !== ""){
                $(this).val(notes[index]);
            }            
        });
    }
    
    if(notes === null){
        var notes = new Array(9);
    }

    if(dateOfNotes === null){
        var dateOfNotes = moment().format("dddd, MMMM Do ");
    }


    $("p#currentDay").text(moment().format("dddd, MMMM Do "));
    localStorage.setItem(dateOfNotesItendtifier,moment().format("dddd, MMMM Do "));

    if(dateOfNotes !== moment().format("dddd, MMMM Do ")){
        if(notes !== undefined){
            notes.fill("");
        }
    }
    
    setNotesColoring();         

    setInterval(setNotesColoring, 1000) 

    fillUpNotesFromStorage();

    $(".saveBtn").on("click",saveNotes);

});