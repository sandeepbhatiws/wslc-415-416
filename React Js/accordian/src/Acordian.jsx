import React, { useState } from 'react'
import data from './data';

export default function Acordian() {

    const [faqData, setFaqData] = useState(data);
    const [currentIndex, setCurentIndex] = useState(0);

    const questionAnswer = (i) => {
        setCurentIndex(i);
    }

  return (
    <>
      <div class="main">
        {
            faqData.map((value, index) => {
                return(
                    <div class="question_answer">
                        <div onClick={ () => questionAnswer(index) } class="question">{ value.question }
                            <span>{ currentIndex == index ? '-' : '+' }</span>
                        </div>
                        <div class={ currentIndex == index ? 'answer' : 'answer d-none' }>
                            { value.answer }
                        </div>
                    </div>
                )
            })
        }
        </div>
    </>
  )
}
