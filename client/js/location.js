_lat = {
    current: 0,
    dependency: new Deps.Dependency(),
    get: function () {
        this.dependency.depend();
        return this.current;
    },
    set: function (value) {
        this.current = value;
        this.dependency.changed();
        return this.current;
    }
};

_lon = {
    current: 0,
    dependency: new Deps.Dependency,
    get: function () {
        this.dependency.depend();
        return this.current;
    },
    set: function (value) {
        this.current = value;
        this.dependency.changed();
        return this.current;
    }
};

if (navigator.geolocation) {
    Meteor.setInterval(function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            _lat.set(position.coords.latitude);
            _lon.set(position.coords.longitude);
        }, showError);
    }, 5000);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

Template.location.helpers({
    lat: function () {
        return _lat.get()
    },
    lon: function () {
        return _lon.get();
    }
});
