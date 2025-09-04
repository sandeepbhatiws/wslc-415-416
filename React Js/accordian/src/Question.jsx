import React from 'react'

export default function Question({item, currentIndex, index, setCurentIndex}) {
    console.log(item);

    const questionAnswer = (i) => {
        setCurentIndex(i);
    }

  return (
    <>
    <div class="question_answer">
        <div class="question" onClick={ () => questionAnswer(index) }>{item.question}
            <span>{ currentIndex == index ? '-' : '+' }</span>
        </div>
        <div class={ currentIndex == index ? 'answer' : 'answer d-none' }>
            {item.answer}
        </div>
    </div>
    </>
  )
}
