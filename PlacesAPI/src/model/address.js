var Address = {
    searchId : String,
    searchedOn:Date,
    address : {
        locality: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
        formattedAddress: String,
        location: {
            lat: String,
            long: String
        }
    }
};

module.exports = Address;