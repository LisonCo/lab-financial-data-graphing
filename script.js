function drawChart(startDate, endDate, currency) {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`) 
        .then((response) => {
        const date = Object.keys(response.data.bpi);
        const price = Object.values(response.data.bpi);
        writeMin(price);
        writeMax(price);
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                    label: "Bitcoin Price Index",
                    data: price,
                }]
            }
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

var defaultStart = document.getElementsByClassName("date-form")[0].value
var defaultEnd = document.getElementsByClassName("date-form")[1].value
drawChart(defaultStart, defaultEnd, "EUR")

// DATE CHANGE EVENT LISTENER
document.getElementsByClassName("date-form")[0].addEventListener('input', function() {
    drawChart(document.getElementsByClassName("date-form")[0].value, document.getElementsByClassName("date-form")[1].value, document.getElementsByClassName("currency-selection")[0].value)
})

document.getElementsByClassName("date-form")[1].addEventListener('input', function() {
    drawChart(document.getElementsByClassName("date-form")[0].value, document.getElementsByClassName("date-form")[1].value, document.getElementsByClassName("currency-selection")[0].value)
})

// CURRENCY CHANGE EVENT LISTENER
document.getElementsByClassName("currency-selection")[0].addEventListener('change', function() {
    drawChart(document.getElementsByClassName("date-form")[0].value, document.getElementsByClassName("date-form")[1].value, document.getElementsByClassName("currency-selection")[0].value)
})

// MAX/MIN VALUES
function writeMin(array){
    var min  = Math.min.apply(null, array);
    document.getElementById("minValue").innerHTML = min;
}

function writeMax(array){
    var max = Math.max.apply(null, array);
    document.getElementById("maxValue").innerHTML = max;
}
    

