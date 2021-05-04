let result = document.getElementById("whaletable");
let totalId = document.getElementById("whaletotal");
let ctx = document.getElementById('myChart').getContext('2d');
let leprix = 0;
let total = [];
let sommeAmount = [];
let sommeAmountDollar = [];
let blockchainName = [];

//call to CoinGecko API for BTC price
async function priceId() {
    const resid = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin");
    const aff = await resid.json();
    return aff;
}
priceId().then(aff => {
//call to whale-alert for 100 last whale transaxions (amuont > 500K$)
    async function baleineRequest() {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.whale-alert.io/v1/transactions?api_key=vpICDYabrMM5LCbKMnCrbyGmTRBZo2F5&min_value=500000");
        const bal = await response.json();
        return bal;
    }

    baleineRequest().then(bal => {
        console.log(bal.transactions);
        for (let i in bal.transactions) {
            if(bal.transactions[i]['symbol'] == 'btc'){
                let latr = document.createElement('tr');
                latr.className = "table table-condensed active";
                result.appendChild(latr);
                let latd2 = document.createElement("td");
                latr.appendChild(latd2);
                latd2.innerHTML = `<a href="https://www.blockchain.com/btc/tx/${bal.transactions[i]['hash']}" target="_blank"> link </a>`;

                let latd3 = document.createElement("td");
                latr.appendChild(latd3);
                let transacDols = bal.transactions[i]['amount_usd'];
                latd3.textContent = transacDols.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

                let montantBtc = bal.transactions[i]['amount'];
                let montantdols = bal.transactions[i]['amount_usd'];
                let diff = Math.round(montantdols/montantBtc* 100) / 100;
                let latd5 = document.createElement("td");
                latr.appendChild(latd5);
                latd5.textContent = diff;


                let circsupply = 18673975; // supply march 2021 
                let pourcentSupply = (100*montantBtc)/circsupply;
                let latd6 = document.createElement("td");
                latr.appendChild(latd6);
                latd6.textContent = pourcentSupply;

                leprix = aff[0]["current_price"];
                let affleprix =  Math.round((((leprix - diff)/diff)*100)*1000)/1000;
                let prixfinal = affleprix.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                let latd4 = document.createElement("td");
                latr.appendChild(latd4);
                latd4.textContent = prixfinal;

                //console.log(Math.sign(affleprix));

                if(Math.sign(affleprix) == 1){
                    latd4.className = "green";
                } else {
                    latd4.className = "red";
                }
                //for total
                total.push(i);
                sommeAmount.push(montantBtc);
                sommeAmountDollar.push(montantdols);
                
                
            }
            //pour faire le compte des différents blockchains
            //blockchainName.push(bal.transactions[i]['blockchain']);
            //console.log(blockchainName);            
        }
        let allTotal = total.length;
        //console.log(allTotal);
        let latrtot = document.createElement('tr');
        totalId.appendChild(latrtot);

        let latdtot = document.createElement("td");
        latrtot.appendChild(latdtot);
        latdtot.innerHTML = `<h2>${allTotal}</h2>`;

        let totalSA = Math.round(sommeAmount.reduce((a, b)=> a + b,0)); // SUM of array elements
        let latdtot2 = document.createElement("td");
        latrtot.appendChild(latdtot2);
        latdtot2.innerHTML = `<h2>${totalSA}</h2>`;

        let totalDols = Math.round(sommeAmountDollar.reduce((a, b)=> a + b,0)); 
        let latdtot3 = document.createElement("td");
        latrtot.appendChild(latdtot3);
        latdtot3.innerHTML = `<h2>${totalDols.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>`;


        if(allTotal==0){
            let latr = document.createElement('tr');
            latr.className = "table table-condensed active";
            result.appendChild(latr);
            let latd = document.createElement("td");
            latr.appendChild(latd);
            latd.textContent = "No BTC transaction in hte last 100";

        }

        //data for chart
        
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sommeAmount,
                datasets: [{
                    label: 'Graph to visualize each TX in BTC/$',
                    data: sommeAmountDollar,
                    backgroundColor: [
                        'rgb(0, 85, 155)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });





     }).catch(error => {
    
            console.log(`Appel API WA : ${error} `)
          });  
        
})
.catch(error => {
    
    console.log(`Appel API Coingecko est en erreur : ${error} `)
  });  

