import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <>
      <h1 className="text-center my-4">Create an Event</h1> {/* Adding a heading */}
      <form>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput id='form6Example1' label='Event name' />
          </MDBCol>
        </MDBRow>

        <MDBInput wrapperClass='mb-4' id='form6Example3' label='Company name' />
        <MDBInput wrapperClass='mb-4' id='form6Example4' label='Location' />
        <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='Dates' />
        <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Volunteers Needed' />

        <MDBInput wrapperClass='mb-4' id='form6Example7' label='Additional information' />

        {/* <MDBCheckbox
          wrapperClass='d-flex justify-content-center mb-4'
          id='form6Example8'
          label='Create an account?'
          defaultChecked
        /> */}

        <MDBBtn className='mb-4' type='submit' block>
          Submit
        </MDBBtn>
      </form>
    </>
  );
}
