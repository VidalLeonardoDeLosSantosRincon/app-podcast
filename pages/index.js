//dependencies
import React,{Component} from "react";
import "isomorphic-fetch";
import Link from "next/link";
import Error from "next/error";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Home extends Component{

    constructor(props){
        super(props);

        this.handleBackToHome = this.handleBackToHome.bind(this);
    }

    handleBackToHome(){
        let url = window.location.href;
        localStorage.setItem("back-to",url);
    }
    
    componentDidMount(){
        this.handleBackToHome();
    }   

    static async getInitialProps(res){
        try{
            let req = await fetch("https://api.audioboom.com/channels/recommended");
            let {body : channels} = await req.json();
            return {channels, statusCode:200};

            if(req.status===404){
                res.statusCode = req.status;
                return {channels:null, statusCode:res.statusCode};
            }

        }catch(e){
            res.statusCode=503;
            return {channels:null, statusCode:res.statusCode};
        }
    }
    render(){
        const {channels,statusCode} = this.props;
        if(statusCode!==200){
            return <Error statusCode={statusCode}/>
        }
        return(
            <div>
                <Layout title="podcasts"/>
                <Header label="" title="Podcasts" url="/"/>
                    <div className="fl-ctr">
                        {
                            channels.map((channel, key)=>(  
                                <Link key={key} href={`/channel?id=${channel.id}`} prefetch>
                                    <a  className="channel">
                                    <img src={channel.urls.logo_image.original} alt="/"/>
                                    <h6>{channel.title}</h6>
                                    </a>
                                </Link>
                            ))
                        }
                    </div>
                    <Footer/>
                <style jsx>{`
                    *{
                        padding:0;
                        margin:0;
                        font-family:arial;
                    }
                    
                    .fl-ctr{
                        width:100%;
                        background:rgba(0,0,0,0.09);
                        padding:10px;
                        box-sizing:border-box;
                        display:flex;
                        justify-content:center;
                        flex-wrap:wrap;
                    }
                    a{
                        text-decoration:none;
                        color:gray;
                    }
                    .channel{
                        box-sizing:border-box;
                        margin:5px;
                        background:white;
                        width:200px;
                        box-sizing:border-box;
                        padding:5px;
                        box-shadow:1px 1px 5px rgba(0,0,0,0.3);
                    }

                    .channel:hover{
                        box-shadow:0 12px 5px rgba(0,0,0,0.3);
                        transform: translateY(-8px);
                        -webkit-transform: translateY(-8px);
                        -moz-transform: translateY(-8px);
                        -ms-transform: translateY(-8px);
                        -o-transform: translateY(-8px);
                        transition:all 0.2s linear;
                        -webkit-transition:all 0.2s linear;
                        -moz-transition:all 0.2s linear;
                        -ms-transition:all 0.2s linear;
                        -o-transition:all 0.2s linear;
                    }

                    .channel img{
                        height:180px;
                        width:100%;
                    }
                    :global(body){
                        background:white;
                        padding:0;
                        margin:0;
                    }
                `}</style>
            </div>
        );
    }
}
export default Home;