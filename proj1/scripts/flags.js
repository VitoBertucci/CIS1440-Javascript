document.addEventListener("DOMContentLoaded", () => {
    //main heading
    const mainHeading = document.querySelector("#main-heading");

    //countries array
    const countries = [
        //lithuania img
        {
            id: "lithuania",
            country: "Lithuania",
            //link to images
            flagSrc: "images/flag-of-Lithuania.png",
            mapSrc: "images/lithuania-image.png",
        },

        //belgium img
        {
            id: "belgium",
            country: "Belgium",
            //link to images
            flagSrc: "images/flag-of-Belgium.png",
            mapSrc: "images/belgium-image.png",
        },

        //nepal img
        {
            id: "nepal",
            country: "Nepal",
            //link to images
            flagSrc: "images/flag-of-Nepal.png",
            mapSrc: "images/nepal-image.png",
        },
    ];

    //loop through countries array
    countries.forEach(({ id, country, flagSrc, mapSrc }) => {
        //get the img element
        const imgElement = document.getElementById(id);
        //add event listener to the img element
        imgElement.addEventListener("mouseover", () => {
            //change the src of the img element to the mapSrc
            imgElement.src = mapSrc;
            //change the text content of the main heading
            mainHeading.textContent = country;
        });
        //add event listener to the img element
        imgElement.addEventListener("mouseout", () => {
            //change the src of the img element to the flagSrc
            imgElement.src = flagSrc;
            //change the text content of the main heading
            mainHeading.textContent = "Countries and Flags";
        });
    });
});
