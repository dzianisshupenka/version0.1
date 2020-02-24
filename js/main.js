let startBtn = document.getElementById('start'),
    budget = document.getElementsByClassName('budget-value')[0],
    daybudget = document.getElementsByClassName('daybudget-value')[0],
    level = document.getElementsByClassName('level-value')[0],
    expenses = document.getElementsByClassName('expenses-value')[0],
    optionalexpenses = document.getElementsByClassName('optionalexpenses-value')[0],
    income = document.getElementsByClassName('income-value')[0],
    monthsavings = document.getElementsByClassName('monthsavings-value')[0],
    yearsavings = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');


let money, time, sum;

startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате ГГГГ-ММ-ДД", '');
    money = +prompt("Ваш бюджет на месяц,", "1000");

    while (isNaN(money) == true || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц,", "1000");
    }
    appData.myMoney = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
    
    expensesBtn.addEventListener('click', function () {
    sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let costs = expensesItem[i].value,
            costsValue = expensesItem[++i].value;
        if ((typeof (costs)) === 'string' && (typeof (costs)) != null &&
            (typeof (costsValue)) != null && costs != "" && costsValue != "" &&
            costs.length < 50) {
            appData.expenses[costs] = costsValue;
            console.log("done");
            sum += +costsValue;
        } else {
            i = i - 1;
        }
    }
    expenses.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpenses.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function () {
    if (appData.myMoney != undefined) {
        appData.daylyMoney = ((appData.myMoney - sum)/ 30).toFixed(2);
        daybudget.textContent = appData.daylyMoney;
        if (appData.daylyMoney < 100) {
            level.textContent = "Минимальный уровень достатка";
        } else if (appData.daylyMoney > 100 && appData.daylyMoney < 2000) {
            level.textContent = "Средний уровень достатка";
        } else if (appData.daylyMoney > 2000) {
            level.textContent = "Высокий уровень достатка";
        } else {
            level.textContent = " Произошла ошибка";
        }
    } else {
        daybudget.textContent = " Произошла ошибка";
    }

});

incomeItem.addEventListener('input', function () {
    let item = incomeItem.value;
    appData.income = item.split(', ');
    income.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavings.textContent = appData.monthIncome.toFixed(2);
        yearsavings.textContent = appData.yearIncome.toFixed(2);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavings.textContent = appData.monthIncome.toFixed(2);
        yearsavings.textContent = appData.yearIncome.toFixed(2);
    }
});
});



let appData = {
    myMoney: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
}