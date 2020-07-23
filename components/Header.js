import React,{Component} from "react";


class Header extends Component{

    constructor(props){
        super(props);
        
    }

    render(){
        const {title, label, url} = this.props;
        
        return(<div>
            <header>
                    <h4>{label}</h4>
                    <h2>{title}</h2>
                    <span onClick={()=>{
                        window.location = url;
                    }}>
                        Back
                    </span>
            </header>

            <style jsx>{`
            header{
                background:rgba(0,0,0,0.85);
                height:60px;
                width:100%;
                box-sizing:border-box;
                padding: 8px 15px;
                color:white;

                display:flex;
                justify-content:space-between;
                align-items:center;
            }

            header h4{
                font-weight:300;
                font-size:25px;
                color:gray;
            }

            header span{
                padding:0 25px;
                box-sizing:border-box;
                cursor:pointer;
            }
            `}</style>
        </div>);
    }
}
export default Header;