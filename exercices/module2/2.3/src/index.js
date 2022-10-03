
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const myForm = document.querySelector('#myForm');
const linesInput = document.getElementById('lines');
const colomnsInput = document.getElementById('colomns');
const stringInput = document.getElementById('string');
const tableWrapper = document.querySelector('#tableWrapper');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const array = createArray(linesInput.value, colomnsInput.value,stringInput.value);
    const arrayTableAsString = createTableAsString(array);
    tableWrapper.innerHTML = arrayTableAsString;


});


function createArray(lines , colomns , string){
    const array = [];
   
    for (let x = 0; x < lines; x += 1) {
        array.push([])
        for (let y = 0; y < colomns; y += 1) {
            array[x].push(`${string}[${x}][${y}]`)
            
        }
    }
    return array;
}
function createTableAsString(array){
    let elementsOfTable = '';
    array.forEach(element => {
        elementsOfTable += 
        `<tr>
        <td>${element}  </td>
        </tr>`;
    });
    
    const tableAsString = `<table class="table table-bordered text-nowrap">
        ${elementsOfTable}
    </table>`;
    return tableAsString; 
}
