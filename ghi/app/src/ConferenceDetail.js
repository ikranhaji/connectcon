import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import './Conferencedetail.css';

function ConferenceDetail() {
    const [product, setProduct] = useState("");
    const params = useParams();
    console.log(params)

    const fetchData = async () => {
        const url = `http://localhost:8000/api/conferences/${params.id}/`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            setProduct(data);
        }
    };
    console.log(product)

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="col">
            {product ? (
                <div key={product.href} className="c mb-3 shadow">
                    <img src={product.conference.location.picture_url} className="card-img" />
                    <div className="card-body">
                        <h5 className="card-title">{product.conference.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {product.conference.location.name}
                        </h6>
                        <p className="card-text">
                            {product.conference.description}
                        </p>
                    </div>
                    <div className="card-footer">
                        {new Date(product.conference.starts).toLocaleDateString()}
                        -
                        {new Date(product.conference.ends).toLocaleDateString()}
                    </div>
                </div>
            ) : (
                <p>Loading conference data ..</p>
            )}
        </div>
    )
}
export default ConferenceDetail
