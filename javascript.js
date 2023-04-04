//load function contains all javascript code
window.addEventListener("load", function () {

    console.log(window.innerWidth);

    //create an array of random colors
    let highlight_colours = ["#BFA7E8", "#3B6D56", "#FC5D00", "#0062FE", "#62411F", "#818D71", "#c49793", "#b59e69", "#6992b3"];

    //generate a ranom number according to the number of colors in the array (0 - (arraycount))
    let randomcolor = Math.floor(Math.random() * highlight_colours.length);

    //set root property to a random color
    document.querySelector(':root').style.setProperty('--main-highlight-color', highlight_colours[randomcolor]);


    let mobile;

    //initialisation of mobile variable
    if (window.innerWidth < 602) {
        mobile = true;
    } else {
        mobile = false;
    }



    //HIGHLIGHTING CORRESPONDING THESES BASED ON THE FILTER MENU

    //Highlight the corresponding author/title in the running text when hovering in the menu
    document.querySelectorAll("li").forEach(function (li) {
        //show author
        document.querySelectorAll(".thesisAuthor").forEach(function (thesisAuthor) {
            li.addEventListener("mouseenter", function () {
                if (!mobile) {
                    //Highlight the corresponding author in the running text when hovering in the menu
                    if (li.textContent.includes(`${thesisAuthor.textContent.substring(3)}`)) {
                        thesisAuthor.parentNode.classList.add("visible");
                    }

                    //Highlight all items in the running text that match the keyword
                    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {
                        if (thesisWrapper.classList.contains(`${li.textContent.replace(/ .*/,'').toLowerCase()}`)) {
                            thesisWrapper.classList.add("visible");
                        }
                    })
                }
            })
            //            if (li.parentNode.classList.conains("keywordsList")) {
            li.addEventListener("mouseleave", function () {
                if (!mobile) {
                    //Remove highlight when not hovering
                    if (li.textContent.includes(`${thesisAuthor.textContent.substring(3)}`)) {
                        thesisAuthor.parentNode.classList.remove("visible");
                    }

                    //Remove all items in the running that match the keyword
                    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {
                        if (thesisWrapper.classList.contains(`${li.textContent.replace(/ .*/,'').toLowerCase()}`)) {
                            thesisWrapper.classList.remove("visible");
                        }
                    })
                }
            })
            //            }



            //this locks the highlighting of the keywords and their corresponding items 
            li.addEventListener("click", function () {
                document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {

                    //check if the textcontent of the filter matches the classname of the corresponding theses. the OR statement is neccessary incase it has the "X " attached to it. The "replace(/ .*/,'')" deleted everything after the first word, sothat only the first word is checked—which corresponds to the classname.
                    if (thesisWrapper.classList.contains(`${li.textContent.replace(/ .*/,'').toLowerCase()}`) || thesisWrapper.classList.contains(`${li.textContent.substring(2).replace(/ .*/,'').toLowerCase()}`)) {
                        thesisWrapper.classList.toggle("clickHighlighted");
                    }
                })
                if (li.parentNode.classList.contains("keywordsList")) {

                    if (!(Array.from(li.textContent)[0] == "X")) {
                        li.textContent = "X " + li.textContent;

                    } else if ((Array.from(li.textContent)[0] == "X")) {
                        li.textContent = li.textContent.substring(2);
                    }

                    li.classList.toggle("clickHighlighted");
                }
            })
        })

        //show title
        document.querySelectorAll(".thesisTitle").forEach(function (thesisTitle) {
            li.addEventListener("mouseenter", function () {
                if (!mobile) {
                    //Highlight the corresponding title in the running text when hovering in the menu
                    if (li.textContent.includes(`${thesisTitle.textContent}`)) {
                        thesisTitle.parentNode.classList.toggle("visible");
                    }
                }
            })
            li.addEventListener("mouseleave", function () {
                if (!mobile) {
                    //Remove highlight when not hovering
                    if (li.textContent.includes(`${thesisTitle.textContent}`)) {
                        thesisTitle.parentNode.classList.toggle("visible");
                    }
                }
            })
        })



        //style all filteritem authors in bold
        if (document.querySelector(".authorList").contains(li)) {
            li.style.fontWeight = "bold";
        }
        //style all filteritem titles in italic
        if (document.querySelector(".titleList").contains(li)) {
            li.style.fontStyle = "italic";
        }
    })



    //HIDING AND SHOWING THE DROP(UP) MENU ON HOVER

    //this variable will be needed to check if the cursor has entered the listItems
    let mouseneterVariable = false;

    document.querySelector(".allList").style.height = 0;

    document.querySelectorAll("h3").forEach(function (h3) {
        h3.addEventListener("mouseenter", function () {
            //only do this on desktop, otherwise the mouseenter eventlistener breaks things, as if it were a click
            if (!mobile) {

                document.querySelectorAll("ul div").forEach(function (listBlocks) {
                    //first, hide all lists when a filterbutton is hovered, to clear 
                    listBlocks.style.display = "none";
                    listBlocks.addEventListener("mouseleave", function () {
                        //also hide all on mouseleave 
                        listBlocks.style.display = "none";
                    })
                })
                //show the corresponding list of the filterbutton on mouseenter 
                document.querySelector(`.${h3.classList[0]}List`).style.display = "block";
                setTimeout(() => {
                    //this here is only wrapped in a settimeout sothat the opacity animation works 
                    document.querySelector(`.${h3.classList[0]}List`).style.opacity = "1";
                    document.querySelector(`.${h3.classList[0]}List`).style.left = h3.getBoundingClientRect().left + "px";
                }, 10);
            }
        })
    })

    //This could probably be merged with the top function
    document.querySelectorAll("h3").forEach(function (h3) {
        //        document.querySelector("ul.allList").style.height = "0";
        h3.addEventListener("mouseleave", function () {
            //only do this on desktop, otherwise the mouseenter eventlistener breaks things, as if it were a click
            if (!mobile) {
                document.querySelectorAll("ul div").forEach(function (listBlocks) {
                    //this settimeout gives the user some time to start hivering the listitems, before they disappear 
                    let timer = setTimeout(() => {
                        document.querySelectorAll("li").forEach(function (lis) {
                            lis.addEventListener("mouseenter", function () {
                                //change the mouseneterVariable to true on mouseenter; this will cause the settimeout function to be interrupted
                                mouseneterVariable = true;
                            })
                        })
                        document.querySelectorAll("ul div").forEach(function (lis) {
                            lis.addEventListener("mouseleave", function () {
                                //change mouseneterVariable back to false on mouseleave
                                mouseneterVariable = false;
                            })
                        })

                        if (mouseneterVariable == true) {
                            //clear the setInterval function if the user hovers a listitem, preventing the listmenu from closing
                            clearInterval(timer);
                        } else {
                            //else, close the menu afeter 200ms
                            document.querySelector(`.${h3.classList[0]}List`).style.display = "none";
                        };
                    }, 200);
                })
            }
        })
    })


    //update positioning of filteritems on resize
    window.addEventListener("resize", function () {
        document.querySelector(".authorList").style.left = document.querySelector("h3.author").getBoundingClientRect().left + "px";
        document.querySelector(".titleList").style.left = document.querySelector("h3.title").getBoundingClientRect().left + "px";
        document.querySelector(".keywordsList").style.left = document.querySelector("h3.keywords").getBoundingClientRect().left + "px";
    })


    //show & Hide "Website Created by Lara Dautun & Patrick Hutchinson
    document.querySelector(".creatorInfo").addEventListener("mouseenter", function () {
        document.querySelector(".creatorInfoContent").style.visibility = "visible";
    });
    document.querySelector(".creatorInfo").addEventListener("mouseleave", function () {
        document.querySelector(".creatorInfoContent").style.visibility = "hidden";
    });

    if (mobile) {
        document.querySelector(".keywordsList").style.left = document.querySelector("h3.keywords").getBoundingClientRect().left + "px";
        //        document.querySelector(".keywordsList").style.marginLeft = document.querySelector(".allList").clientWidth + "px";
        console.log(document.querySelector(".keywordsList").clientWidth);
        document.querySelector("h3.keywords").addEventListener("click", function () {
            document.querySelector("main").classList.toggle("blurred");
            document.querySelector(".keywordsList").classList.toggle("extended");
        })
    }

    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {
        thesisWrapper.addEventListener("mouseenter", function () {
            thesisWrapper.classList.add("visible");
        })
    })
    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {
        thesisWrapper.addEventListener("mouseleave", function () {
            thesisWrapper.classList.remove("visible");
        })
    })

    let wordlimit = 20;
    let largerwordlimit = 50;

    //add (...) if descriptionsentence is longer that 50 words
    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrappers) {
        window.addEventListener("resize", function () {
            if (!mobile) {
                if (window.innerWidth < 850) {
                    console.log("smaller than 850")
                    if (thesisWrappers.textContent.split(" ").length > wordlimit - 1) {
                        thesisWrappers.textContent = thesisWrappers.textContent.split(/\s+/).slice(0, wordlimit).join(" ") + " (...)";
                    }
                } else if (window.innerWidth > 850) {
                    console.log("bigger than 850")
                    if (thesisWrappers.textContent.split(" ").length > largerwordlimit - 1) {
                        thesisWrappers.textContent = thesisWrappers.textContent.split(/\s+/).slice(0, largerwordlimit).join(" ") + " (...)";
                    }
                }
            }
        })
    })

    




    //end of load function
})
