document.querySelectorAll('.SurveyBtn').forEach(function(button) {
  button.addEventListener('click', function() {
    const content = document.getElementById("content");
    const surveyContent = document.getElementById("surveyContent");

    // Перемикаємо видимість
    if (content.style.display !== "none") {
      content.style.display = "none";  
      surveyContent.style.display = "flex";  
    } else {
      content.style.display = "block";  
      surveyContent.style.display = "none";  
    }
  });
});