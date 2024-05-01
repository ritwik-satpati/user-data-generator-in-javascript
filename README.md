### Random JSON Data generator in Javascript
- Library :
    - [FS](https://nodejs.org/api/fs.html) - Node.js File System to create JSON file & write data in it.
- External Library : 
    - [Chnace](https://chancejs.com/) - A minimalist generator of random data.

## Generated Data Structure
    id: <"U-A0001", "U-A0002", ...>,
    guid: <chance.guid()>,
    name: <chance.name({ gender })>,
    gender: <chance.gender()>,
    age: <chance.age()>,
    city: <"Mumbai" / "Delhi", "Bangalore" / "Kolkata" / "Chennai" / "Hyderabad" / "Ahmedabad" / "Pune" / "Surat" / "Jaipur" / "Lucknow" / "Kanpur" / "Nagpur" / "Indore" / "Patna" / "NA"> (with a Priority & State),
    state: <(Based on City)>,
    country: "India",
    occupationStatus: <"Student" / "Dropout" / "Working" / "Jobless" / "Retired"> 
    occupation: <"School Student" / "College Student" / "Farmer" / chance.profession() / "NA">

## Created By: Ritwik Satpati
- [Linkedin: @ritwik-satpati](https://www.linkedin.com/in/ritwik-satpati/)
- [Github: @ritwik-satpati](https://github.com/ritwik-satpati)
- [X (Twitter): @ritwik_satpati](https://twitter.com/ritwik_satpati)