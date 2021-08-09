//Select Elements
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");
const incomeListEl = document.querySelector("#income .list");
const expenseListEl = document.querySelector("#expense .list");
const allListEl = document.querySelector("#all .list");

//Select Buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");


//Input Buttons
const expenseTitle = document.querySelector("#expense-title-input");
const expenseAmount = document.querySelector("#expense-amount-input");
const addExpense = document.querySelector(".add-expense");


const incomeTitle = document.querySelector("#income-title-input");
const incomeAmount = document.querySelector("#income-amount-input");
const addIncome = document.querySelector(".add-income");


////console.log(incomeTitle, incomeAmount, addIncome, expenseTitle, expenseAmount, addExpense, expenseBtn, incomeBtn, allBtn, balanceEl, incomeTotalEl, outcomeTotalEl, expenseEl, incomeEl, allEl, incomeListEl, expenseListEl, allListEl)
//variables
let ENTRY_LISt = [];
let balance = 0, income = 0, expense = 0;
//console.log(balance)
const DELETE = "delete", EDIT = "edit";



// EVENT LISTENERS
expenseBtn.addEventListener("click", function () {
    show(expenseEl)
    hide([incomeEl, allEl])

    active(expenseBtn)
    inactive([incomeBtn, allBtn])

})
incomeBtn.addEventListener("click", function () {
    show(incomeEl)
    hide([expenseEl, allEl])

    active(incomeBtn)
    inactive([expenseBtn, allBtn])

})
allBtn.addEventListener("click", function () {
    show(allEl)
    hide([incomeEl, expenseEl])

    active(allBtn)
    inactive([incomeBtn, expenseBtn])
})

addExpense.addEventListener("click", function () {
   // console.log("click")
    //if one or both of input empty--- return
    if (!expenseTitle.value || !expenseAmount.value) return;
    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }
    //saving this entry in array
    ENTRY_LISt.push(expense)

    //clearing inputs after entry is registered
    clearInputs([expenseAmount, expenseTitle])
    updateUI()
})
addIncome.addEventListener("click", function () {
   // console.log("click")
    if (!incomeTitle.value || !incomeAmount.value) return;
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value)
    }
    ENTRY_LISt.push(income)

    clearInputs([incomeAmount, incomeTitle])
    updateUI()
})


incomeListEl.addEventListener("click", editOrDel)
expenseListEl.addEventListener("click", editOrDel)
allListEl.addEventListener("click", editOrDel)


function editOrDel(event) {
    console.log(event)
    let todel = event.target.classList[0]
    let toDeleteParent = event.target.parentNode.parentNode
   console.log( event.target.parentNode.parentNode.id)
   
    console.log()
    if (todel == DELETE) {
        deleteEntry(toDeleteParent)
    } else if (todel == EDIT) {
        editEntry(toDeleteParent)

    }

    updateUI()

}
function deleteEntry(entry) {
    ENTRY_LISt.splice(entry, 1)
}
function editEntry(entry) {
    let ENTRY=ENTRY_LISt[entry.id]
    console.log(ENTRY)
    if(ENTRY.type=="income"){
        incomeAmount.value=ENTRY.amount
        incomeTitle.value=ENTRY.title
        deleteEntry(entry)
    }
    else if(ENTRY.type=="expense"){
        expenseAmount.value=ENTRY.amount
        expenseTitle.value=ENTRY.title
        deleteEntry(entry)
    }
    

}
//HELPERS

function show(element) {
    element.classList.remove("hide")
}

function hide(elements) {
    elements.forEach(element => {
        element.classList.add("hide")

    });
}

function active(element) {
    element.classList.add("active")
}
function inactive(elements) {
    elements.forEach(element => {

        element.classList.remove("active")
    });
}

function clearInputs(inputs) {
    inputs.forEach(input => {
        input.value = ""
    })


}
console.log(income - expense)
function updateUI() {


    
    expense = calculateTotal("expense", ENTRY_LISt)
    income = calculateTotal("income", ENTRY_LISt)
    //balance =calculateBalance(income-expense)
    balance = (income - expense)
    
    incomeTotalEl.innerHTML = `${income}`
    outcomeTotalEl.innerHTML = `${expense}`
    balanceEl.innerHTML = `${balance}`

   // console.log(typeof (expense), typeof (income), typeof (balance))
    clearElement([expenseListEl, incomeListEl, allListEl]) //bug it was printig same again and again so we used this to clear all first and then printing freshly each time

    ENTRY_LISt.forEach((entry, index) => {
        if (entry.type == "expense") {
            showEntry(expenseListEl, entry.type, index, entry.title, entry.amount)
        }
        else if (entry.type == "income") {
            showEntry(incomeListEl, entry.type, index, entry.title, entry.amount)
        }


        showEntry(allListEl, entry.type, index, entry.title, entry.amount)





    })
}


function showEntry(list, type, id, title, amount) {

    const entry = ` <li class="${type}" id="${id}">
<p class="entry">${title}:${amount}</p>
<div class="btn-wraper">
    <button class="edit">edit</button>
    <button class="delete">delete</button>
</div>
</li>`

    const position = "afterbegin"
    list.insertAdjacentHTML(position, entry)
}

function calculateTotal(type, list) {
    console.log("clicked")
    let sum = 0
    list.forEach((entry) => {
        if (entry.type == type) {
            sum += entry.amount
        }


    })
    console.log(typeof sum)
    return sum


}


function calculateBalance(income, expense) {
    console.log(income - expense)
    return income - expense;
}
function clearElement(elements) {
    console.log("working")
    elements.forEach(element => {
        element.innerHTML = ""
    })

}
console.log(income - expense)

/*windowDOM.addEventListener("reload",()=>{
    incomeTotalEl.innerHTML =0
    outcomeTotalEl.innerHTML = 0
    balanceEl.innerHTML = 0
})*/