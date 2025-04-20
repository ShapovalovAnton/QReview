
import "./scss/main.scss";
import { ISurvey } from "./model/survey";
import { IClient } from "./model/client";
import { IClosedq } from "./model/closedq";
import { IOpenq } from "./model/openq";
import { IOption } from "./model/option";
import { addSettingsHandlers } from "./logic/settings_question";
import { update_name_about } from "./logic/about_name_survey";
import { addDeleteOptionHandler } from "./logic/delete_option";
import { update_Max_Answer } from "./logic/update_max_answer";

const dataSurveyURL = "http://localhost:5000/api/survey";
const dataClientURL = "http://localhost:5000/api/client";
const dataClosedqURL = "http://localhost:5000/api/closedq";
const dataOpenqURL = "http://localhost:5000/api/openq";
const dataOptionURL = "http://localhost:5000/api/option";
let newOrdNumber = 1;
const today = new Date().toISOString().split('T')[0];
let survey: ISurvey[] =[];
let clientId:number;
function formatDate(date: Date | null): string {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); 
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

export function Return(content:any, surveyContent:any) {
  if (content && surveyContent) {
      content.style.display = "block";
      surveyContent.style.display = "none";
  }
  update_data();
}


let selectedSurvey: ISurvey | undefined;



const newQuestionBtn = document.getElementById("newQuestionBtn") as HTMLButtonElement;
const selector = document.getElementById("questionTypeSelector") as HTMLDivElement;
const confirmBtn = document.getElementById("confirmQuestionType") as HTMLButtonElement;
const deleteSurvey = document.getElementById("deleteSurvey") as HTMLButtonElement;
const typeSelect = document.getElementById("questionType") as HTMLSelectElement;
const questionContainer = document.getElementById("surveyContent") as HTMLDivElement;

newQuestionBtn?.addEventListener("click", () => {
  selector.style.display = "block";
});

const createSurveyBtn = document.getElementById("Create") as HTMLButtonElement;

createSurveyBtn?.addEventListener("click", () => {
  
  const newSurvey = {
    NameSurvey: "Нове опитування",
    AboutSurvey: "",
    DateCreateSurvey: today,
    StartDateSurvey: null,
    FinishDateSurvey: null,
    StatusSurvey: "чернетка",
    IdClient: clientId
  };

  fetch("http://localhost:5000/api/survey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSurvey)
  })
    .then(res => res.json())
    .then(() => {
      update_data();
    })
    .catch(err => console.error("Помилка при створенні опитування:", err));
});

deleteSurvey?.addEventListener("click", () => {
  if (!selectedSurvey) {
    alert("Опитування не вибране!");
    return;
  }


  const confirmed = confirm(`Ви впевнені, що хочете видалити опитування "${selectedSurvey.NameSurvey}"?`);
  if (!confirmed) return;

  fetch(`http://localhost:5000/api/survey/${selectedSurvey.IdSurvey}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Помилка при видаленні опитування.");
      return res.json();
    })
    .then(() => {
      alert("Опитування успішно видалене!");
      Return(
        document.getElementById("content"),
        document.getElementById("surveyContent")
      );
      
      selectedSurvey = undefined;
    })
    .catch(err => {
      console.error("Помилка при видаленні:", err);
      alert("Не вдалося видалити опитування.");
    });
});

const activateSurveyBtn = document.getElementById("Activate") as HTMLButtonElement;

activateSurveyBtn?.addEventListener("click", () => {
  if (!selectedSurvey) {
    alert("Опитування не вибране!");
    return;
  }

  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  const updateData = {
    ...selectedSurvey,
    StatusSurvey: "активне",
    StartDateSurvey: today.toISOString().split('T')[0],
    FinishDateSurvey: twoWeeksLater.toISOString().split('T')[0]
  };

  fetch(`http://localhost:5000/api/survey/${selectedSurvey.IdSurvey}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData)
  })
    .then(res => {
      if (!res.ok) throw new Error("Помилка при активації опитування.");
      return res.json();
    })
    .then(() => {
      alert("Опитування активоване!");
      Return(
        document.getElementById("content"),
        document.getElementById("surveyContent")
      );
      selectedSurvey = undefined;
    })
    .catch(err => {
      console.error("Помилка при активації:", err);
      alert("Не вдалося активувати опитування.");
    });
});

