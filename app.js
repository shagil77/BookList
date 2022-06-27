// Book constructor
function Book(title, author, isbn) {
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}
// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row=document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>`;

        list.appendChild(row);
}

UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');
    //Add classes
    div.className=`alert ${className}`
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    },3000);
}

UI.prototype.deleteBook=function(target) {
    if(target.className=='delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}

// Event listeners
document.getElementById('book-form').addEventListener('submit',
    function(e){
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value

        const book=new Book(title,author,isbn);

        const ui = new UI();

        // validate
        if(title == '' || author=='' || isbn=='') {
            //Error alert
            ui.showAlert('Please fill out all the fields!', 'error');
        } else {
            // Add book to list
            ui.addBookToList(book);

            ui.showAlert('Book Added!', 'success');

            ui.clearFields();
        }

        

        e.preventDefault();
    });


//Event Listener for delete
document.getElementById('book-list').addEventListener
('click', function(e){
    const ui=new UI();
    ui.deleteBook(e.target);

    ui.showAlert('Book removed!', 'success');
    e.preventDefault();
});