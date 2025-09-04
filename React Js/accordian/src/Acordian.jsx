import React, { useState } from 'react'
import data from './data';
import Question from './Question';

export default function Acordian() {

    const [faqData, setFaqData] = useState(data);
    const [currentIndex, setCurentIndex] = useState(0);

  return (
    <>
      <div class="main">
        {
            faqData.map((value, index) => {
                return(
                    <Question item={value} currentIndex={currentIndex} index={index} setCurentIndex={setCurentIndex}/>
                    // <div class="question_answer">
                    //     <div onClick={ () => questionAnswer(index) } class="question">{ value.question }
                    //         <span>{ currentIndex == index ? '-' : '+' }</span>
                    //     </div>
                    //     <div class={ currentIndex == index ? 'answer' : 'answer d-none' }>
                    //         { value.answer }
                    //     </div>
                    // </div>
                )
            })
        }
        </div>
    </>
  )
}
