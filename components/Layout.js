//dependencies
import React,{Component} from 'react';
import Head from "next/head";

class Layout extends Component{
    constructor(props){
        super(props);
    }
    render(){

        const {title} = this.props;
        return(
            <div>
                <Head>
                    <title>{title}</title>
                </Head>
                <style jsx global>{`
                *{
                    padding:0;
                    margin:0;
                    font-family:arial;
                }
                `}</style>
            </div>
        );
    }
}
export default Layout;