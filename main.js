    window.addEventListener('DOMContentLoaded', () => {


        // penyimpanan data books
        let books                       = [];

        // inisialisasi nama key local Storage
        const local_storage             = 'books'
        const incompletebook_container  = document.getElementById('incompleteBookshelfList');
        const complete_ReadBook         = document.getElementById('completeBookshelfList');

        if(checkStorage()){

            if(localStorage.getItem(local_storage) === null){
                localStorage.setItem(local_storage, '' )
            }
        }

        // pengecekan storage
        function checkStorage() {
            
            return typeof(Storage) !== 'undefined'
        }

        // add books
        function addBook(){
            
            const id_book       = generateId();
            const book_title    = document.getElementById('inputBookTitle').value;
            const book_author   = document.getElementById('inputBookAuthor').value;
            const book_year     = document.getElementById('inputBookYear').value;
            const checked       = document.getElementById('inputBookIsComplete').checked; 
            const data_object   = generateToObject(id_book , book_title , book_author ,book_year , checked);
            books.push(data_object); 
            
            
            return books
        }

        // make empty fields
        function emptyField() {
            
            document.getElementById('inputBookTitle').value   = '';
            document.getElementById('inputBookAuthor').value  = '';
            document.getElementById('inputBookYear').value    = '';

            
        }

        // check books
        function readBookORnotYet(data){

            if(data.isComplete == true){

                const article                   = document.createElement('article');
                const book_title                = document.createElement('h3');
                const author                    = document.createElement('p');
                const years                     = document.createElement('p')
                const div_action                = document.createElement('div');
                const button_unread             = document.createElement('button');
                const button_delete             = document.createElement('button');
                
                article.classList.add('book_item');
                book_title.innerText        = data.title;
                author.innerText            = data.author;
                years.innerText             = data.years;
                button_unread.innerText     = 'Belum Selesai dibaca'
                button_delete.innerText     = 'Hapus Buku'
                button_unread.classList.add('button-change');
                button_delete.classList.add('button-delete');
                div_action.classList.add('action');
                article.setAttribute('id', `books-${data.id}`)
                div_action.append(button_unread,button_delete);
                article.append(book_title,author,years,div_action);
                
                button_unread.addEventListener('click', ()=> {
                    changeRack(data.id , false);
                    removeListNode();
                    render();
                    saveData()
                })
                button_delete.addEventListener('click', ()=> {
                    const dialog = confirm('want to delete book' + ' ' + data.title + '?')
                    if(dialog === true){

                        deleteBooks(data.id)
                    }
                })


            return article

            }
            else{
                
                const article                   = document.createElement('article');
                const book_title                = document.createElement('h3');
                const author                    = document.createElement('p');
                const years                     = document.createElement('p')
                const div_action                = document.createElement('div');
                const button_read               = document.createElement('button');
                const button_delete             = document.createElement('button');
                
                article.classList.add('book_item');
                book_title.innerText    = data.title;
                author.innerText        = data.author;
                years.innerText         = data.years;
                button_read.innerText   = 'Selesai dibaca'
                button_delete.innerText = 'Hapus Buku'
                div_action.classList.add('action');
                button_read.classList.add('button-change');
                button_delete.classList.add('button-delete');

                article.setAttribute('id', `books-${data.id}`)
                div_action.append(button_read,button_delete);
                article.append(book_title,author,years,div_action);


                button_read.addEventListener('click', ()=> {
                    changeRack(data.id , true);
                    removeListNode();
                    render();
                    saveData()
                })
                
                    
                    
                    button_delete.addEventListener('click', () => {
                        const dialog = confirm('want to delete book' + ' ' + data.title + '?')
                        if(dialog === true){

                            deleteBooks(data.id)
                        }
                    })
                
        
            return article
        
        }
    }

        // Delete Books
        function deleteBooks(id){
            books = books.filter( (data) => data.id !== id);
            removeListNode();
            render()
            saveData()
        
        }

        // Change Rack
        function changeRack(dataId, checked){
            
            books.forEach( (data) => {
                
                if(data.id === dataId){
                    data.isComplete = checked;
                    console.log(data);
                    return data;
                }
            })
            return null
        }

        //generate ID 
        function generateId() {
            return + new Date
        }

        // Generate object
        function generateToObject( id , title , author , years , isComplete ) {

            return {
                id,
                title,
                author,
                years,
                isComplete
            }
        }

        // Remove List Node
        function removeListNode(){

            if(complete_ReadBook?.hasChildNodes()){
                while(complete_ReadBook.hasChildNodes()){
                    complete_ReadBook.removeChild(complete_ReadBook?.firstChild)
                }
            }
            if (incompletebook_container?.hasChildNodes()){
                while (incompletebook_container.hasChildNodes()){
                    incompletebook_container?.removeChild(incompletebook_container.firstChild)
                }
            }
            
        }

        // Save Data
        function saveData(){
            localStorage.setItem(local_storage , JSON.stringify(books));
            getData();
        }

        // GET Data
        function getData(){
            books = JSON.parse(localStorage.getItem(local_storage));
        }

        // Render Books
        function render(){
            books.forEach( (datas) => {
                
                if (datas.isComplete == true) {
                    complete_ReadBook?.append( readBookORnotYet(datas))
                } 
                else {
                    incompletebook_container?.append(readBookORnotYet(datas))
                }
            });
        }

        
        // SUbmit Books
        document.getElementById('inputBook')?.addEventListener('submit' , (e) => {
            removeListNode();
            addBook();
            render();
            saveData();
            e.preventDefault();
            emptyField();

        })

        getData();
        render();
    })
