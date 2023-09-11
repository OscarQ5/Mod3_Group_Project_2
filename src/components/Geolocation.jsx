import React, {useState, useEffect} from 'react'

const Geolocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    getAddressFromCoordinates(latitude, longitude);
                },
                (err) => { console.error(err); }
            );
        } else {
            console.log('Geolocation is not supported in this browser.');
        }
    }, []);

    const getAddressFromCoordinates = (lat, lng) => {
        const apiKey = "prj_live_sk_40643c832a171cb168589897f0dca825b1301ed1";
        const apiUrl = `https://api.radar.io/v1/geocode/reverse?coordinates=${lat},${lng}`;

        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `${apiKey}`,
            },
        })
            .then(r => r.json())
            .then((data) => {
                console.log(data)
                if (data.addresses && data.addresses.length > 0) {
                    const formattedAddress = data.addresses[0].formattedAddress;
                    setAddress(formattedAddress);
                } else {
                    console.error("No address data found")
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            {userLocation ? (
                <div>
                    <h2>Your Location:</h2>
                    <p>Latitude: {userLocation.lat}</p>
                    <p>Longitude: {userLocation.lng}</p>
                    {address && (
                        <div>
                            <h2>Address:</h2>
                            <p>{address}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    )
}

export default Geolocation