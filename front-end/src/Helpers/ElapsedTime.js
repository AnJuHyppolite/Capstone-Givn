const getElapsedPostedTime = (start) => {
    let currentdate = new Date();
    let endTime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()
    const date1 = new Date(start);
    const date2 = new Date(endTime);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = diffInTime / oneDay;
    const diffInHours = diffInTime / 3600000
    const diffInMinutes = diffInTime / 60000
    if (diffInDays >= 1) {
        if (diffInDays < 2) {
            return "posted " + Math.round(diffInDays) + " day ago"
        }
        else {
            return "posted " + Math.round(diffInDays) + " days ago"
        }
    }
    else {
        if (diffInHours >= 1) {
            if (diffInHours < 2) {
                return "posted " + Math.round(diffInHours) + " hour ago"
            } else {
                return "posted " + Math.round(diffInHours) + " hours ago"
            }
        } else {
            if (diffInMinutes <= 1) {
                return "posted a minute ago"
            } else {
                return "posted " + diffInMinutes + " minutes ago"
            }
        }
    }
}

export default getElapsedPostedTime