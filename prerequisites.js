prerequisites = {
    'CS 111':[],
    'CIS 101':[],
    'MATH 101':[],
    'STAT 111':[],
    'CS 111L':[],
    'BIT 221':['CIS 101'],
    'CIS 260':['CIS 101', 'CS 210'],
    'BIT 381':['CIS 260'],
    'CIS 260L':['CIS 260'],
    'CS 210':['CS 111'],
    'CS 351': ['CS 250', 'CS 142'],
    'CS 142':['MATH 101'],
    'CS 250':['CS 210'],
    'DA 201':['CIS 101'],
    'DA 202':['CS 210'],
    'DA 220':['DA 201', 'DA 202'],
    'DA 210':['DA 201','DA 202'],
    'MATH 241':['MATH 101'],
    'STAT 101':[],
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
    'DA 499':[],
    'DA 340':['DA 202'],
    'DA 350':['DA 202'],
    'DA 470':['DA 370'] 

}
adj = {}

Object.keys(prerequisites).forEach(key => {
    prerequisites[key].forEach(element =>{
        if (adj.hasOwnProperty(element)){
            adj[element].push(key)}
        else {
            adj[element] = [key]
        }
        })
    });
    var sortedArray = Object.entries(prerequisites).sort(function(a, b) {
        return a[1].length - b[1].length;
      });
    
    
    console.log(sortedArray);  
    console.log('-------')
    console.log(adj)
