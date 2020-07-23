import React,{Fragment} from "react";


const Footer = (props)=>{
    return(
        <Fragment>
                <footer className="footer">
                            <h4>Vidal L. De Los Santos 2019&copy;</h4>
                </footer>

            <style jsx>{`
                    .footer{
                        width:100%;
                        height:100px;
                        background:rgba(0,0,0,0.85);
                        color:white;
                        font-weight:300;


                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }
            
            `}</style>
        </Fragment>
    );

};


export default Footer;