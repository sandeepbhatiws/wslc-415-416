import React from 'react'

export default function Table({userData }) {
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
                                            <td>test</td>
                                            <td>tes@gmail.com</td>
                                            <td>123456789</td>
                                            <td>India</td>
                                            <td>India</td>
                                            <td><button> Delete </button></td>
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
