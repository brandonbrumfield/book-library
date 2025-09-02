const myLibrary = []; 

const container = document.querySelector("#main");
const add_book = document.querySelector('#add_book');
const dialog = document.querySelector('#book_dialog');
const form = document.querySelector('#book_form');


class Book {
    #title;
    #author;
    #pages;
    #read;

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages; 
        this.read = read;
    }

    giveInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }

    changeRead() {
        if (this.read == 'Read') {
            this.read = 'Not Read'
        }

        else if (this.read == 'Not Read') {
            this.read = 'Read'
        }
    }


   static addBookToLibrary(title, author, pages, read) {
        
        const book = new Book(title, author, pages, read);
        book.id = crypto.randomUUID();
        myLibrary.push(book); 
        Book.displayBooks(book.title, book.author, book.pages, book.read, book.id);


    }


    static displayBooks(title,author,pages,read,id) {
        
        const book_div = document.createElement('div');
        book_div.classList.add('book_div');

        const span_one = document.createElement('span');
        span_one.classList.add('book_span');
        const span_two = document.createElement('span');
        span_two.classList.add('book_span');
        const span_three = document.createElement('span');
        span_three.classList.add('book_span');
        const span_four = document.createElement('span');
        span_four.classList.add('book_span', "read");

        span_one.textContent = "Title: " + title;
        span_two.textContent = "Author: " + author;
        span_three.textContent = "Num. of Pages: " + pages;
        span_four.textContent = "Status: " + read;

        const remove_button = document.createElement('div');
        const read_button = document.createElement('div');
        read_button.classList.add('remove_button');
        read_button.textContent = "Change Read Status";
        remove_button.classList.add('remove_button');
        remove_button.textContent = "Remove";

        remove_button.addEventListener("click", (e) => {
            let book_div_remove = e.target.parentElement;


            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == book_div_remove.id) {
                        myLibrary.splice(myLibrary[i], 1);
                    }

                }

            container.removeChild(book_div_remove); 
        })

        read_button.addEventListener("click", (e) => {
            let book_div_read = e.target.parentElement;


            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == book_div_read.id) {
                        myLibrary[i].changeRead()
                    }

                }

            if (book_div_read.querySelector(".read").textContent == "Status: Read") {
                book_div_read.querySelector(".read").textContent = "Status: Not Read"
            }

            else if (book_div_read.querySelector(".read").textContent == "Status: Not Read") {
                book_div_read.querySelector(".read").textContent = "Status: Read"
            }
        })


        book_div.appendChild(span_one);
        book_div.appendChild(span_two);
        book_div.appendChild(span_three);
        book_div.appendChild(span_four);
        book_div.appendChild(read_button);
        book_div.appendChild(remove_button);

        book_div.id = id; 


        container.appendChild(book_div); 






    }



    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get author() {
        return this.#author;
    }

    set author(value) {
        this.#author = value;
    }

    get pages() {
        return this.#pages;
    }

    set pages(value) {
        this.#pages = value;
    }

    get read() {
        return this.#read;
    }

    set read(value) {
        this.#read = value;
    }
}



add_book.addEventListener("click", () => {
    dialog.showModal();
})

book_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const form_data = new FormData(form);

    const title = form_data.get('title');
    const author = form_data.get('author');
    const pages = form_data.get('pages');
    const read = form_data.get('read');

    Book.addBookToLibrary(title, author, pages, read);
    
    

    dialog.close();
})





Book.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, "Read"); 
Book.addBookToLibrary('The Road', 'Cormac McCarthy', 287, "Read");
Book.addBookToLibrary('Dracula', 'Bram Stoker', 560, "Read");







