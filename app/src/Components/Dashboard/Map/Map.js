import React,{useState,useEffect} from 'react'
import {GoogleMap,useLoadScript,Marker,InfoWindow} from '@react-google-maps/api';
import PlacesAutocomplete,{getLatLng,geocodeByAddress} from 'react-places-autocomplete'
import fire from './../../../fire'


const libraries = ["places"]
const mapContainerStyle = {
    width:"95vw",
    height:"100vh"
}
const center = {
    lat:43.65223,
    lng:-79
}

function handlemap(event){
    const email = localStorage.getItem('userid')
    //fire.firestore().collection('Users').where('Email','eq',email)  
}

function handleSelect(address){
    geocodeByAddress(address).then(results => getLatLng(results[0]))
    .then((latlng) => console.log(latlng))
    .catch(error=>console.log(error))
}
function Map() {
    const [marker,setmarker]=useState({})
    const [search,setSearch] =useState('delhi')
    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries

    })
    if(loadError) return 'Error loading'
    else if(!isLoaded) return 'Loading Maps'
    else return (
      <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}
            onClick={(event)=>{
                    if(event.latLng!=null)
                        console.log(event.latLng.lat())
                    setmarker({lat:event.latLng.lat(),
                        lng:event.latLng.lng()
                    })
                }}>
            <Marker position={{lat:marker.lat,lng:marker.lng}}/>
                    
            </GoogleMap>
      </div>
    )
}



export default Map
/*
onClick={(event)=>{
                    setmarker({
                        lat:event.latlng.lat(),
                        lng:event.latlng.lng()
                    })
                }}
*/