export function addDeleteOptionHandler(button: HTMLElement, optionId?: number) {
  button.addEventListener("click", () => {
    const optionElem = button.closest('.answer_point');
    if (!optionElem) return;

    optionElem.remove();

    if (optionId) {
      fetch(`http://localhost:5000/api/option/${optionId}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => console.log("Опцію видалено:", data))
        .catch(err => console.error("Помилка при видаленні опції:", err));
    }
  });
}