import React, { useState, useEffect } from 'react'
import "./ProfilePage.css"

const ProfilePage = ({ user }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [parkingQueue, setParkingQueue] = useState([]);
    const [accountAddress, setAccountAddress] = useState("")

    const getUserLocation = () => {
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
    }

    useEffect(() => {
        getUserLocation() 
        if(user){
            getAccountAddress()
        }
    }, [user]);

    const getAddressFromCoordinates = (lat, lng) => {
        const apiKey = import.meta.env.VITE_RADAR_API_KEY
        const apiUrl = `https://api.radar.io/v1/geocode/reverse?coordinates=${lat},${lng}`;

        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `${apiKey}`,
            },
        })
            .then(r => r.json())
            .then((data) => {
                if (data.addresses && data.addresses.length > 0) {
                    const formattedAddress = data.addresses[0].formattedAddress;
                    setAddress(formattedAddress);
                } else {
                    console.error("No address data found")
                }
            })
            .catch(err => console.error(err));
    };

    const getAccountAddress = () => {
        const apiKey = import.meta.env.VITE_RADAR_API_KEY
        const apiUrl = `https://api.radar.io/v1/geocode/reverse?coordinates=${user.userLocations.latitude},${user.userLocations.longitude}`;

        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `${apiKey}`,
            },
        })
            .then(r => r.json())
            .then((data) => {
                if (data.addresses && data.addresses.length > 0) {
                    const formattedAddress = data.addresses[0].formattedAddress;
                    setAccountAddress(formattedAddress)
                } else {
                    console.error("No address data found")
                }
            })
            .catch(err => console.error(err));
    }

    const handleTakeParking = () => {
        console.log('Take My Parking clicked')
        if (userLocation) {
            setParkingQueue([...parkingQueue, { location: userLocation, action: 'take' }]);
        } else {
            console.log('User location not available.');
        }
    };

    const handleGiveParking = () => {
        console.log('Give Parking clicked')
        if (userLocation) {
            setParkingQueue([...parkingQueue, { location: userLocation, action: 'give' }]);
            console.log(parkingQueue)
        } else {
            console.log('User location not available.');
        }
    };

    const findMatchingParking = () => {
        // Implement logic to find matching parking based on user locations
        // Calculate distances and filter the parkingQueue to find matches
        // Update state to reflect the matched users
    };

    return (
        <div className="geolocation">
            {user && (
                <div>
                    <h2>Welcome, {user.name}!</h2><br />
                    <h3>Saved Address:</h3>
                    <p>{accountAddress}</p>
                    <p>{user.car.model}</p>
                    <p>{user.car.carType}</p>
                    <p>{user.car.color}</p>
                </div>
            )}
            {userLocation ? (
                <div>
                    {address && (
                        <div>
                            <h2>Current Address:</h2>
                            <p>{address}</p>
                        </div>
                    )}
                    <div className="buttons">
                        <button onClick={handleTakeParking}>Take My Parking</button>
                        <button onClick={handleGiveParking}>Give Parking</button>
                    </div>
                </div>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    )
}

export default ProfilePage