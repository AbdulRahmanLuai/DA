/*
ABDUL RAHMAN ABU NABHAN

TODO:

      - add feature to show subject syllabus
      - add hours done counter
      - organize buttons in a better way


      27/NOV/2023
      

*/



let subjectObjects = []
        function Initialize(){
            SubjectNames = {
                'CIS 101': "Introduction to information systems",
                'CS 111': "Python",
                'MATH 101': "Calculus1",
                'STAT 111':"Principles of probability (1)",
                'CS 210':"Object Oriented Programming",
                'CS 250':"Data-Structures",
                'CS 142':"Discrete Math",
                'CS 111L':"Python Lab",
                'STAT 101':"Principles of Statistics (1)",
                'CIS 260':"Database systems",
                'CS 351': "Analysis and Design of Algorithms",
                'BIT 221':"Legal Aspects of Information Technology	",
                'BIT 381':"Internet Application Development (WEB)",
                'CIS 260L':"Database Lab",
                'DA 201':"Data science Basics",
                'DA 202':"Artificial Intelligence Basics",
                'DA 220':"Data Science and Artificial Intelligence Programming",
                'DA 210':"Computing Systems For Data science and Artificial Ontelligence",
                'MATH 241': "Linear Algebra (1)",
                'CIS 464':"Information Retrieval Systems",
                'CIS 240':"Introduction to Software Engineering",
                'CYS 230': "Cyber Security Principles",
                'DA 360':"Pattern Recognition",
                'DA 370':"Data Mining and Warehouses",
                'DA 380':"Data Modeling and Simulation",
                'DA 450':"Deep Learning",
                'DA 460':"Big Data",
                'DA 330':"Data Engineering and Analytics",
                'DA 480':"Intelligent Mobile Robots",
                'DA 340':"Knowledge Representation and Reasoning",
                'DA 350':"Machine Learning and Neural Networks",
                'DA 470':"Natural Language Processing and Text Mining",
                'DA 499':"Graduation Project"
            }

            prerequisites = {
                'CIS 101':[],
                'CS 111':[],
                'MATH 101':[],
                'STAT 111':[],
                'CS 210':['CS 111'],
                'CS 250':['CS 210'],
                'CS 142':['MATH 101'],
                'CS 111L':[],
                'STAT 101':[],
                'CIS 260':['CIS 101', 'CS 210'],
                'CS 351': ['CS 250', 'CS 142'],
                'BIT 221':['CIS 101'],
                'BIT 381':['CIS 260'],
                'CIS 260L':['CIS 260'],
                'DA 201':['CIS 101'],
                'DA 202':['CS 210'],
                'DA 220':['DA 201', 'DA 202'],
                'DA 210':['DA 201','DA 202'],
                'MATH 241':['MATH 101'],
                'CIS 464':['CIS 260'],
                'CIS 240':['CIS 101', 'CS 210'],
                'CYS 230':['CS 111', 'CIS 101'],
                'DA 360':['DA 350'],
                'DA 370':['DA 350'],
                'DA 380':['STAT 111', 'CIS 260'],
                'DA 450':['DA 350'],
                'DA 460':['DA 330'],
                'DA 330':['DA 201', 'CIS 260'],
                'DA 480':['DA 350'],
                'DA 340':['DA 202'],
                'DA 350':['DA 202'],
                'DA 470':['DA 370'],
                'DA 499':[],
            
            }
            
            cnt = 0
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
        
            

            
            
            class Subjects{

                constructor(buttonElement, id){
                    this.button = buttonElement;
                    this.indegree = 0;
                    this.initial_indegree = 0
                    this.is_taken = false;
                    this.id = id
                    this.neighbors = []
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
                            let initial_color = 'yellow';
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
                    this.change_color('white');
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


                        
                        /*
                        if indegree > 0: do nothing or send message 'you cant take this subject yet'
                        else:
                        if taken: to topological sort of all neighbors and after cascade , all decendents should become grey (indegree>0)
                        if not taken: all neighbors should now degrees indegree by 1 and if it reaches 0 become yellow
                                      it becomes taken
                        */
                    })
                }
            //what is remaining is to feed in the adj list, and the queue of 
            //subjects that have indegree == 0
            //after that somehow find the indegrees of all subjects accordingly
            //join the javascript whith the colors
            //maybe feed in each subject and its prerequisites, this way you can
            //automatically find the indegree of each subject and build the adjlist of it.
            }
    
            
            
            
            const key_object = {
            

            }

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

            
                resetButton = document.createElement('button')
                resetButton.id = 'resetButton'
                resetButton.textContent = 'Reset All'
                parentElement.appendChild(resetButton)
                resetButton.addEventListener('click', ()=>{
                    console.log('resetting <><><><>')
                    subjectObjects.forEach(element => {
                        element.reset()
                    })
                
                })
            };
        
            
        

        
    