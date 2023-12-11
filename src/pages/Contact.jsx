import React from "react";


export default function Contact(){
    return(
        <>
            <div className="row">
                <div className="col-3"> </div>
                <div className="col-lg-6 bg-dark-subtle">
                <div class="container-fluid p-5 contact">
                <form>
                    <h2 class="text-center fw-bold">Contact Form</h2>
                    <div class="row mb-3 me-5">
                        <label for="name" class="col-sm-2 col-form-label fw-bold">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" required/>
                        </div>
                    </div>
                    <div class="row mb-3 me-5">
                        <label for="inputEmail3" class="col-sm-2 col-form-label fw-bold">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail3" required/>
                        </div>
                    </div>

                    <div class="row mb-3 me-5">
                        <label for="subj" class="col-sm-2 col-form-label fw-bold">Subject</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="subj" required/>
                        </div>
                    </div>

                    <div class="row mb-3 me-5">
                        <label for="textArea" class="col-sm-2 col-form-label fw-bold">Message</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="textArea" name="" cols="30" rows="10"></textarea>
                        </div>
                    </div>

                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" class="btn btn-success m-auto">Submit</button>
                    </div>

                </form>
            </div>
                </div>
            </div>
        </>
    )
};