confirmBtn?.addEventListener("click", () => {
  if (!selectedSurvey) return alert("Опитування не вибране!");

  const selectedType = typeSelect.value;
  selector.style.display = "none";
  const answerDiv = document.createElement("div");
  answerDiv.className = "answer";
  if (selectedType === "open") {
    answerDiv.innerHTML = `
      <p class="question_text">[Нове відкрите питання]</p>
      <textarea class="answer_input" rows="4" placeholder="Введіть відповідь"></textarea>
      <div class="answer_point answer_buttons">
        <div></div>
        <button><img class="settings_img" src="/Image/settings.svg"/></button>
      </div>
    `;

    fetch("http://localhost:5000/api/openq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        IdSurvey: selectedSurvey.IdSurvey,
        TextOpQuestion: "Нове відкрите питання",
        OrdNumber: newOrdNumber+1
      })
    }).then(res => res.json()).then((createdQuestion)=>{
      newOrdNumber++;
      const q = createdQuestion.result;
      addSettingsHandlers(answerDiv, q, true);





    });
  
  } else {
    const isSingle = selectedType === "single";

    answerDiv.innerHTML = `
      ${!isSingle ? `
        <div class="input_label">
          <p class="max_answer_p">Максимальна кількість відповідей:</p>
          <input class="max_answer_input" type="number" value="2" />
        </div>` : ""}
      <p class="question_text"> [Нове закрите питання]</p>
      <div class="answer_point">

      </div>
      <div class="answer_point answer_buttons">
        <button class="round add_option">+</button>
        <button><img class="settings_img" src="/Image/settings.svg"/></button>
      </div>
    `;


    fetch("http://localhost:5000/api/closedq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        IdSurvey: selectedSurvey.IdSurvey,
        TextClQuestion: "Нове закрите питання",
        OrdNumber: newOrdNumber + 1,
        MaxNAnswer: isSingle ? 1 : 2
      })
    })
    .then(res => res.json())
    .then((createdQuestion) => {
      newOrdNumber++;
      let q = createdQuestion.result;
      addSettingsHandlers(answerDiv, q, false);
      update_Max_Answer(q, answerDiv);
      

    
      const IdClQuestion = q.IdClQuestion;
    
      questionContainer.appendChild(answerDiv);
    
      const addOptionBtn = answerDiv.querySelector('.add_option') as HTMLButtonElement;
    
      addOptionBtn?.addEventListener("click", () => {
        const inputDiv = document.createElement("div");
        inputDiv.className = "answer_point";
    
        inputDiv.innerHTML = `
          <div class="answer_option">
            <input class="option_input" type="text" placeholder="Нова опція"/>
          </div>
        `;
    
        const buttonsBlock = answerDiv.querySelector('.answer_buttons');
        answerDiv.insertBefore(inputDiv, buttonsBlock);
    
        const inputField = inputDiv.querySelector('.option_input') as HTMLInputElement;
        inputField.focus();
    
        inputField.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && inputField.value.trim()) {
            const text = inputField.value.trim();
    
            inputDiv.innerHTML = `
              <div class="answer_option">
                <button class="${isSingle ? 'round' : ''} toggle_one"></button>
                <p>${text}</p>
              </div>
              <button class="delete_option delBtn round"><div class="line"></div></button>
            `;
    
            fetch("http://localhost:5000/api/option", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                IdClQuestion: IdClQuestion,
                TextAnsOpt: text
              })
            }).then(res => res.json())
            .then(data => {
              console.log("Опцію додано:", data.id);
              const insertedId = data.id;
            
              const deleteBtn = inputDiv.querySelector('.delBtn') as HTMLButtonElement;
              if (deleteBtn) {
                addDeleteOptionHandler(deleteBtn, insertedId);
              }
            })
              .catch(err => console.error("Помилка при додаванні опції:", err));
          }
        });
      });
    });
  }
  
  questionContainer.appendChild(answerDiv);
  
});



