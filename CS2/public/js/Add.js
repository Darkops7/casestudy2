function addBooks(){
    var title= document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var genre = document.getElementById('genre').value;
    var desc = document.getElementById('desc').value;
    book={title:title,author:author,enre:genre}
    return true
}