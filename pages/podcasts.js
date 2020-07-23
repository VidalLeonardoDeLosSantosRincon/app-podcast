//dependencies
import React,{Component} from 'react';
import "isomorphic-fetch";
import Error from "next/error";

//components
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

import ImageNotFound from "../static/image_not_found.png";


class Podcasts extends Component{

    static async getInitialProps({query, res}){
        let idAudioClip = query.id;

        try{
            let reqAudio =  await fetch(`https://api.audioboom.com/audio_clips/${idAudioClip}.mp3`);

            if(reqAudio.status==404){
                res.statusCode = reqAudio.status;
                return{audio_clip:null,statusCode:res.statusCode};
            }

            let dataAudio = await reqAudio.json();
            let audio_clip = dataAudio.body.audio_clip;
            return{audio_clip, statusCode:200};
        }catch(e){
            res.statusCode=503;
            return{audio_clip:null,statusCode:res.statusCode}
        }
    }

    componentWillUnmount(){
        
        localStorage.setItem("back-to","/");
    }
 render(){
     const {audio_clip, statusCode} = this.props;
     if(statusCode!==200){
         return <Error statusCode={statusCode}/>;
     }
     return(<div>
            <Layout title="Audio clips"/>
            <Header label="AudioClips" title={`${audio_clip.title}`} url="/"/>
            <div className="alt-ctr">               
                <div className="playBox">
                    <img src={audio_clip.urls.post_image===undefined? ImageNotFound :audio_clip.urls.post_image.original} alt="/" />
                    <audio src={audio_clip.urls.high_mp3} controls></audio>
                </div>
            </div>
            <Footer/>
            <style jsx>{`
            

            .alt-ctr{
                display:flex;
                height:auto;
                justify-content:center;
                align-items:center;
                flex-wrap:wrap;
                background:white;
            }
            
            .playBox{
                height:600px;
                width:700px;
                padding:5px;
                box-sizing:border-box;
                background:white;

                display:flex;
                justify-content:center;
                align-items:center;
                flex-wrap:wrap;
            }

            img{
                width:80%;
                height:80%;
            }
            audio{
                height:30px;
                width:80%;  
                outline:none;
                background:linear-gradient(45deg,gray, lightgray,gray);
                padding:5px;
                border-radius:10px;
            }
            :global(body){
                padding:0;
                margin:0;
            }
            `}</style>
            </div>

        );
 }
}

export default Podcasts;