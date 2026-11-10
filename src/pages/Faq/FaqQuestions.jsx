// O'ngda savollar: savol bosilganda javob ochiladi/yopiladi (useState bilan)
// ← shuni map qilasiz: items.map((item) => …) — item.id, item.question, item.answer
export function FaqQuestions({ items }) {
  return <div className="faq-questions">
<div>
{items.map((item, index) =>  (
  
  <div className="faq-question" key={item.id}>
    <h3>{item.question}</h3>
   {index === 0 && <p>{item.answer}</p>}
  </div>
))}


</div>
 </div>;

}
