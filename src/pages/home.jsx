import React from "react";
import {  IconButton} from "@mui/material";
import Navbar from "../components/navbar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const Home=()=>{
    return(
        <div>
        <Navbar/>
        <div>
         <header class="masthead">
         <div class="container px-4 px-lg-5 h-100">
             <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                 <div class="col-lg-8 align-self-end">
                     <h1 class="text-white font-weight-bold">Available Jobs</h1>
                     <hr class="divider" />
                 </div>
                 <div class="col-lg-8 align-self-baseline">
                     <p class="text-white-75 mb-5">Join our team and make a meaningful impact in the industry. Apply now and unlock your full potential in a supportive and dynamic work environment.</p>
                     <a class="btn btn-primary btn-xl" href="#about">Who We Are</a>
                 </div>
             </div>
         </div>
     </header>
     </div>
     <div>
      <section class="page-section bg-primary" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="text-white mt-0">We've got what you need!</h2>
                        <hr class="divider divider-light" />
                        <p class="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                        <a class="btn btn-light btn-xl" href="#services">Get Started!</a>
                    </div>
                </div>
            </div>
        </section>
     </div>
     <div>
     
     </div>
     <div>
     </div>
     <div>
     <footer class="bg-light py-5">
            <div class="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 2023 - Company Name</div></div>
        </footer>
     </div>
     </div>
    )
}
export default Home;