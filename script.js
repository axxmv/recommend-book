

//first section of code is initializing the variables


document.getElementById("getRecommendation").addEventListener("click", () => {

  // in javascript the key word genre is being set to the value of the tag called 'genre' inside of html
  const genre = document.getElementById("genre").value;

  // in javascript the key word 'resultsdiv' is being set to the div 'results' in html
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "Guys chill I'm almost done ;) ......."; // im guessing this is what is loaded before it is eventually overwritten whenver the api fetches
                                                                  //the book recomendation



///////////////////////////////////////////////////////////////////////////////////////////////////////////


const popularSwitch = document.getElementById("popularSwitch").checked;
const orderBy = popularSwitch ? "newest" : "newest";


  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(genre)}&maxResults=20`; //this is the api




  ///////////////////////////////////////////////
  //fetching using the api ;P

  fetch(url)
    .then(res => res.json())
    .then(data => {

      const books = data.items;// variable books is set to data.items

      if (!books || books.length === 0) {
        resultsDiv.innerHTML = "<p>No books found for that genre.</p>";
        return;
      }

      //looks like this is the equation that randomizes the book selection
      const randomBook = books[Math.floor(Math.random() * books.length)];
      //info is set to the info of the specific book that we just generated
      const info = randomBook.volumeInfo;

      //get the specified books title and set it equal to the variable 'title'
      const title = info.title || "No title";
      //get the specified author
      const authors = info.authors ? info.authors.join(", ") : "Unknown author";
      //specified description
      const description = info.description || "No description available.";
      //get the image
      const thumbnail = info.imageLinks?.thumbnail || "no preview available";



      //This is what is styling the output btw
      resultsDiv.innerHTML = `
        <div class="book" style="color:white; background-color:#5e4a3c; padding: 20px; border-radius: 10px; max-width: 600px; margin-top: 20px;">
          <h2>${title}</h2>
          <p><strong>Author(s):</strong> ${authors}</p>
          ${thumbnail ? `<img src="${thumbnail}" alt="Book cover">` : ""}
          <p>${description}</p>
        </div>
      `;
    })






// error handling
    .catch(error => {
      console.error("Error fetching book:", error);
      resultsDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
  });});