
let pins = JSON.parse(localStorage.getItem('rechargeCards')) || []
let bal = Number(localStorage.getItem('rechargeBalance')) || 0


balance.innerHTML = bal



function generate() {
    let pin = ''


    for (let index = 0; index < 15; index++) {
        let randomNum = Math.floor(Math.random() * 10)
        pin += randomNum
    }



    if (airtime.value === '' || amount.value === '') {
        alert('all fields are mandatory')
    }

    else {
        let cardObject = {
            provider: airtime.value,
            amount: amount.value,
            used: false,
            rechargePin: pin,
            timeCreated: new Date()
        }

        thePin.innerHTML = pin
        pins.push(cardObject)
        localStorage.setItem('rechargeCards', JSON.stringify(pins))
        displayTable()
        console.log(pins);

    }
}


function displayTable() {
    tbody.innerHTML = ''
    pins.map((obj, index) => {
    tbody.innerHTML += `<tr>
        <td>${index + 1} </td>
        <td>${obj.provider} </td>
        <td>${obj.amount} </td>
        <td>${obj.used} </td>
        <td>${obj.timeCreated} </td>
        <td> ${obj.rechargePin}</td>
    </tr>`
    })
}


displayTable()


function loadAirtime() {
    let cardRecharge = recharger.value
    let pinUsed = cardRecharge.slice(5, 20)

    let cardToBeRecharged = pins.find((obj) => obj.rechargePin === pinUsed)

    console.log(cardToBeRecharged);

    if (!cardToBeRecharged) {
        alert('this card does not exist')
    }

    else if (cardToBeRecharged.used === true) {
        alert('this card has been used')
    }
    
    else if (cardRecharge.startsWith('*311*') && cardRecharge.endsWith('#') && cardToBeRecharged) {
        alert(`you just recharged ${cardToBeRecharged.provider} ${cardToBeRecharged.amount}`)
        addUpBalance(cardToBeRecharged.amount)
        cardToBeRecharged.used = true
        localStorage.setItem('rechargeCards', JSON.stringify(pins))
        displayTable()
    }

    else {
        alert('invalid pin')
    }





}

function addUpBalance(value) {
    bal += Number(value)
    localStorage.setItem('rechargeBalance', Number(bal))
    balance.innerHTML = bal
}