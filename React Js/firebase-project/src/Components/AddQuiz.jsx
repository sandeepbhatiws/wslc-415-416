import React from 'react'
import { getDatabase, ref, set } from "firebase/database";
import app from '../firebase/config';
import { toast } from 'react-toastify';

export default function AddQuiz() {

    const formHandler = (event) => {
        event.preventDefault();

        const data = {
            question : event.target.question.value,
            option_1 : event.target.option_1.value,
            option_2 : event.target.option_2.value,
            option_3 : event.target.option_3.value,
            option_4 : event.target.option_4.value,
            correct_answer : event.target.correct_answer.value,
        }

        const db = getDatabase(app);
        set(ref(db, 'quizzes/' + Date.now()), data);

        toast.success('Question add succussfully !');
        console.log(data);
        event.target.reset();

    }

    return (
        <>
            <div className='contaniner-fluid py-5'>
                <div className='container'>
                    <div className='row text-center'>
                        <h1>Add Quiz</h1>
                    </div>

                    <div className='row'>
                        <form autoComplete='off' onSubmit={formHandler}>
                            <div class="mb-3">
                                <label for="question" class="form-label">Question</label>
                                <input type="text" name='question' class="form-control" id="question" required />
                            </div>
                            <div class="mb-3">
                                <label for="option_1" class="form-label">Option 1</label>
                                <input type="text" name='option_1' class="form-control" id="option_1" required />
                            </div>
                            <div class="mb-3">
                                <label for="option_2" class="form-label">Option 2</label>
                                <input type="text" name='option_2' class="form-control" id="option_2" required />
                            </div>
                            <div class="mb-3">
                                <label for="option_3" class="form-label">Option 3</label>
                                <input type="text" name='option_3' class="form-control" id="option_3" required />
                            </div>
                            <div class="mb-3">
                                <label for="option_4" class="form-label">Option 4</label>
                                <input type="text" name='option_4' class="form-control" id="option_4" required />
                            </div>

                            <div class="mb-3">
                                <label for="correct_answer" class="form-label">Correct Answer</label>
                                <select class="form-select" name='correct_answer' required>
                                    <option selected>Select Correct Option</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    <option value="4">Option 4</option>
                                </select>
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
