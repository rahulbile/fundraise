import React,{useEffect,useState, useRef} from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy'
import '../../pages/api/loader'
import styles from '../../styles/Home.module.css'
import ReactDOM from 'react-dom';

export default function DonateBox() {

  const ref = useRef();
  let lightningAddress = ''
  let animationDuration = 0
  const setCustomAmount = (value) => {
    $(".amount-alert").addClass('hidden')
    $("#fundraise-amount").val(value);
  }

  const generateQRcode = () => {
    const amount = $("#fundraise-amount").val()
    const description = $("#fundraise-description").val()
    if (amount == '') {
      $(".amount-alert").removeClass('hidden')
    } else {
      strikeJS.generateInvoice({
        'debug': true,
        'element': '#strikeInvoiceCard',
        'amount': amount,
        'currency': 'USDT',
        'redirectMessage': 'Thanks Satoshi',
        'apiKey': 'F0179FEED84101416131124B8400E6AD23B09DA2A9D137426CE22B52BFD9C492'
      });
      ref.current.toggle()
    }
  }

  return (
    <Flippy
      flipOnHover={false} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal"
      ref={ref}
      style={{ backgroundColor: 'none', 'box-shadow': 0}}>
      <FrontSide className={styles.card}>
      <h2 className="font-mono"> Donate &rarr;</h2>
      <div className="form-amount">
        <div className="flex justify-center w-full py-2 gap-2">
          <button onClick={() => setCustomAmount('5')} className="btn focus btn-outline amountOption hover peer-checked:">$5</button>
          <button onClick={() => setCustomAmount('10')} className="btn btn-outline btn-primary amountOption">$10</button>
          <button onClick={() => setCustomAmount('20')} className="btn btn-outline btn-accent amountOption">$20</button>
        </div>
        <label className="input-group py-2">
          <input x-model="fundraise-amount" id="fundraise-amount" type="number" min="0" step="1" placeholder="Custom Amount" className="input textarea-secondary w-full" />
          <span>USD</span>
        </label>
        <div className="alert shadow-lg alert-error hidden amount-alert :className={'text-green-700': fundraise-amount.length < 1} " >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Please select or enter amount.</span>
          </div>
        </div>
        <div id="txtArea">
          <textarea id="fundraise-description" className="textarea textarea-secondary w-full" maxLength = "200" placeholder="Message (Optional)"></textarea>
        </div>
        <button onClick={() => generateQRcode()} className="btn btn-wide btn-secondary w-full">Donate</button>
      </div>
      </FrontSide>
      <BackSide className={styles.card}>
        <div onClick={() => ref.current.toggle()} className="gap-1 leftArrowBox bg-orange-400 p-1 text-white relative border-black rounded-md inline-block m-1 whitespace-no-wrap">Start Over &larr;</div>
        <div id="strikeInvoiceCard" className="strike-invoice-card">
        </div>
        <div className="stat-desc w-full">Pay by scanning QRcode using lightning wallet.</div>
      </BackSide>
    </Flippy>

  );
}
