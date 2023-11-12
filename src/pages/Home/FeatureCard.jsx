

const FeatureCard = ({feature}) => {
    const {id,assignmentName,assignmentImage}= feature
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl mx-auto">
                    <figure className="h-64" ><img className="w-full" src={assignmentImage} alt="Shoes" /></figure>
                    <div className="card-body">
                        <p className="text-2xl font-semibold">{assignmentName}</p>
                    </div>
                </div>
        </div>
    );
};

export default FeatureCard;