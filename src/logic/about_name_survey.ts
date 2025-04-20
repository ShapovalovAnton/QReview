import { ISurvey } from "../model/survey";
export function update_name_about(selectedSurvey:ISurvey, nameInput:any, aboutInput:any){
    if (nameInput && aboutInput) {
        if (selectedSurvey) {
          const nameInput = document.getElementById("name") as HTMLInputElement;
          const aboutInput = document.getElementById("about") as HTMLTextAreaElement;
    
          if (nameInput && aboutInput) {
            nameInput.value = selectedSurvey.NameSurvey;
            aboutInput.value = selectedSurvey.AboutSurvey;
    
            let idSur=selectedSurvey.IdSurvey;
            let client = selectedSurvey.IdClient;
            let dateCr = selectedSurvey.DateCreateSurvey; 
    
            nameInput.addEventListener("keydown", (e) => {
              if (e.key === "Enter" && nameInput.value.trim()) {
                fetch(`http://localhost:5000/api/survey/${idSur}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({  FinishDateSurvey:null, StartDateSurvey:null, StatusSurvey:'чернетка', DateCreateSurvey:dateCr, AboutSurvey:aboutInput.value, IdClient: client, NameSurvey: nameInput.value })
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Назву оновлено:", data);
                    selectedSurvey!.NameSurvey = nameInput.value;
                  })
                  .catch((err) => console.error("Помилка при оновленні назви:", err));
              }
            });
          
            aboutInput.addEventListener("keydown", (e) => {
              if (e.key === "Enter" && !e.shiftKey && aboutInput.value.trim()) {
                e.preventDefault();
                fetch(`http://localhost:5000/api/survey/${idSur}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({  FinishDateSurvey:null, StartDateSurvey:null, StatusSurvey:'чернетка', DateCreateSurvey:dateCr, AboutSurvey:aboutInput.value, IdClient: client, NameSurvey: nameInput.value })
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Опис оновлено:", data);
                    selectedSurvey!.AboutSurvey = aboutInput.value;
                  })
                  .catch((err) => console.error("Помилка при оновленні опису:", err));
              }
            });
          }
        }
      }
}


