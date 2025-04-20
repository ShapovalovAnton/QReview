
export function addSettingsHandlers(answerDiv: HTMLElement, q:any, isOpen:boolean) {
  const settingsBtn = answerDiv.querySelector(".settings_img") as HTMLImageElement;
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      const menu = document.createElement("div");
      menu.className = "settings_menu";
      menu.innerHTML = `
        <button class="edit_question">Редагувати</button>
        <button class="delete_question">Видалити</button>
      `;
      answerDiv.appendChild(menu);

      const editBtn = menu.querySelector(".edit_question") as HTMLButtonElement;
      editBtn.addEventListener("click", () => {
        const questionP = answerDiv.querySelector("p.question_text") as HTMLParagraphElement;
        if (!questionP) return;

        const input = document.createElement("input");
        input.value = questionP.textContent || "";
        answerDiv.replaceChild(input, questionP);

        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && input.value.trim()) {
            const newText = input.value.trim();
            const newP = document.createElement("p");
            newP.textContent = newText;
            newP.className = "question_text";
            
            answerDiv.replaceChild(newP, input);
            menu.remove();

            const updateUrl = isOpen
              ? `http://localhost:5000/api/openq/${q.IdOpQuestion}`
              : `http://localhost:5000/api/closedq/${q.IdClQuestion}`;
            
            let body:any;  

            if(isOpen){
              body = {
                IdSurvey: q.IdSurvey,
                TextOpQuestion: newText,
                OrdNumber: q.OrdNumber,
              };
            } else {
              body = {
                IdSurvey: q.IdSurvey,
                TextClQuestion: newText,
                OrdNumber: q.OrdNumber,
                MaxNAnswer: q.MaxNAnswer,
              };
            }


            fetch(updateUrl, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            })
              .then(async res => {
                if (!res.ok) {
                  const text = await res.text();
                  throw new Error(`HTTP ${res.status}: ${text}`);
                }
                console.log(res);
                return res.json();
              })
              .then(()=>{
                
                if(isOpen)q.TextOpQuestion = newText;
                else q.TextClQuestion = newText;
              })
              .catch(console.error);
          }
        });
      });

      const deleteBtn = menu.querySelector(".delete_question") as HTMLButtonElement;
      deleteBtn.addEventListener("click", () => {
        const deleteUrl = isOpen
          ? `http://localhost:5000/api/openq/${q.IdOpQuestion}`
          : `http://localhost:5000/api/closedq/${q.IdClQuestion}`;

        fetch(deleteUrl, { method: "DELETE" })
          .then(res => res.json())
          .then(() => answerDiv.remove());
      });
    });
  }
}