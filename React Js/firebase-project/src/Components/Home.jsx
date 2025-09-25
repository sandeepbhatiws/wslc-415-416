import React from 'react'

export default function Home() {
    return (
        <>
            

            <div class="hero-container" id="hero-sec">
                <div class="container-fluid ">
                    <div class="row d-flex">
                        <div class="col align-middle">
                            <div class="px-2 py-2">
                                <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611" class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="px-5 py-5 mt-5">
                                <div class="px-2 py-2 align-middle">
                                    <h4>Get all your needs Here</h4>
                                    <p> An online learning and teaching marketplace with over 204000 courses and 54 million students. Learn programming, marketing, data science and more.</p>
                                </div>
                                <div class="px-2 py-2">
                                    <button type="button" class="btn btn-outline-primary">Checkout Our Courses</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- main container --> */}
                <div class="main-container">
                    <div class="container-fluid">
                        ...
                    </div>
                </div>

                {/* <!--  Card container  --> */}
                <div class="card-container bg-black" id="team">
                    <div class="container-fluid px-3 py-3">
                        <div class="row center mx-4 my-4 text-white">
                            <h2>Meet Our Expert</h2>
                            <p>Highly professional team</p>
                        </div>
                        <div class="row mb-5">
                            <div class="col">
                                <div class="card" >
                                    <img src="https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1474.jpg?w=740&t=st=1667038053~exp=1667038653~hmac=7f51a4d7c9f7dc9e0e3a6d53d45f381fc455e5424bcc36a0bedca65db24487e7" class="card-img-top" style={{height:'300px'}} alt="..."/>
                                        <div class="card-body">
                                            <h5 class="card-title">Martina doena</h5>
                                            <p class="card-text">Highly proficient in Web3 and AI and professional in Designing Websites with tools of Web3.0.</p>
                                            <a href="#" class="btn org-btn">Learn More.</a>
                                        </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card" >
                                    <img src="https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg" class="card-img-top" style={{height:'300px'}} alt="..."/>
                                        <div class="card-body">
                                            <h5 class="card-title">Zaid S.</h5>
                                            <p class="card-text">A professional web designer with a wealth of knowledge about the web Development and Software Development. </p>
                                            <a href="#" class="btn org-btn">Go somewhere</a>
                                        </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card" >
                                    <img src="https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg?w=740&t=st=1667038099~exp=1667038699~hmac=d144ede4a891a4bfcb57b109cc26614850ed35f5260bbf32541845325c476dbb" class="card-img-top" style={{height:'300px'}} alt="..."/>
                                        <div class="card-body">
                                            <h5 class="card-title">Jhon Doe</h5>
                                            <p class="card-text">Expert in all aspects of coding and knowledgeable about a wide range of coding languages</p>
                                            <a href="#" class="btn org-btn">Go somewhere</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="aside-container">
                    <div class="container-fluid">
                        <aside>
                            <p>The Epcot center is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                        </aside>
                    </div>
                </div>


                {/* <!--  testimonals container  --> */}
                <div class="testimonals-container mt-4 mb-4" id="testi">
                    <div class="container-fluid">
                        <div class="row center mx-4 my-4">
                            <h2>What Peoples Say </h2>
                            <p>Read our Testimonals</p>
                        </div>
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    
                                        <div class="card-group">
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667039591~exp=1667040191~hmac=3996cb3fe0c2a92d83dfa4986a6da0e62212cabb97397aab04c8f50f771b7f90" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?w=740&t=st=1667039801~exp=1667040401~hmac=6b629c58ba7d8377cd74454b010b48bc920e6cb96e6fc6f3733135b8f180519f" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1667039664~exp=1667040264~hmac=ad7a2beb239191b6f7cf1cb1d1e5f0012768ad0be36cc1b0ad2c461274601ff0" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                        </div>
                                </div>
                                <div class="carousel-item">
                                        <div class="card-group">
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?w=740&t=st=1667039801~exp=1667040401~hmac=6b629c58ba7d8377cd74454b010b48bc920e6cb96e6fc6f3733135b8f180519f" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667039591~exp=1667040191~hmac=3996cb3fe0c2a92d83dfa4986a6da0e62212cabb97397aab04c8f50f771b7f90" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1667039664~exp=1667040264~hmac=ad7a2beb239191b6f7cf1cb1d1e5f0012768ad0be36cc1b0ad2c461274601ff0" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                        </div>
                                </div>
                                <div class="carousel-item">
                                        <div class="card-group">
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?w=740&t=st=1667039801~exp=1667040401~hmac=6b629c58ba7d8377cd74454b010b48bc920e6cb96e6fc6f3733135b8f180519f" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1667039664~exp=1667040264~hmac=ad7a2beb239191b6f7cf1cb1d1e5f0012768ad0be36cc1b0ad2c461274601ff0" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                            <div class="card">
                                                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667039591~exp=1667040191~hmac=3996cb3fe0c2a92d83dfa4986a6da0e62212cabb97397aab04c8f50f771b7f90" class="card-img-top" alt="..."/>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Card title</h5>
                                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <small class="text-muted">Last updated 3 mins ago</small>
                                                    </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="banner-container mt-5 mb-5" id="featured">
                    <div class="container-fluid px-4 py-4">
                        <div class="card bg-black text-white shadow-lg ">
                            <h5 class="card-header">Featured Courses</h5>
                            <div class="card-body">
                               
                                <div class="conatiner">
                                    <div class="row d-flex justify-content-around">
                                        <div class="col">
                                            <div class="card text-black move-up mb-3" >
                                                <div class="card-header">Web Development</div>
                                                <div class="card-body">
                                                    <h5 class="card-title">Front End + Backend</h5>
                                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card text-black move-up mb-3" >
                                                <div class="card-header">Web3.0</div>
                                                <div class="card-body">
                                                    <h5 class="card-title">Web3 and Tools</h5>
                                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card text-black move-up mb-3" >
                                                <div class="card-header">Java Masterclass</div>
                                                <div class="card-body">
                                                    <h5 class="card-title">Begineer Course</h5>
                                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card text-black move-up mb-3" >
                                                <div class="card-header">Python </div>
                                                <div class="card-body">
                                                    <h5 class="card-title">Python AI</h5>
                                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
    </>
  )
}
