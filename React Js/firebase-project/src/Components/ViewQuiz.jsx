import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../firebase/config';

export default function ViewQuiz() {

    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const db = getDatabase(app);
        const getQuizData = ref(db, 'quizzes/');
        onValue(ref(db, 'quizzes/'), (snapshot) => {
            const data = snapshot.val();
            
            var quizQuestion = [];
            for(var index in data){
                console.log(data[index]);
                quizQuestion.push(data[index]);
            }

            setQuizData(quizQuestion);
        });
    },[]);

    return (
        <>
            <div className='contaniner-fluid py-5'>
                <div className='container'>
                    <div className='row text-center mb-3'>
                        <h1>View Quiz</h1>
                    </div>


                    <div className='row'>
                        <table class="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Option 1</th>
                                    <th scope="col">Option 2</th>
                                    <th scope="col">Option 3</th>
                                    <th scope="col">Option 4</th>
                                    <th scope="col">Correct Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    quizData.length > 0
                                        ?
                                        quizData.map((v, i) => {
                                            return (
                                                <tr>
                                                    <th >{i+1}</th>
                                                    <td>{ v.question}</td>
                                                    <td>{ v.option_1}</td>
                                                    <td>{ v.option_2}</td>
                                                    <td>{ v.option_3}</td>
                                                    <td>{ v.option_4}</td>
                                                    <td>{ v.correct_answer}</td>
                                                </tr>
                                            )
                                        })

                                        :

                                        <tr>
                                            <th colSpan={7}>No record Found !!</th>
                                        </tr>

                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
