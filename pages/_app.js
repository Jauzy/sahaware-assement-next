// import '../styles/style.css'
// your other stylesheets as per your wish
import '../src/static/css/style.css'
import { RecoilRoot } from "recoil";
import MasterLayout from "../src/layouts/layout"

function MyApp({ Component, pageProps }) {
    return (
      <RecoilRoot>
        <MasterLayout>
          <Component {...pageProps} />
        </MasterLayout>
      </RecoilRoot>
    )
  }
    
export default MyApp