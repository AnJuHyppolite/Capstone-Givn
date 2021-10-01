const relativeDistance = (user, itemUser) => {
    let lat1 = user.latitude;
    let lon1 = user.longitude;
    let lat2 =  Number(itemUser.latitude);
    let lon2 = Number(itemUser.longitude);
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    let km = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    let miles = km * 0.621371;
    return miles.toFixed(2) * 1;
}

export default relativeDistance