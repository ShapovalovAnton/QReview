
import "./scss/main.scss";
import { ISurvey } from "./model/survey";
import { IClient } from "./model/client";


const dataSurveyURL = "http://localhost:5000/api/survey";
const dataClientURL = "http://localhost:5000/api/client";
const dataClosedqURL = "http://localhost:5000/api/closedq";
const dataOpenqURL = "http://localhost:5000/api/openq";
const dataOptionURL = "http://localhost:5000/api/option";

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
          
                document.querySelectorAll('.SurveyBtn').forEach(function(button) {
                  button.addEventListener('click', function () {
                    const content = document.getElementById("content");
                    const surveyContent = document.getElementById("surveyContent");
          
                    if (content && surveyContent) {
                      content.style.display = "none";  
                      surveyContent.style.display = "flex";  
                    }
                  });
                });
              })
              .catch(err => console.error("Помилка при завантаженні опитувань:", err));
          });
  
          clientListWrapper.appendChild(clientDiv);
        });
      })
      .catch(err => console.error("Помилка при завантаженні клієнтів:", err));
  });