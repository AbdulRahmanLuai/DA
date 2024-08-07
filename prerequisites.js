/*
ABDUL RAHMAN ABU NABHAN
*/

let SubjectNames;
let prerequisites;

async function fetchJson(jsonName) {
    try {
        const response = await fetch(jsonName);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
}

// Function to fetch and log data
async function fetchData() {
    try {
        SubjectNames = await fetchJson('SubjectNamesJson.json');
        prerequisites = await fetchJson('prerequisitesJson.json');
        console.log('SubjectNames:', SubjectNames);
        console.log('Prerequisites:', prerequisites);
        return [SubjectNames, prerequisites];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function buildButtons(){
    let cnt = 0;
    const parentElement = document.getElementById('mainDiv');
    Object.keys(prerequisites).forEach(key => {
        const childElement = document.createElement('button');
        childElement.id = key;
        childElement.textContent = key;
        
    
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = SubjectNames[key];
    
        childElement.appendChild(tooltip);
        childElement.classList.add('hover-button'); // Add the hover-button class
    
        parentElement.appendChild(childElement);
        cnt++;
        });
}

function buildClass(){

    class Subjects{

        constructor(buttonElement, id){
            this.button = buttonElement;
            this.indegree = 0;
            this.initial_indegree = 0
            this.is_taken = false;
            this.id = id;
            this.neighbors = [];
            this.addClickListener();
            this.timeoutId = null;
            
        }
        change_color(color){
            clearTimeout(this.timeoutId);
            this.button.style.backgroundColor = color;
        }
        
        reset() {
            this.indegree = this.initial_indegree
            this.is_taken = false
            if (this.initial_indegree != 0)
                this.change_color('');
            else {this.change_color('yellow')

            }

        }
        
        get_id(){
            return this.id;
        }
        add_neighbor(nei) {
            this.neighbors.push(nei)
        }
        set_indegree(x){
            this.indegree = x
            this.initial_indegree = x
            if (this.indegree == 0) {
                this.change_color('yellow');
            }
        }
        increase_indegree(){

            if (this.is_taken){
                this.neighbors.forEach(neighbor =>
                neighbor.increase_indegree());
            }
            this.is_taken = false
            this.indegree ++
            this.change_color('');
            
        }
        decrease_indegree(){
            this.indegree -= 1
            if (this.indegree == 0){
                this.change_color('yellow');
            }
        }

        is_taken_click(){

            this.is_taken = false
            this.change_color('yellow');
            this.neighbors.forEach(neighbor =>
            neighbor.increase_indegree());
        }
        is_not_taken_click(){
            this.is_taken = true
            this.change_color('#4CBB17')
            this.neighbors.forEach(neighbor =>
            neighbor.decrease_indegree());
        }

        warn_to_take(){

            if (!this.is_taken){                        
                this.change_color('red');
                this.timeoutId = setTimeout(()=> {
                    let initial_color = '#ffef00';
                    var available = ((this.indegree) == 0)
                    if (!available){
                        initial_color = ''
                    }
                    this.change_color(initial_color)
                    }, 250); 
            }
        }
        show_prereqs(){

            prerequisites[this.id].forEach(element => {

                let preObj = key_object[element];
                preObj.warn_to_take();

            })

        }
        show_children(){
            if (this.is_taken || this.indegree!=0){
                return;
            }

            this.neighbors.forEach(nei =>{
                nei.glow();
            })

        }
        end_children_show(){
            if (this.is_taken || this.indegree!=0){
                return;
            }
            this.neighbors.forEach(nei =>{
                nei.deglow();
            })
        }

        glow(){
            this.change_color('#6a6a00');
        }
        deglow(){
            this.change_color('');
        }
        

        addClickListener(){

            this.button.addEventListener('mouseover', () => {

                this.show_children();
                });

            this.button.addEventListener('mouseout', () => {
                this.end_children_show();
            });



            this.button.addEventListener('click', ()=>{
                var available = ((this.indegree) == 0)
                if (!available) {
                    // show prereqs in red
                    this.show_prereqs()
                    
                }
                else if (this.is_taken) {
                    this.show_children();
                    this.is_taken_click()}
                else {
                    this.end_children_show();
                    this.is_not_taken_click()}
            })
        }
    
    }
    return Subjects;
};


let  key_object = { // key: the class object it references
    

}
let subjectObjects = [];


function buildGraph(){
    

    Object.keys(prerequisites).forEach(key => {
        const buttonElement = document.getElementById(key)
        const Subject = new Subjects(buttonElement, key)
        key_object[key] = Subject
        Subject.set_indegree(prerequisites[key].length)
        subjectObjects.push(Subject)

    })

    Object.keys(prerequisites).forEach(key => {

        prerequisites[key].forEach(element => {
            key_object[element].add_neighbor(key_object[key])})
    })

}

function createControlButtons(){

    const parentElement = document.getElementById('mainDiv');
    let resetButton = document.createElement('button');
    resetButton.id = 'resetButton'
    resetButton.textContent = 'Reset All'
    parentElement.appendChild(resetButton)
    resetButton.addEventListener('click', ()=>{
        subjectObjects.forEach(element => {
            element.reset()
        })
    })

    let saveButton = document.createElement('button');
    saveButton.textContent = "SAVE";
    saveButton.id = "saveButton";
    parentElement.appendChild(saveButton);
    saveButton.addEventListener('click',  ()=> {
        Object.keys(SubjectNames).forEach(Name => {

            let pointer = key_object[Name];
            if (pointer.is_taken){
                localStorage.setItem(Name, 1);
            }
            else{
                localStorage.setItem(Name, 0);
            }
        })

        alert("Taken Subjects has been saved!")
     })

    
}

function turnThisButtonOn(buttonObject){

    let id = buttonObject.id;
    if (buttonObject.is_taken) return;

    prerequisites[id].forEach((preName, indx) =>{

        turnThisButtonOn(key_object[preName]);
    }
    )

    buttonObject.is_not_taken_click();

}

function turnOnOnButtons(){

    Object.keys(SubjectNames).forEach(Name => {

        let state = JSON.parse(localStorage.getItem(Name));
        let thisPointer = key_object[Name];
        if (state != 1){
            localStorage.setItem(Name, 0);
        }
        else {
            turnThisButtonOn(thisPointer);
        }
    })

}



function mainFunction(){

    

    
    Subjects = new buildClass();
    buildButtons();
    buildGraph();
    createControlButtons();
    turnOnOnButtons(); // get state from local storage.
    
};
        
            
        

function Initialize(){

    fetchData().then(() => {

        mainFunction();

    })
}


        

        
    