const houses = [
  {
      name:'Gryffindor', 
      image: 'images/gryffindor.png'
  },

  {
      name: 'Hufflepuff',
      image: 'images/hufflepuff.png'
  },

  {
      name: 'Ravenclaw',
      image: 'images/ravenclaw.png'
  },

  {
      name: 'Slytherin',
      image: 'images/slytherin.png'
  }
];

const voldemort = [
  {
      name: 'Voldemort',
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ae55472d-dc7b-4214-8707-5079de9a5c52/dbyfnjo-53349999-9494-4b70-a74e-7d0fd51097a3.png/v1/fill/w_1024,h_1821,q_80,strp/the_past_still_follows_by_alaiaorax_dbyfnjo-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgyMSIsInBhdGgiOiJcL2ZcL2FlNTU0NzJkLWRjN2ItNDIxNC04NzA3LTUwNzlkZTlhNWM1MlwvZGJ5Zm5qby01MzM0OTk5OS05NDk0LTRiNzAtYTc0ZS03ZDBmZDUxMDk3YTMucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.WPKYbGL2Reuf-bWCOK9DFuCPHEKZMm80xR3_Ycd3ftE"
  }
];

const studentNameElem = document.getElementById('student-name');
const sortButtonElem = document.getElementById('sort-button');
const startButtonElem = document.getElementById('start-button');
const jumbotron = document.getElementById('jumbo');
const nameInput = document.getElementById('name-input');
const expelButtonElem = document.getElementById('expel');
const students = [];
const voltStudents = [];

const printToDom = (stringToPrint, divId) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = stringToPrint;
};

const buildNewStudentCard = () => {
    const studentName = studentNameElem.value;
    if (studentName === '') {
        alert("You forgot to enter your name.")
    } else {
        let randomize = Math.floor((Math.random() * houses.length));
        let house = houses[randomize].name;
        let houseImg = houses[randomize].image;
        students.push({house, houseImg, studentName});
        const sortedStudents = students.sort((a, b) => a.studentName - b.studentName);
        let domString = '';
        sortedStudents.forEach((student) => {domString += `<div class="${student.house} card d-flex row justify-content-center m-2" style="width: 12rem;">
            <img class="card-img-top" src="${student.houseImg}" alt="${student.house}">
            <div class="card-body text-center">
                <h5 class="card-name">${student.studentName}</h5>
                <h6 class="card-house">${student.house}</h6>
                <button type="button" class="expel-button btn btn-danger" id="expel">EXPEL</button>
            </div>
        </div>`});
    printToDom(domString, 'card-div');
    activateExpel();
    studentNameElem.value = '';
    }
};

const buildVoldemortCard = (studentName) => {
    let houseImage = voldemort[0].image;
    voltStudents.push({studentName});
    const sortedVoltStudents = voltStudents.sort((a, b) => a.studentName > b.studentName);
    const newString = sortedVoltStudents.map(student => `
        <div class=" voldemort card d-flex row justify-content-center m-2" style="width: 12rem;">
        <img class="card-img-top" src="${houseImage}" alt="Voldemort">
        <div class="card-body text-center">
            <h5 class="card-name">${student.studentName}</h5>
            <h6 class="card-house">Voldemort's Army</h6>
        </div>
    </div>`);
    printToDom(newString, 'voldemort-div');    
};

const activateExpel = () => {
    const expelButtons = document.getElementsByClassName('expel-button');
    for (let i = 0; i < expelButtons.length; i++) {
        const element = expelButtons[i];
        element.addEventListener('click', (e) => {
            const buttonClicked = e.target;
            let index = e.target.getAttribute('value');
            let studentName = buttonClicked.previousElementSibling.previousElementSibling.innerHTML;
            buttonClicked.parentNode.parentNode.remove();
            students.splice(index, 1);
            buildVoldemortCard(studentName);
        })
    }
};

sortButtonElem.addEventListener('click', (e) => {
    e.preventDefault();
    buildNewStudentCard();
});

startButtonElem.addEventListener('click', (e) => {
    e.preventDefault();
    jumbotron.setAttribute('style', 'display:none');
    nameInput.setAttribute('style', 'dispaly:block');
});