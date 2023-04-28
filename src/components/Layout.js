import React, { useState } from 'react';
import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import 'react-autocomplete-input/dist/bundle.css';

export default function Layout() {
  const [showBasic, setShowBasic] = useState(false);

  return (

    <header>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>42i</h1>
              <h4 className='mb-3'>Busque su locación</h4>
              <MDBBtn tag="a" outline size="lg">
              <MDBInput label='Locación' id='form1' type='text' />
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}