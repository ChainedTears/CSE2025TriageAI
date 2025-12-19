# TriageAI - CSE 2025 Semester 1 Finals Project

This is an emergency response system where users may report incidents where they would be sorted by order of urgency by an AI model, allowing emergency responders to act fast.

---

Ethan wrote the HTML and CSS.
---
Arthur wrote parts of the JS that requires communication and logic with the APIs.
---
Rickey and Arush collaborated on parts of the JS that requires variables and HTML manipulation
---
Arush contributed to the python script which allowed us to modify the PLTW endpoint beyond the scope of our actual application
---
# Arush's explanation:
```
I completed my understanding for 1.1.3 Conditionals. 1.1.3 requires you to use conditionals like If statements, also you have to include variables. The code that I wrote demonstrates my understanding in this topic now. As you can see in the code (written by me) includes an if statement like in 1.1.3. The if statement here is checking whether the client clicks enter if they did it will save their response to the database and run the fetchData and triggerSuccessState function. If they didn't it won't do anything. The variable constructs a response to store the data from the AI to determine the relevance of the emergency. All of this together contributes to my understanding of 1.3.3 and proves that I deserve a better grade on the assingment. 

Arush's Code:

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
```
