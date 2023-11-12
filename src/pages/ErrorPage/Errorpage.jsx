import { Link } from "react-router-dom";


const Errorpage = () => {
    return (
        <div className="space-y-10 flex justify-center flex-col items-center">
            <div>
            <img className="w-[70vh] " src="https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design.jpg" alt="" />
            </div>
            <div>
            <Link to="/"><button className="btn btn-primary">Go Back home</button></Link>
            </div>
            
          
        </div>
    );
};

export default Errorpage;