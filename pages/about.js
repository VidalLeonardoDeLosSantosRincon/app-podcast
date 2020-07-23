//dependencies
import React,{Component} from "react";

//components
import Layout from "../components/Layout";

class About extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Layout title="About"/>
                <img src="../static/react.png" alt="biby"/>
                <h4>Programmers' life</h4>
                <p>Code is life, code are chances , code is our world</p>
                <style jsx>{`
                    h4{
                        color:dodgerblue;
                        font-size:25px;
                        margin:10px;
                    }
                    p{
                        color:white;
                        font-size:14px;
                        margin:10px; 
                    }
                    img{
                        height:350px;
                        width:400px;
                    }
                    *{
                        font-family:arial;
                        padding:0;
                        margin:0;
                    }
                    div{
                        width:500px;
                        margin:0 0 0 30%;
                        background:none;
                        display:flex;
                        justify-content:center;
                        box-sizing:border-box;
                        padding:15px;
                        flex-wrap:wrap;

                    }
                    :global(body){
                        background:rgba(0,0,0,0.80);
                        padding:0;
                        margin:0;
                    }
                `}</style>
            </div>
        );
    }
}
export default About;