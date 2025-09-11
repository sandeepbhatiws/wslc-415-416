import React from 'react'

export default function Table({userData, setUserData }) {

    const deleteUser = (index) => {
        if(confirm('Are you sure you want to delete ?')){
               const filterUser = userData.filter((v,i) => {
                    if(i != index){
                        return v;
                    }
               })
               setUserData(filterUser);
               localStorage.setItem('userData',JSON.stringify(filterUser));
        }
    }

    return (
        <>
            <div class="table-container">
                <h2>User Data</h2>
                <table id="data-table" border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody id="fetch-data">
                        {
                            userData.length > 0
                            ?
                                userData.map((v,i) => {
                                    return(
                                        <tr>
                                            <td>{ i+1 }</td>
                                            <td>{ v.name }</td>
                                            <td>{ v.email }</td>
                                            <td>{ v.mobile_number }</td>
                                            <td>{ v.country_name }</td>
                                            <td>{ v.state_name }</td>
                                            <td><button onClick={ () => deleteUser(i) }> Delete </button></td>
                                        </tr>
                                    )
                                })                                
                            :
                                <tr>
                                    <td colSpan={7}>No Record Found !!</td>
                                </tr>

                        }


                        
                    </tbody>
                </table>
            </div>
        </>
    )
}
