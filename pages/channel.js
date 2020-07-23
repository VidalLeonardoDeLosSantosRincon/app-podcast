//dependencies
import React,{Component, Fragment} from "react";
import "isomorphic-fetch";
import Link from "next/link";
import Error from "next/error";

//components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

class Channel extends Component{

    constructor(props){
        super(props);

        this.handleBackToChannel = this.handleBackToChannel.bind(this);

    }

    handleBackToChannel(url){
       
        localStorage.setItem("back-to",url);
    }

    componentWillUnmount(){
        let url = window.location.href;
        this.handleBackToChannel(url);
    }

    static async getInitialProps({query, res}){
        let idChannel = query.id;
        try{
            let [reqChannel, reqAudio, reqSubChannel] = await Promise.all([
                fetch(`https://api.audioboom.com/channels/${idChannel}`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
                fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)

            ]);
            
            if(reqChannel.status==404){
                res.statusCode = reqChannel.status;
                return {channel:null, audioClips:null, subChannels:null,statusCode:res.statusCode};
            }

            //channels
            let dataChannel = await reqChannel.json();
            let channel = dataChannel.body.channel;
            //audio-clips
            let dataAudio = await reqAudio.json();
            let audioClips = dataAudio.body.audio_clips;
            //sub-channels
            let dataSubChannel = await reqSubChannel.json();
            let subChannels = dataSubChannel.body.channels;

            return {channel, audioClips, subChannels,statusCode:200};
        }catch(e){
            res.statusCode=503;
            return {channel:null, audioClips:null, subChannels:null, statusCode:res.statusCode};
        }
    }
    render(){
        const {channel, audioClips, subChannels, statusCode} = this.props;
        if(statusCode!==200){
            return <Error statusCode={statusCode}/>
        }
        
            
        return(<div>
            
                <Layout title="Channels"/>
                <Header label="Channels" title={`${channel.title}`} url="/"/>
                
                    <div className="fl-ctr">     
                        <div  className="channel">
                            <img src={channel.urls.logo_image.original} alt="/"/>
                            <h6>{channel.title}</h6>
                        </div>
                        <div className="audio-clips-box">
                            <h4>Audio clips</h4>
                            {audioClips.map((audio, key)=>(
                            <Fragment>
                                <Link href={`/podcasts?id=${audio.id}`} prefecth>
                                    <a>
                                        <div className="audio-clips"key={`audio_clip_${key}`}>
                                        <h6>{audio.title}</h6>
                                        <h6>{`${(audio.duration/60).toFixed()} minutes`}</h6>
                                        </div>
                                    </a>
                                </Link>
                            </Fragment>
                            ))}
                        </div>
                      
                    </div>
                    <h4>Sub-canales</h4>
                        {subChannels.map((subChannel, key)=>(
                        <div className="sub-channel"key={key}>
                           <h6>{subChannel.title}</h6>
                        </div>
                        ))}
                        
                <Footer/>
                <style jsx>{`
                    
                    .fl-ctr{
                        width:100%;
                        height:auto;
                        background:rgba(0,0,0,0.09);
                        padding:10px;
                        box-sizing:border-box;
                        display:flex;
                        justify-content:center;
                        align-content:center;
                        
                    }
                    .fl-ctr p{
                        font-size:8px;
                    }  
                    
                    a{
                        text-decoration:none;
                        color:gray;
                    }
                    .channel{
                        box-sizing:border-box;
                        margin:5px;
                        background:white;
                        width:30%;
                        height:500px;
                        box-sizing:border-box;
                        padding:5px;
                        box-sizing:border-box;
                        box-shadow:1px 1px 5px rgba(0,0,0,0.3);
                    }

                    .channel img{
                        height:90%;
                        width:100%;
                    }
                     .channel h6{
                         font-size:8px;
                         color:gray;
                     }

                     .audio-clips-box{
                            background:white;
                            width:70%;
                            height:500px;
                            padding:10px;
                            box-sizing:border-box;
                            overflow-y:scroll;
                     }

                     .audio-clips-box h4{
                         font-size:22px;
                         color:gray;
                     }

                     h4{
                         margin:15px 0 0 0;
                         padding:10px 25px;
                         box-sizing:border-box;
                     }

                     h6{
                        font-size:12px;
                        color:gray;
                    }

                     .audio-clips{
                         border-bottom:1px solid rgba(0,0,0,0.1);
                         padding:10px 15px;
                         box-sizing:border-box;
                     }

                     .audio-clips:hover{
                        background:rgba(0,0,0,0.1);
                        border-bottom:2px solid rgba(0,0,0,0.4);
                        padding:10px 15px;
                    }

                     .sub-channel{
                        border-bottom:1px solid rgba(0,0,0,0.1);
                        padding:10px 15px;
                        box-sizing:border-box;
                        height:50px;
                        background:white;
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
export default Channel;