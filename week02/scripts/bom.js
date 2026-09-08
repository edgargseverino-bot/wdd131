// select elements from the DOM
    const inputDOM = document.querySelector('#favchap');
    const buttonDOM = document.querySelector('button');
    const listDOM = document.querySelector('#list');
    // create list item and give it the value of the input
    const li = document.createElement('li');
 
   


	// wait for button clicks
    buttonDOM.addEventListener('click', ()=>{
        // Check if the user entered something
        if(input.value.trim() != ''){
            li.textContent = inputDOM.value;
            // create a button and add a click event listener
            const deleteButton = document.creatElement('#close-button');
            deleteButton.textContent = '❌';
            
            
       
            deleteButton.addEventListener('click', ()=>{
                input.focus();
                listDOM.remove(li);});

                
            // add the button to the list item
            li.appendChild(deleteButton);
            // OUTPUT: finally display the completed list item to the unordered list
            listDOM.appendChild(li);
            // clear the user input field
            input.value= " "; 
        };
        // focus the user back to the input field
        input.focus();


    })