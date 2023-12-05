import React from "react";
import Navbar from "../components/navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div>
      <section class="page-section bg-primary" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="text-white mt-0">We've got what you need!</h2>
                        <hr class="divider divider-light" />
                        <p class="text-white-75 mb-4">Experience excellence with our passionate team, delivering exceptional jobs . We prioritize innovation, customer satisfaction, and tailored approaches to meet your specific needs. Discover how we can help you succeed by exploring our website today.</p>
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
  );
};

export default About;