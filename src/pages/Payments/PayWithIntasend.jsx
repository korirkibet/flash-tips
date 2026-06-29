import 'intasend-inlinejs-sdk'

export default function PayButton({amount, text}) {
    //secret_key = ISSecretKey_live_82f7f0b7-1037-4ca2-99d1-36e09dd0c849
    //publishable_key = ISPubKey_live_19bc94db-d807-478e-aecf-588264f0d159
  new window.IntaSend({
    publicAPIKey: 'ISPubKey_live_bb736708-132b-4aa0-b7dc-73895203c678',
    live: false //or true for live environment
  }).on("COMPLETE", (response) => { console.log("COMPLETE:", response) })
    .on("FAILED", (response) => { console.log("FAILED", response) })
    .on("IN-PROGRESS", () => { console.log("INPROGRESS ...") })
   
  return (
  <button 
    className="btn intaSendPayButton" 
    type='submit' 
    title='subscribe' 
    data-amount="10" 
    data-currency="KES" 
    data-email="charleykibet254@gmail.com" 
    data-first_name="JOE" 
    data-last_name="DOE" 
    data-country="KE"
  >{text}</button>
  )
}