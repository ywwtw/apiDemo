const url = "https://epcs.water.gov.tw/OpenData/v1/api/values",
    filterInput = document.getElementById("filter");
let stationData=[];
window.onload = function() {
    axios
        .get(url)
        .then((waterData)=>{
            console.log("請求成功", waterData);
            stationData=waterData.data;
            displayStationData(stationData);
        })
        .catch(err => {
            console.log("發生錯誤", err)
            alert("網路狀況不佳，請重新嘗試。")
        })   
}

function displayStationData(stationData){    
    stationData.forEach((value,index) => {
        reportTable.innerHTML+=
            `<tr style="color:#1c74bb">
                <td class="station" style="border-color: #1c74bb;">${value.station_name}</td>
                <td style="display:flex;border-color: #1c74bb;">
                    <div class="pH" style="width:50px;tex-align:center;border: none">${value.pH_value}</div>
                    <div style="width:20px; display:flex; align-items:center; border: none"><div class="pHcolor" style="width:18px;height:18px;border-radius:50px;border: none"></div</div>
                </td>
                <td style="border-color: #1c74bb;">${value.turbidity}</td>
                <td style="border-color: #1c74bb;">${value.residual_chlorine}</td>
            </tr>`        
        ;
        const pHcolor = document.querySelectorAll(".pHcolor"),
            station =document.querySelectorAll(".station");
        if(value.pH_value < 7){
            pHcolor[index].style.backgroundColor= "#a3cd39";
        }else if(value.pH_value > 7 && value.pH_value < 8){
            pHcolor[index].style.backgroundColor= "#4db847";
        }else{
            pHcolor[index].style.backgroundColor="#019247";
        } 
        const firstdata = document.querySelector("tr td:nth-child(2)");
        firstdata.style.borderTop="none";
    })
}

filterInput.addEventListener('change', (e)=> {
    const searchStr = e.target.value;
    console.log(searchStr);
    const filteredStation =stationData.filter((data)=>{return(data.station_name.includes(`${searchStr}`))}); 
    console.log(filteredStation);
    reportTable.innerHTML="";
    displayStationData(filteredStation);
})
