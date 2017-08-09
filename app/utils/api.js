import axios from 'axios';
import * as jsonData from './data.js'

export function getJsonData(){
    return convertToArray();
    //return jsonData.default;
}

function convertToArray(){
    let data = jsonData.default;
    let newData = [];
    let keys = Object.keys(data);
    keys.forEach(key => {
        let row = data[key]
        let obj = {file: key, code: row}
        newData.push(obj);
    })
    return newData;
}