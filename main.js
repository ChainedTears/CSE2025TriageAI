const usrInput = document.getElementById('reportInput');
const refreshBtn = document.getElementById('refresh');
const importanceListHTML = document.getElementById('importanceList');
const database = "https://cs-api.pltw.org/triageai";
let currIncidents = [];
let currImportance = [];

async function saveToDB(data) {
  return await (await fetch(database + data, {method: 'POST'})).text();
}

async function fetchData() {
  var data = await (await fetch(database, {method: 'GET'})).text()
  var dataParsed = JSON.parse(data)
  currIncidents = dataParsed.strings;
  console.log(currIncidents);
  return dataParsed;
}

async function sendGroqPrompt(promptText) {
  const apiKey = "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";
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const data = {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: promptText
      }
    ],
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result.choices[0].message.content;

  } catch (error) {
    console.error(error);
  }
}

async function rankImportance() {
  let prompt = `Below are incidents from an emergency that has been reported. You will output a list, only a list - that ranks them by urgency. For example, the first index of the list you output will be the index of most urgent emergency on the zero-indexed list provided. Below is the list, please only output your list of importancy. ${currIncidents}`;
  importance = await sendGroqPrompt(prompt);
  currImportance = JSON.parse(importance);
};

usrInput.addEventListener('keyup', (event) => { 
  if (event.key === 'Enter') {
    event.preventDefault(); 
    saveToDB(`?text=${usrInput.value}`);
    usrInput.value = "";
    fetchData();
    triggerSuccessState()
  }
});

function triggerSuccessState() {
  const input = document.getElementById('reportInput');
  if (!input) return;
  const og = input.placeholder;
  input.style.border = '1px solid rgba(75, 255, 100, 0.6)';
  input.style.boxShadow = '0 0 15px rgba(75, 255, 100, 0.2)';
  input.placeholder = 'Success';
  setTimeout(() => {
    input.style.border = '';
    input.style.boxShadow = ''; 
    input.placeholder = og;
  }, 700);
}


async function refreshList() {
  importanceListHTML.innerHTML = `<p>Loading, please wait.</p>`
  await fetchData();
  await rankImportance();
  importanceListHTML.innerHTML = ``
  for (let i = 0; i < currImportance.length; i++) {
    let importanceRanking = document.createElement('p');
    importanceRanking.textContent = `${i + 1}) ${currIncidents[currImportance[i]]}`;
    importanceListHTML.appendChild(importanceRanking)
  }
}
