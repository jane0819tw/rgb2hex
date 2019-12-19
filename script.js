const model = {
  numMap :{
    10: 'A',11: 'B',12: 'C',13: 'D',14: 'E',15: 'F',
  },
  getNum(num){
    return this.numMap[num]?this.numMap[num]:num.toString()
  }
}

const view = {
  redInput : document.getElementById('redInput'),
  greenInput : document.getElementById('greenInput'),
  blueInput : document.getElementById('blueInput'),
  result : document.getElementById('result'),
  body: document.querySelector('body'),
  title: document.querySelector('h1'),
  writeValue(colorObj){
    this.redInput.nextElementSibling.innerText = colorObj.red
    this.greenInput.nextElementSibling.innerText = colorObj.green
    this.blueInput.nextElementSibling.innerText = colorObj.blue
  },
  updateResult(hex,hex2){
    this.result.value = `${hex}`
    this.body.style.backgroundColor = `#${hex}`
    this.title.style.color = `#${hex2}`
  },
  updateRGBValue(colorValueObj){
    this.redInput.value = colorValueObj.red
    this.greenInput.value = colorValueObj.green
    this.blueInput.value = colorValueObj.blue
  }
}

const controllor = {
  init(){
    this.updateView()
    this.addEventListener()
  },
  addEventListener(){
    document.querySelector('.panel').addEventListener('change',evt=>{
      if(evt.target.id!=='result'){
        this.updateView()
      }
    })
    
    document.querySelector('.panel').addEventListener('input',evt=>{
      if(evt.target.id==='result'){
        let valueArr = evt.target.value.toUpperCase().split('')
        // 輸入符合才開始更新
        if(this.checkValue(valueArr)){
          // 開始分解
          this.hex2RGB(valueArr)
        }
      }
    })
  },
  hex2RGB(valueArr){
    let rgbColorObj = {
      red: this.sixteen2ten(valueArr.slice(0,2)),
      green: this.sixteen2ten(valueArr.slice(2,4)),
      blue: this.sixteen2ten(valueArr.slice(4,6))
    }
    view.updateRGBValue(rgbColorObj)
    this.updateView()
  },
  sixteen2ten(arr){
    return this.getNum(arr[0])*16+this.getNum(arr[1])
  },
  getNum(text){
      let textSixteen = Object.entries(model.numMap).find(([key,value])=>value===text)
      if(textSixteen){
        return +textSixteen[0]
      }else{
        return +text
      }
  },
  checkValue(valueArr){
    if(valueArr.length===6){
      return valueArr
        .filter(v=>isNaN(v))
        .every(v=>Object.values(model.numMap).some(eng=>eng===v))      
    }
    return false
  },
  tenTo16(number){
    return model.getNum(parseInt(number/16))+model.getNum(number%16)
  },
  generateHEX(rgbArr){
    return this.tenTo16(rgbArr[0])+this.tenTo16(rgbArr[1])+this.tenTo16(rgbArr[2])
     // return rgbArr.reduce((total,number)=>this.tenTo16(number)+total,'')
  },
  updateView(){
    let colorObj = {red:view.redInput.value,
                    green:view.greenInput.value,
                    blue: view.blueInput.value}
    view.writeValue(colorObj)
    
    let hex = this.generateHEX([view.redInput.value,view.greenInput.value, view.blueInput.value])
    // 取得相反色顯示在title上
    let hex2 = this.generateHEX([255-view.redInput.value,255-view.greenInput.value, 255-view.blueInput.value])
    view.updateResult(hex,hex2)
  }
}

controllor.init()