import React, { useState, useEffect } from 'react'
import UserData from "../UserData.json"
import "./ProfilePage.css"

const ProfilePage = ({ user }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [parkingQueue, setParkingQueue] = useState([]);
    const [accountAddress, setAccountAddress] = useState("")
    const [parkingOptions, setParkingOptions] = useState(null)
    const [savedAdd, setSavedAdd] = useState("Saved Address:")
    const [availablityQueue, setAvailabilityQueue] = useState([])


    const [acceptedRequest, setAcceptedRequest] = useState(null)
    const [counter, setCounter] = useState(null)
    const [dummyaddresses, setDummyAddresses] = useState({})
    const [selectedLocation, setSelectedLocation] = useState(null)

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
        let timer;

        const startTimer = () => {
            if (acceptedRequest && counter > 0) {
                timer = setInterval(() => {
                    setCounter((prevCounter) => {
                        if (prevCounter > 0) {
                            return prevCounter - 1;
                        } else {
                            clearInterval(timer);
                            return 0;
                        }
                    });
                }, 1000);
            }
        };

        startTimer();

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [acceptedRequest, counter])

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
        console.log('Get Parking clicked')
        if (userLocation) {
            const request = { user, location: userLocation, action: "Taking Parking" }
            setParkingQueue([...parkingQueue, request])
            setCounter(300)
        } else {
            console.log('User location not available.');
        }
    };

    const handleGiveParking = (userLocation) => {
        console.log('Take My Parking clicked')
        if (userLocation) {
            const request = { user, location: userLocation, action: "Giving Parking" }
            setParkingQueue([...parkingQueue, request]);
            setCounter(300)
        } else {
            console.log('User location not available.');
        }
    };

    const handleAcceptRequest = (request) => {
        setAcceptedRequest(request)
        const updatedQueue = parkingQueue.filter((item) => item !== request);
        setParkingQueue(updatedQueue);
    };

    const TakeParkingOptions = () => {
        return (
            <div className="parking-options">
                <h3>Choose Parking Location:</h3>
                <button className="button-options" onClick={() => {
                    handleTakeParking(address)
                    setSelectedLocation(address)
                    // setAccountAddress("")
                    // setSavedAdd("")
                    setAvailabilityQueue([...availablityQueue, address])
                }}> Current Location</button>

                <button className="button-options" onClick={() => {
                    handleTakeParking(accountAddress)
                    setSelectedLocation(accountAddress)
                    // setAddress("")
                    // setSavedAdd("Saved Address:")
                    setAvailabilityQueue([...availablityQueue, accountAddress])
                }}> Saved Location</button>
            </div>
        )
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; 
        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    }

    useEffect(() => {
        const updatedQueue = parkingQueue.map((request) => {
            if (selectedLocation) {
                const distance = calculateDistance(
                    request.location.lat, request.location.lng,
                    userLocation.lat, userLocation.lng
                );
    
                let colorCode = "";
                if (distance <= 0.5) {
                    colorCode = "green";
                } else if (distance <= 1.0) {
                    colorCode = "yellow";
                } else {
                    colorCode = "red";
                }
    
                return { ...request, distance, colorCode };
            } else {
                return request;
            }
        });
    
        setParkingQueue(updatedQueue);
    }, [userLocation, selectedLocation])


    const giveParkingOptions = () => {
        return (
            <div className="parking-options">
                <h3>Choose Parking Location:</h3>
                <button className="button-options" onClick={() => {
                    handleGiveParking(address)
                    setSelectedLocation(address)
                    // setAccountAddress("")
                    // setSavedAdd("")
                    setAvailabilityQueue([...availablityQueue, address])
                    console.log(parkingQueue)
                }}> Current Location</button>

                <button className="button-options" onClick={() => {
                    handleGiveParking(accountAddress)
                    setSelectedLocation(accountAddress)
                    // setAddress("")
                    // setSavedAdd("Saved Address:")
                    setAvailabilityQueue([...availablityQueue, accountAddress])
                }}> Saved Location</button>
            </div>
        )
    }

    useEffect(() => {
        const generateDummyRequests = () => {
            const dummyRequests = [];

            for (const userData of UserData.users) {
                const { userLocations, name } = userData;
                if (userLocations) {
                    const { latitude, longitude } = userLocations;
                    fetchDummyAddress(latitude, longitude);
                    const dummyRequest = {
                        user: { name },
                        location: { lat: latitude, lng: longitude },
                        action: Math.random() < 0.5 ? "Taking Parking" : "Giving Parking"
                    };
                    dummyRequests.push(dummyRequest)
                }
            }

            setParkingQueue(dummyRequests)
        };

        generateDummyRequests()
    }, [])

    const fetchDummyAddress = (lat, lng) => {
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
                    setDummyAddresses((prevDummyAddresses) => ({
                        ...prevDummyAddresses,
                        [`${lat},${lng}`]: formattedAddress,
                    }))
                } else {
                    console.error("No address data found")
                }
            })
            .catch(err => console.error(err));
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
                        <button className="selectButton" onClick={() => setParkingOptions(giveParkingOptions)}>Take My Parking</button>
                        {/* <br /> */}
                        {parkingOptions}
                        {/* <br /> */}
                        {/* <p className="availableSpot">{availablityQueue}</p> */}
                    </div>
                </div>
            ) : (
                <p>Fetching location...</p>
            )}
            <div className='requests'>
                {counter && (
                    <div>
                        <h2>Parking Requests</h2>
                        {parkingQueue.map((request, index) => (
                            <div className="acceptRequest" key={index}>
                                <div className="acceptRP">
                                    <p>Request from {request.user.name}</p>
                                    <p>{request.action}</p>
                                    {request.user.id === user.id && selectedLocation && (
                                        <p>Selected Location: {selectedLocation}</p>
                                    )}
                                    {dummyaddresses[`${request.location.lat},${request.location.lng}`] && (
                            <div>
                                <p>Address: {dummyaddresses[`${request.location.lat},${request.location.lng}`]}</p>
                                <p>You are {(request.distance * 0.621371).toFixed(2)} miles away from this location</p>
                                <div className={`color-code ${request.colorCode}`}></div>
                            </div>
                        )}
                                    {/* <p>{availablityQueue}</p> */}
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
        </div>
    )
}

export default ProfilePage