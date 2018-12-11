let calendar = document.getElementById("calendar")
let svgNS = 'http://www.w3.org/2000/svg';
let svg = document.createElementNS(svgNS, 'svg')

let date = new Date()
let currentDay = date.getTime()
let lastYearDay = date.getFullYear() % 4 == 3 ? currentDay - 31536e6 - 864e5 : currentDay - 31536e6
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const widthRect = 10
const heightRect = 10
const spacing = 4
let x = 50
let y = 30
let countRect = 0
let currentMonth = date.getMonth()
let numberOfDays = 0
let g = document.createElementNS(svgNS, "g")
let skip = 1

for(let i = (lastYearDay / 1000); i <= currentDay / 1000; i += (864e5 / 1000)){
    date.setTime(i * 1000)
    const rect = createRect(x, y, widthRect, heightRect, "square")
    rect.setAttribute("data-value", date.getDate() + "/" + (date.getMonth() + 1)  + "/" + date.getFullYear() + " " + date.getDay())
    rect.addEventListener("mouseover", showOutput)
    rect.addEventListener("mouseout", removeOutput)
    if(countRect == 0 && (currentMonth % 12) == date.getMonth()){
        const month = createText(x, 20, months[currentMonth % 12])
        svg.appendChild(month)
        currentMonth++
    }

    if(numberOfDays < 4 && skip == 1){
        const day = createText(12, y + 9, days[date.getDay() % 7])
        svg.appendChild(day)
        numberOfDays++
        skip = 0
    }else if(skip == 0 && numberOfDays < 4){
        skip++
    }

    countRect++
    g.appendChild(rect)
    y += heightRect + spacing
    
    if(countRect % 7 == 0){
        svg.appendChild(g)
        x += widthRect + spacing
        y = 30
        countRect = 0
        g = document.createElementNS(svgNS, "g")
    }
}

if(countRect % 7 !== 0) svg.appendChild(g)

g = document.createElementNS(svgNS, "g")

let rect = createRect(650, 145, 10, 10, "square")
g.appendChild(rect)
rect = createRect(661, 145, 10, 10, "squareWeakGreen")
g.appendChild(rect)
rect = createRect(672, 145, 10, 10, "squareMiddleGreen")
g.appendChild(rect)
rect = createRect(683, 145, 10, 10, "squareStrongGreen")
g.appendChild(rect)
const text = createText(700, 154, "Activity")
g.appendChild(text)

svg.appendChild(g)
svg.setAttribute("width", "900")
svg.setAttribute("height", "200")
calendar.appendChild(svg)


function showOutput(event){
    const g = document.createElementNS(svgNS, "g")
    let x = parseFloat(event.target.attributes["x"].value) 
    let y = parseFloat(event.target.attributes["y"].value) - 10 
    let width = parseFloat(event.target.attributes["width"].value)
    let height = parseFloat(event.target.attributes["height"].value)
    let middleX = x + width / 2
    let middleY = y + height / 2
    const output = createRect(x - 50, y - 30, 110, 30, "output")
    g.appendChild(output)
    const text = createText(x - 30, y - 10, event.target.attributes["data-value"].value)
    g.appendChild(text)
    const triangle = document.createElementNS(svgNS, "polygon")
    triangle.setAttribute("points", x + "," + y + " " + middleX + "," + middleY + " " + (x + width) + "," + y)
    triangle.setAttribute("stroke", "grey")
    triangle.setAttribute("fill", "grey")
    g.appendChild(triangle)
    svg.appendChild(g)
}

function removeOutput(){
    svg.removeChild(svg.childNodes[svg.childNodes.length - 1])
}

function createRect(x, y, width, height, nameClass){
    const rect = document.createElementNS(svgNS, "rect")
    rect.setAttribute("width", width)
    rect.setAttribute("height", height)
    rect.setAttribute("x", x)
    rect.setAttribute("y", y)
    rect.setAttribute("class", nameClass)
    return rect
}

function createText(x, y, valueText){
    const text = document.createElementNS(svgNS, "text")
    text.setAttribute("x", x)
    text.setAttribute("y", y)
    text.appendChild(document.createTextNode(valueText))
    return text
}