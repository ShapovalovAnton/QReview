export function update_Max_Answer(q:any, answerDiv:any){
    const maxAnswerInput = answerDiv.querySelector(".max_answer_input") as HTMLInputElement;
    if (maxAnswerInput) {
        maxAnswerInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            const newValue = parseInt(maxAnswerInput.value);
            
            if (isNaN(newValue) || newValue < 2) {
              alert("Мінімальне значення — 2.");
              maxAnswerInput.value = "2";
              return;
            }
      
            fetch(`http://localhost:5000/api/closedq/${q.IdClQuestion}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                IdSurvey: q.IdSurvey,
                TextClQuestion: q.TextClQuestion,
                OrdNumber: q.OrdNumber,
                MaxNAnswer: newValue
              })
            })
              .then(res => res.json())
              .then(() => {
                console.log("Максимальна кількість відповідей оновлена");
                q.MaxNAnswer = newValue;
              })
              .catch(err => console.error("Помилка при оновленні MaxNAnswer:", err));
          }
        });
      }
}


