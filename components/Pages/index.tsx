import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={"قیمت لحظه ای تتر "} style={{ minHeight: 450, margin: 10, width: "calc(100% - 20px)"}}>
      <img src='/logo-no-background.png' style={{width:120, height:80, float:"left", marginLeft:"20px",marginTop:"40px"}}/>
        <div style={{width:"70%",height:150 , backgroundColor:"darkslategray" , borderBottomLeftRadius:30 , color:"white", fontSize:"15px" , 
           paddingRight:"10px",marginRight:50,borderBottomRightRadius:30}}>
          <img src='/tether.png' style={{width:"100px",height:"100px",float:"left",marginTop:"20px"}}/>
        <br-x/>
        <br-x/>
        لحظه ای: <div style={{color:"#31FF1A",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
        {(props.p.price as number).toLocaleString("fa-IR")}
        </div>
        <br-x/>
        تغییرات ۲۴ ساعت: <div style={{color:"#ffff1a",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
        %{(Number(props.p.diff24d) as number).toLocaleString("fa-IR")}
        </div>
        <br-x/>
        تغییرات هفتگی: <div style={{color:"#ffff1a",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
        %{(Number(props.p.diff7d) as number).toLocaleString("fa-IR")}
        </div>
        <br-x/>
        تغییرات ماهانه: <div style={{color:"#ffff1a",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
        {(Number(props.p.diff30d) as number).toLocaleString("fa-IR")}%
        </div>
        </div>
        <br-x/>
        <center style={{height:5 , width:850 ,background:"white",margin:"30px auto", borderRadius:4}}></center>

        <div style={{width:"70%",height:150,background:"darkslategray", borderRadius:30,color:"white",fontSize:"15px"
          ,paddingRight:"10px",marginRight:50
        }}>
          <img src='/tether.png' style={{width:"100px",height:"100px",float:"right",marginTop:"20px"}}/>
          <br-x/>
          <br-x/>
          <div style={{direction:"ltr",marginLeft:15}}>
            live: <div style={{color:"#31FF1A",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
          {(props.p.price as number)}
          </div>
          <br-x/>
          changes 24 hour: <div style={{color:"#ffff1a",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
          {(props.p.diff24d as number)}%
          </div>
          <br-x/>
          Weekly changes: <div style={{color:"#ffff1a",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
          {(props.p.diff7d as number)}%
          </div>
          <br-x/>
          Monthly changes: <div style={{color:"#ffff1a",fontSize:"15px",display:"inline",fontWeight:"bolder"}}>
          {(props.p.diff30d as number)}%
          </div>
          </div>
          <br-x/>

        </div>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let res = await fetch("https://api.tetherland.com/currencies")
    let data = await res.json()
    let p= data.data.currencies.USDT

    console.log("price:",p)
  return {
    props: {
      data: global.QSON.stringify({
        p:p,
        session,
        // nlangs,
      })
    },
  }
}