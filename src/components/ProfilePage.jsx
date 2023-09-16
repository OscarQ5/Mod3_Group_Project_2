import React, { useState, useEffect } from 'react'
import "./ProfilePage.css"

const ProfilePage = ({ user }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [parkingQueue, setParkingQueue] = useState([]);
    const [accountAddress, setAccountAddress] = useState("")
    const [parkingOptions, setParkingOptions] = useState(null)
    const [savedAdd, setSavedAdd] = useState("Saved Address:")
    // const [currAdd,setCurrAdd] = useState("Current Address:")
    const [availablityQueue, setAvailabilityQueue] = useState([])


    const [acceptedRequest, setAcceptedRequest] = useState(null)
    const [notificationTimer, setNotificationTimer] = useState(null)
    const [counter, setCounter] = useState(null)

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
        if (user) {
            getAccountAddress()
        }
    }, [user]);

    useEffect(() => {

        const startTimer = () => {
            if (counter > 0) {
                const timer = setInterval(() => {
                    setCounter((prevCounter) => {
                        if (prevCounter > 0) {
                            return prevCounter - 1;
                        } else {
                            clearInterval(timer)
                            return 0;
                        }
                    });
                }, 1000);
                return timer;
            } else {
                return null;
            }
        };

        const timer = startTimer();

        return () => {
            if (timer) {
                clearInterval(timer)
            }
        };
    }, [counter])

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
        if (user && user.userLocations) {
            const { latitude, longitude } = user.userLocations
            const apiKey = import.meta.env.VITE_RADAR_API_KEY
            const apiUrl = `https://api.radar.io/v1/geocode/reverse?coordinates=${latitude},${longitude}`;

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
    }

    const handleTakeParking = (userLocation) => {
        console.log('Take My Parking clicked')
        if (userLocation) {
            const request = { user, location: userLocation }
            setParkingQueue([...parkingQueue, request])
            setCounter(300)
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

    const findMatchingParking = (userLocation) => {
        // Find nearby parking spots here
        // Calculate distances and return the nearest available parking spot
        // If no parking is available, return null

        //Dummy parking spot
        const nearbyParking = {
            user: { name: 'Dummy User' },
            location: { lat: 0, lng: 0 },
        };

        if (nearbyParking) {
            return nearbyParking;
        } else {
            return null;
        }
    };

    const handleAcceptRequest = (request) => {
        setAcceptedRequest(request);
        setNotificationTimer(null);
        //Notify the other user

        const updatedQueue = parkingQueue.filter((item) => item !== request);
        setParkingQueue(updatedQueue);
    };

    const startNotificationTimer = () => {
        if (acceptedRequest) {
            const timer = setTimeout(() => {
                handleAcceptRequest();
            }, 300000); // 5 minutes in milliseconds
            setNotificationTimer(timer);
        }
    };


    const TakeParkingOptions = () => {
        return (
            <div className="parking-options">
                <h3>Choose Parking Location:</h3>
                <button className="button-options" onClick={() => {
                    handleTakeParking(address)
                    setAccountAddress("")
                    setSavedAdd("")
                    setAvailabilityQueue([...availablityQueue, address])
                }}> Current Location</button>

                <button className="button-options" onClick={() => {
                    handleTakeParking(accountAddress)
                    setAddress("")
                    setSavedAdd("Saved Address:")
                    setAvailabilityQueue([...availablityQueue, accountAddress])
                }}> Saved Location</button>
            </div>
        )
    }
    return (
        <div className="geolocation">
            {user && (
                <div>
                    <h2>Welcome, {user.name}!</h2><br />
                    <h3>{savedAdd}</h3>
                    <p>{accountAddress}</p>
                    <p>{user.car.model}</p>
                    <p>{user.car.color}</p>
                    <p>{user.car.carType}</p>
                    <img src={user.car.image} height="100" />
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
                        <button className="selectButton" onClick={() => { setParkingOptions(TakeParkingOptions) }}>Get Parking</button>
                        <button className="selectButton" onClick={handleGiveParking}>Take My Parking</button>
                        {/* <br /> */}
                        {parkingOptions}
                        {/* <br /> */}
                        {/* <p className="availableSpot">{availablityQueue}</p> */}
                    </div>
                </div>
            ) : (
                <p>Fetching location...</p>
            )}
            {counter && (
            <div>
                <h2>Parking Requests</h2>
                {parkingQueue.map((request, index) => (
                    <div className="acceptRequest" key={index}>
                        <div className="acceptRP"> 
                        <p>Request from {request.user.name}</p>
                        <p>{availablityQueue}</p>
                        </div>
                        {request ? (
                            <div>
                                <button onClick={() => handleAcceptRequest(request)}>Accept</button>
                            </div>
                        ) : (
                            <div>
                                <button disabled>Accept</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            )}
            {acceptedRequest && (
                <div>
                    <h2>Accepted Request</h2>
                    <p>{acceptedRequest.user.name} accepted your parking request.</p>
                    {counter > 0 ? (
                        <p>
                            Time left: {Math.floor(counter / 60)}:
                            {counter % 60 < 10 ? "0" : ""}
                            {counter % 60}
                        </p>
                    ) : (
                        <p>Time has expired.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfilePage