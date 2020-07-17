const axios = require('axios');

export async function getQuestionList() {
    let res = await axios.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
  
    let data = res.data;
    return data;
}

export async function addQuestion(data) {
    let res = await axios.post('https://opentdb.com/api.php', data);
    // let adddata = res.data;
    return res;
}