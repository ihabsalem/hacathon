//check objects and put var for local ones
var blocks;
var clickedBlock;
var empty;
var targetObject;
var myTable;
var nums = [];
var tableSize;
//  './animal-1.jpg'
//
/*  The initlization function attaches an event handler to the DOM objects
    and then filling the empty table with numbers.
*/
function initlization() {

    myTable = document.getElementsByTagName('table')[0];
    myTable.addEventListener('dblclick', playAction, false);
    myTable.addEventListener('dragstart', playAction, false);
    myTable.addEventListener(
        'dragenter',
        function (e) {
            e.preventDefault();
        },
        false
    );
    myTable.addEventListener(
        'dragover',
        function (e) {
            e.preventDefault();
        },
        false
    );
    myTable.addEventListener('drop', dropped, false);
    shuffle(); //need to shuffle initially
}

/*  Shuffle function is responsible of shuffling the table.
    Each time the shuffle function is called we need to get the cell objects
    because the table size might have changed.
    and to get the number of cells
*/
function shuffle() {
    var yPosition = 0,
        rowNumber = 0;
    blocks = document.getElementsByTagName('td');
    const rows = document.getElementsByTagName('tr');
    tableSize = blocks.length;
    shuffledArray(0, tableSize); //because we want to shuffle the whole table
    for (var i = 0; i < tableSize; i++) {
        // if(nums[i]==0){
        //     empty=blocks[i];
        //     empty.innerHTML='<span class="puzzle-peice" draggable="true"> X </span>';
        // }
        // else{
        //     blocks[i].innerHTML='<span class="puzzle-peice" draggable="true">'+ nums[i] +'</span>';
        // }
        blocks[i].innerHTML =
            '<span id=' + i + ' class="puzzle-peice" draggable="true"> </span>';

        if (i !== 0 && i % (blocks.length / rows.length) === 0) {
            yPosition = ++rowNumber * 150;
        }
        blocks[i].children[0].style =
            'background-image: url(' +
            window.puzzleImage +
            ');background-position:' +
            (-i % (blocks.length / rows.length)) * 150 +
            'px ' +
            -1 * yPosition +
            'px';
    }
    shuffleMyCells();
}

function shuffleMyCells() {
    for (var i = 0; i < tableSize; i++) {
        const blockA = blocks[Math.floor(Math.random() * blocks.length)];
        const blockB = blocks[Math.floor(Math.random() * blocks.length)];
        let tmpBlockHTML = blockA.innerHTML;
        blockA.innerHTML = blockB.innerHTML;
        blockB.innerHTML = tmpBlockHTML;
    }
}

function addColumn() {
    // Getting current table size by multiplying the number of rows by the number of columns
    tableSize = myTable.rows.length * myTable.rows[0].cells.length;
    // Getting new table size by adding the number of rows
    newTableSize = tableSize + myTable.rows.length;
    shuffledArray(tableSize, newTableSize);
    index = Math.floor(Math.random() * myTable.rows[0].cells.length + 1);
    var myCell;
    for (var i = 0; i < myTable.rows.length; i++) {
        myCell = myTable.rows[i].insertCell(index);
        myCell.innerHTML = '<span draggable="true">' + nums[i] + '</span>';
    }
    debugger;
    shuffle();
}
function addRow() {
    tableSize = myTable.rows.length * myTable.rows[0].cells.length;
    newTableSize = tableSize + myTable.rows[0].cells.length;
    shuffledArray(tableSize, newTableSize);
    index = Math.floor(Math.random() * myTable.rows.length + 1);
    var row = myTable.insertRow(index);
    var myCell;
    for (var i = 0; i < myTable.rows[0].cells.length; i++) {
        myCell = row.insertCell(i);
        myCell.innerHTML = '<span draggable="true">' + nums[i] + '</span>';
    }
    shuffle();
}

function deleteColumn() {
    var allRows = myTable.rows;
    if (allRows[0].cells.length > 2) {
        for (var i = 0; i < allRows.length; i++) {
            allRows[i].deleteCell(-1);
        }
        shuffle();
    }
}

function deleteRow() {
    if (myTable.rows.length > 2) {
        myTable.deleteRow(0);
        shuffle();
    }
}

function shuffledArray(from, to) {
    for (i = from; i < to; i++) {
        nums[i - from] = i;
    }
    for (var i = to - from; i; i--) {
        j = Math.floor(Math.random() * i);

        [nums[i - 1], nums[j]] = [nums[j], nums[i - 1]];
    }
}

function playAction(e) {
    if (e.target !== e.currentTarget) {
        clickedBlock = e.target;
        if (clickedBlock.tagName != 'TD') {
            //if first its not a td objects
            clickedBlock = clickedBlock.parentElement; //to get the td object
            if (clickedBlock.tagName != 'TD') {
                clickedBlock = clickedBlock.parentElement;
            }
        }
        if (e.type == 'dblclick') {
            move(clickedBlock);
        }
    }
    e.stopPropagation();
}

function dropped(e) {
    e.preventDefault();
    var srcElHTML = e.srcElement.parentElement.innerHTML;
    e.srcElement.parentElement.innerHTML = clickedBlock.innerHTML;
    clickedBlock.innerHTML = srcElHTML;
    congratsISolved();
    // move();
}

function congratsISolved() {
    for (var i = 0; i < tableSize; i++) {
        if (blocks[i].children[0].id != i) {
            break;
        }
        if (i == tableSize - 1) {
            setTimeout(() => {
                alert('Congratssss!!!');
            }, 2000);
        }
    }
}

function move() {
    // if (isAdjacent() && empty!=undefined && clickedBlock!=undefined){
    debugger;
    empty.innerHTML = clickedBlock.innerHTML;
    // clickedBlock.firstChild.innerHTML="X";
    empty = clickedBlock; // empty is now the place of previous the moved block
    // }
}
/*  isAdjacent function finds ut if the clicked/dragged element is adjacent 
    to the empty block.
    if you don't want to use a built-in functions
    the x,y position can also be found using math as following:
        x= floor( (it's td number) % (the number of columns))
        y= (it's td number) % (the number of columns)
    */
function isAdjacent() {
    var x = clickedBlock.cellIndex;
    var y = clickedBlock.parentElement.rowIndex;
    var targetX = empty.cellIndex;
    var targetY = empty.parentElement.rowIndex;
    if (x - 1 == targetX && y == targetY) return true;
    else if (x + 1 == targetX && y == targetY) return true;
    else if (x == targetX && y - 1 == targetY) return true;
    else if (x == targetX && y + 1 == targetY) return true;
    else return false;
}