function update_data(){
  fetch(dataSurveyURL)
  .then(res => res.json())
  .then(json => {
    survey = json.filter((item: ISurvey) => item.IdClient === clientId);

    const draftContainer = document.getElementById("draft-container");
    const activeContainer = document.getElementById("active-container");

    draftContainer!.innerHTML = '';
    activeContainer!.innerHTML = '';

    survey.forEach(item => {
      const button = document.createElement("button");
      button.setAttribute("data-id", item.IdSurvey.toString());
      button.className = "hover survey SurveyBtn";
      const dateCreate = formatDate(item.DateCreateSurvey);
      const startDate = formatDate(item.StartDateSurvey);
      const finishDate = formatDate(item.FinishDateSurvey);

      if (item.StatusSurvey === "чернетка") {
        button.innerHTML = `
          <p class="name_draft">${item.NameSurvey}</p>
          <p>${dateCreate}</p>
        `;
        draftContainer?.appendChild(button);
      } else {
        button.innerHTML = `
          <p class="name_survey">${item.NameSurvey}</p>
          <p class="dates">${startDate} - ${finishDate}</p>
          <p class="status">${item.StatusSurvey}</p>
        `;
        activeContainer?.appendChild(button);
      }
    });

    document.querySelectorAll('.SurveyBtn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.currentTarget as HTMLElement;
        const content = document.getElementById("content");
        const surveyContent = document.getElementById("surveyContent");
    
        if (content && surveyContent) {
          content.style.display = "none";
          surveyContent.style.display = "flex";
        }
        document.querySelector('#surveyContent .SurveyBtn')?.addEventListener('click', () => {
          const content = document.getElementById("content");
          const surveyContent = document.getElementById("surveyContent");
        
          Return(content, surveyContent);
        });
        const surveyId = Number(target.getAttribute("data-id"));
        selectedSurvey = survey.find(s => s.IdSurvey === surveyId);
        
    
        if (selectedSurvey) {
          const nameInput = document.getElementById("name") as HTMLInputElement;
          const aboutInput = document.getElementById("about") as HTMLTextAreaElement;

          update_name_about(selectedSurvey, nameInput, aboutInput);
          
          Promise.all([
            fetch(dataClosedqURL).then(res => res.json()),
            fetch(dataOpenqURL).then(res => res.json()),
            fetch(dataOptionURL).then(res => res.json())
          ]).then(([closedQuestions, openQuestions, options]: [IClosedq[], IOpenq[], IOption[]]) => {
            newOrdNumber=1;
            const questionContainer = document.querySelector("#surveyContent") as HTMLElement;
    
            const oldAnswers = questionContainer.querySelectorAll('.answer');
            oldAnswers.forEach(el => el.remove());
    
            const filteredClosed = closedQuestions
              .filter(q => q.IdSurvey === surveyId)
              .map(q => ({ ...q, type: "closed" as const }));
    
            const filteredOpen = openQuestions
              .filter(q => q.IdSurvey === surveyId)
              .map(q => ({ ...q, type: "open" as const }));
    
            const allQuestions = [...filteredClosed, ...filteredOpen]
              .sort((a, b) => a.OrdNumber - b.OrdNumber);
    
            allQuestions.forEach(q => {
              if(newOrdNumber<q.OrdNumber) newOrdNumber = q.OrdNumber;
              const answerDiv = document.createElement("div");
              answerDiv.className = "answer";
    
              if (q.type === "open") {
                answerDiv.innerHTML = `
                  <p class="question_text">${q.TextOpQuestion}</p>
                  <textarea class="answer_input" rows="4" placeholder="Введіть відповідь"></textarea>
                  <div class="answer_point answer_buttons draft_only">
                    <div></div>
                    <button><img class="settings_img" src="/Image/settings.svg"/></button>
                  </div>
                `;
                addSettingsHandlers(answerDiv, q, true);
              } else {
                const opts = options.filter(opt => opt.IdClQuestion === q.IdClQuestion);
                const isSingle = q.MaxNAnswer === 1;
                const optionsHTML = opts.map(opt => `
                  <div class="answer_point">
                    <div class="answer_option">
                      <button class="${isSingle ? 'round' : ''} toggle_one"></button>
                      <p>${opt.TextAnsOpt}</p>
                    </div>
                    <button class="delete_option draft_only round"><div class="line"></div></button>
                  </div>
                `).join("");
    
                answerDiv.innerHTML = `
                  ${q.MaxNAnswer > 1 ? `
                    <div class="input_label">
                      <p class="max_answer_p">Максимальна кількість відповідей:</p>
                      <input class="max_answer_input" type="number" value="${q.MaxNAnswer}" />
                    </div>
                  ` : ""}
                  <p class="question_text">${q.TextClQuestion}</p>
                  ${optionsHTML}
                  <div class="answer_point answer_buttons draft_only">
                    <button class="round add_option">+</button>
                    <button><img class="settings_img" src="/Image/settings.svg"/></button>
                  </div>
                `;
                addSettingsHandlers(answerDiv, q, false);
                
                if(q.MaxNAnswer>1){ update_Max_Answer(q, answerDiv);}
              }

        

    
              questionContainer.appendChild(answerDiv);
              const addOptionBtn = answerDiv.querySelector('.add_option') as HTMLButtonElement;

              if (q.type === "closed" && addOptionBtn) {
                const deleteButtons = answerDiv.querySelectorAll('.delete_option');
                

                deleteButtons.forEach(btn => {
                  const optionElem = btn.closest('.answer_point');
                  const text = optionElem?.querySelector('p')?.textContent?.trim();
                  const optionToDelete = options.find(
                    opt => opt.TextAnsOpt === text && opt.IdClQuestion === q.IdClQuestion
                  );
                  addDeleteOptionHandler(btn as HTMLElement, optionToDelete?.IdAnsOpt);
                });

                addOptionBtn.addEventListener("click", () => {
                  const inputDiv = document.createElement("div");
                  inputDiv.className = "answer_point";

                  inputDiv.innerHTML = `
                  <div class="answer_option">
                  <input class="option_input" type="text" placeholder="Нова опція"/>
                  </div>
                  `;

                  const buttonsBlock = answerDiv.querySelector('.answer_buttons');
                  answerDiv.insertBefore(inputDiv, buttonsBlock);

                  const inputField = inputDiv.querySelector('.option_input') as HTMLInputElement;
                  inputField.focus();

                  inputField.addEventListener("keydown", (e) => {
                  if (e.key === "Enter" && inputField.value.trim()) {
                  const text = inputField.value.trim();


                  inputDiv.innerHTML = `
                  <div class="answer_option">
                  <button class="${q.MaxNAnswer === 1 ? 'round' : ''} toggle_one "></button>
                  <p>${text}</p>
                  </div>
                  <button class="delete_option delBtn round draft_only"><div class="line"></div></button>
                  `;

                  fetch("http://localhost:5000/api/option", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                  },
                    body: JSON.stringify({
                    IdClQuestion: q.IdClQuestion,
                    TextAnsOpt: text
                  })
                  }).then(res => res.json())
                    .then(data => {
                      console.log("Опцію додано:", data.id);
                      const insertedId = data.id;
                    
                      const deleteBtn = inputDiv.querySelector('.delBtn') as HTMLButtonElement;
                      if (deleteBtn) {
                        addDeleteOptionHandler(deleteBtn, insertedId);
                      }
                    })
                    .catch(err => console.error("Помилка при додаванні опції:", err));
                 }
                });
              });
             }
              
            });
            if(selectedSurvey?.StatusSurvey!='чернетка')
              {
                const elements = document.querySelectorAll('.draft_only');
                elements.forEach(el => {
                  (el as HTMLElement).style.display = 'none';
                });
              } 
              else{
                const elements = document.querySelectorAll('.draft_only');
                elements.forEach(el => {
                  (el as HTMLElement).style.display = 'flex';
                });
              }
          });
        }
      });
    });
  })
  .catch(err => console.error("Помилка при завантаженні опитувань:", err));
}
document.addEventListener("DOMContentLoaded", () => {
    const clientListWrapper = document.getElementById("clientListWrapper");
    const chooseClientBlock = document.getElementById("choose_client_block");
    const header = document.getElementById("header");
    const content = document.getElementById("content");
    const footer = document.getElementById("footer");
    
    
    fetch(dataClientURL)
      .then(res => res.json())
      .then((clients: IClient[]) => {
        if (!clientListWrapper) return;
  
        clients.forEach(client => {
          const clientDiv = document.createElement("div");
          clientDiv.className = "client";
          clientDiv.innerHTML = `
            <img class="client_img" src="/Image/client.png" />
            <div>
              <h4>${client.NameClient}</h4>
              <p class="email">${client.EmailClient}</p>
            </div>
          `;
  
          clientDiv.addEventListener("click", () => {
            if (chooseClientBlock) chooseClientBlock.style.display = "none";
            if (header) header.style.display = "block";
            if (content) content.style.display = "block";
            if (footer) footer.style.display = "flex";
          
            clientId = client.IdClient;
          
            update_data();
          });
  
          clientListWrapper.appendChild(clientDiv);
        });
      })
      .catch(err => console.error("Помилка при завантаженні клієнтів:", err));
  });


  