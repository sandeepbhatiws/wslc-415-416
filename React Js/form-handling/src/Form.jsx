import React, { useState } from 'react'
import stateDatas from './states';

export default function Form({userData, setUserData}) {

    const [states, setStates] = useState([]);

    const changeState = (event) => {
        const filterStates = stateDatas.filter((v,i) => {
            if(v.country_name == event.target.value){
                return v;
            }
        })
        setStates(filterStates);
    }

    const formHandler = (e) => {
        e.preventDefault();

        const data = {
            name : e.target.name.value,
            email : e.target.email.value,
            mobile_number : e.target.mobile.value,
            country_name : e.target.country.value,
            state_name : e.target.state.value,
        }

        const finalData = [data, ...userData];
        setUserData(finalData);

        console.log(data);
    }

    return (
        <>
            <div class="form-container">
                <h2>Basic Form</h2>
                <form id="formHandler" onSubmit={ formHandler } autocomplete="off">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div class="form-group">
                        <label for="mobile">Mobile Number</label>
                        <input type="tel" id="mobile" name="mobile" required />
                    </div>
                    <div class="form-group">
                        <label for="country">Country</label>
                        <select id="country" name="country" required onChange={ changeState }>
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="Canada">Canada</option>
                            <option value="Austraila">Austraila</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="state">State</label>
                        <select id="state" name="state" required>
                            <option value="">Select State</option>
                            {
                                states.map((item, index) => {
                                    return(
                                        <option value={ item.name } key={index}>{ item.name }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" class="submit-btn">Submit</button>
                </form>
            </div>
        </>
    )
}
