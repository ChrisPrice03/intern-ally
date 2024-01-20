//one individual internship
class Internship {
  constructor(company, logo, position, salary, skills, description, link, degree, locations) {
    this.company = company                  //str - company name
    this.logo = logo                        //file or link - used to display the logo
    this.position = position                //str - the job position available (ie. software engineer)
    this.salary = salary                    //int - the salary available on the posted position
    this.skills = skills                    //str[] - the skills listed for the positon
    this.description = description          //str - the description of the job
    this.link = link                        //str - a link to the job posting
    this.degree = degree                    //str[] - listed or related degrees
    this.locations = locations              //str[] - location(s) this position is available
    
    this.hourly = this.salaryToHourly(salary)    //int - the hourly wage of the posted position
  }
  
  get companyName() {
      return this.company
  }
  
  salaryToHourly(salary) {
      return salary/50/40
  }
}

//a collection of Internships
class InternshipCache {

  //creates an internship cache object
  constructor() {
    this.internships = []
  }

  //creates a new internship and adds it to the cache
  newInternship(company, logo, positon, salary, skills, description, link, degree, locations) {
    let position = new Internship(company, logo, positon, salary, skills, description, link, degree, locations)
    this.internships.push(position)
  }

  //returns the entire current cache
  getInternships() {
    return this.internships
  }

  //returns current size of cache
  get getCacheSize() {
    return this.internships.length
  }
}

//class containing internship cache loaders and creaters
class InternshipLoader {
    
    //all of the skills which will be supported by the program
    let skillBank = []
    
    get skilBank() {
        return this.skillBank
    }
    
    //all of the degrees which will be supported by the program
    let degreeBank = []
    
    get degreeBank() {
        return this.degreeBank
    }
    
    //all of the locations which will be supported by the program
    let locationBank = []
    
    get locationBank() {
        return this.locationBank
    }
    
    //this function will look for skills in the given decriptions
    //it uses the skillBank array as the supported skills
    //
    //@param description - the descriptions to look for the skills in
    //
    //@return an array of skills which were found in the description or ["null"] if no skills were found
    
    locateSkills(description) {
        description = description.toLowerCase()
        let skills = []
        skills [0] = "null"
        let foundSkills = 0
        for (let i = 0; i < skillBank.length; i++) {
            if (description.indexOf(skillBank[i].toLowerCase()) != -1) {
                skills[foundSkills++] = skillBank[i]
            }
        }
        return skills
    }
    
    //this function will look for degrees in the given decriptions
    //it uses the degreeBank array as the supported degrees
    //
    //@param description - the descriptions to look for the degrees in
    //
    //@return an array of degrees which were found in the description or ["null"] if no skills were found
    
    locateDegrees(description) {
        description = description.toLowerCase()
        let degrees = []
        degrees [0] = "null"
        let foundDegrees = 0
        for (let i = 0; i < degreesBank.length; i++) {
            if (description.indexOf(degreesBank[i].toLowerCase()) != -1) {
                degrees[foundDegrees++] = degreesBank[i]
            }
        }
        return degrees
    }
    
    //this function will look for locations in the given locationInfo
    //it uses the locationBank array as the supported locations
    //
    //@param locationInfo - the info to look for the locations in
    //
    //@return an array of locations which were found in the description or ["null"] if no locations were found
    
    locateLocations(locationInfo) {
        locationInfo = description.locationInfo()
        let locations = []
        locations [0] = "null"
        let foundLocations = 0
        for (let i = 0; i < locationBank.length; i++) {
            if (location.indexOf(locationBank[i].toLowerCase()) != -1) {
                locations[foundLocations++] = locationBank[i]
            }
        }
        return locations
    }
    
    //this function will load in the intitial cache at the start of the program
    //it will read in data from the given file path and create an Internship Cache object
    //
    //@param filePath - the location of the file generated from webscraping
    //                  the file is in the following format:
    //                  company||logo||position||salary||description||link||location
    //
    //@return an InternshipCache object containing all of the objects from the file
  
    loadCache(filePath) {
        let cache = new InternshipCache()

        var file = new File(filePath)
        var str = "";
      
        //reading
        file.open("r")
        while (!file.eof) {
            str = file.readln()
            
            let segments = str.split("||")
            
            let company = "null"
            if (segments[0] != "aekjfo;i") {
                company = segments[0]
            }
            
            let logo = "null"
            if (segments[1] != "aekjfo;i") {
                logo = segments[1]
            }
            
            let position = "null"
            if (segments[2] != "aekjfo;i") {
                position = segments[2]
            }
            
            let salary = -1
            if (segments[3] != "aekjfo;i") {
                salary = segments[3]
            }
            
            let skills ["null"]
            if (segments[4] != "aekjfo;i") {
                skills = this.locateSkills(segments[4])
            }
            
            let description = "null"
            if (segments[4] != "aekjfo;i") {
                description = segments[4]
            }
            
            let link = "null"
            if (segments[5] != "aekjfo;i") {
                link = segments[5]
            }
            
            let degree = ["null"]
            if (segments[4] != "aekjfo;i") {
                degree = this.locateDegrees(segments[4])
            }

            let locations = ["null"]
            if (segments[6] != "aekjfo;i") {
                locations = this.locateLocations(segments[6])
            }

            cache.newInternship(company, logo, positon, salary, skills, description, link, degree, locations)
      }
      file.close()
     
      return cache
  }
}


//class containing filter funtions
class FilterTool {
    
    //helper function for searchInternshipForQuery
    //searches for the needle in the haystack (similar to strstr)
    //
    //@param needle - the term to look for
    //@param haystack - the term to search from
    //
    //@return true or false depending if conditions are met
    
    search(haystack, needle) {
        haystack = haystack.toLowerCase()
        needle = needle.toLowerCase()
        if (haystack.indexOf(needle) == -1) {
            return false
        }
        return true
    }
    
    //helper function for searchBar
    //searches one particular internship for a query
    //
    //@param internship - an internship object to look in
    //@param query - the term to look for
    //
    //@return true or false depending if conditions are met
    
    searchInternshipForQuery(internship, query) {
        let individualWords = query.split(' ')
        for(let i = 0; i < individualWords.length; i++) {
            if (this.search(internship.companyName, individualWords[i])) {
                return true
            }
            if (this.search(internship.position, individualWords[i])) {
                return true
            }
            for (let j = 0; j < internship.skills.length; j++) {
                if (this.search(internship.skills[j], individualWords[i])) {
                    return true
                }
            }
            if (this.search(internship.description, individualWords[i])) {
                return true
            }
            for (let j = 0; j < internship.degree.length; j++) {
                if (this.search(internship.degree[j], individualWords[i])) {
                    return true
                }
            }
            for (let j = 0; j < internship.locations.length; j++) {
                if (this.search(internship.locations[j], individualWords[i])) {
                    return true
                }
            }
        }
        return false
    }
    
    //helper function for inSalaryRange
    //searches one particular internship for a salary range
    //
    //@param internship - an internship object to look in
    //@param minSalary - the min salary to look for
    //@param maxSalary - the max salary to look for
    //@param timePeriod - an int representing either hourly (0) or salary (1)
    //
    //@return true or false depending if conditions are met
    
    searchInternshipForSalary(internship, minSalary, maxSalary, timePeriod) {
        if (timePeriod == 1) {
            if (internship.salary >= minSalary && internship.salary <= maxSalary) {
                return true
            }
        }
        else {
            if (internship.hourly >= minSalary && internship.hourly <= maxSalary) {
                return true
            }
        }
        return false
    }
    
    //helper function for citySearch
    //searches one particular internship for city(s)
    //
    //@param internship - an internship object to look in
    //@param cities - an array of cities to look in
    //
    //@return true or false depending if conditions are met
    
    searchInternshipForCity(internship, cities) {
        for (let i = 0; i < cities.length; i++) {
            for (let j = 0; j < internship.locations.length; j++) {
                if (this.search(internship.locations[j], cities[i])) {
                    return true
                }
            }
        }
        return false
    }
    
    //helper function for majorSearch
    //searches one particular internship for major(s)
    //
    //@param internship - an internship object to look in
    //@param majors - an array of majors to look for
    //
    //@return true or false depending if conditions are met
    
    searchInternshipForMajor(internship, majors) {
        for (let i = 0; i < majors.length; i++) {
            for (let j = 0; j < internship.degree.length; j++) {
                if (this.search(internship.degree[j], majors[i])) {
                    return true
                }
            }
        }
        return false
    }
    
    //helper function for skillSearch
    //searches one particular internship for skill(s)
    //
    //@param internship - an internship object to look in
    //@param skills - an array of skills to look for
    //
    //@return true or false depending if conditions are met
    
    searchInternshipForSkills(internship, skills) {
        for (let i = 0; i < skills.length; i++) {
            for (let j = 0; j < internship.skills.length; j++) {
                if (this.search(internship.skills[j], skills[i])) {
                    return true
                }
            }
        }
        return false
    }
    
    /////////////////////////////////////////////////////
    //BELOW THIS LINE ARE USABLE FUNCTIONS FOR THE SITE//
    /////////////////////////////////////////////////////
    
    //This is the function to be used when a user types a request into the search bar
    //it searches through each internship in the cache for the keyword from the user and
    //returns a new internship cache with only the matching results
    //
    //@param internshipCache - the InternshipCache object to search from
    //@param query - the Str typed from the user
    //
    //@return An InternshipCache object of sorted internships
    
    searchBar(internshipCache, query) {
        let sortedInternships = new InternshipCache()
        for (let i = 0; i < internshipCache.getCacheSize; i++) {
            if (this.searchInternshipForQuery(internshipCache.internships[i], query)) {
                sortedInternships.newInternship(internshipCache.internships[i].company,
                                                internshipCache.internships[i].logo,
                                                internshipCache.internships[i].position,
                                                internshipCache.internships[i].salary,
                                                internshipCache.internships[i].skills,
                                                internshipCache.internships[i].description,
                                                internshipCache.internships[i].link,
                                                internshipCache.internships[i].degree,
                                                internshipCache.internships[i].locations
                )
            }
        }
        return sortedInternships
    }
    
    //This function is used to filter an internship cache based on salary
    //
    //@param internshipCache - the InternshipCache object to search from
    //@param minSalary - the minimum salary required to be considered (int)
    //@param maxSalary - the maximum salary allowed to be considered (int)
    //@param timePeriod - an int representing either hourly (0) or salary (1) 
    //
    //@return An InternshipCache object of the sorted internships
    
    inSalaryRange(internshipCache, minSalary, maxSalary, timePeriod) {
        let sortedInternships = new InternshipCache()
        for (let i = 0; i < internshipCache.getCacheSize; i++) {
            if (this.searchInternshipForSalary(internshipCache.internships[i], minSalary, maxSalary, timePeriod)) {
                sortedInternships.newInternship(internshipCache.internships[i].company,
                                                internshipCache.internships[i].logo,
                                                internshipCache.internships[i].position,
                                                internshipCache.internships[i].salary,
                                                internshipCache.internships[i].skills,
                                                internshipCache.internships[i].description,
                                                internshipCache.internships[i].link,
                                                internshipCache.internships[i].degree,
                                                internshipCache.internships[i].locations
                )
            }
        }
        return sortedInternships
    }
    
    //This function is used to filter an internship cache based on city(s)
    //
    //@param internshipCache - the InternshipCache object to search from
    //@param cities - an array of cities which are considered for internships
    //
    //@return An InternshipCache object of the sorted internships
    
    citySearch(internshipCache, cities) {
        let sortedInternships = new InternshipCache()
        for (let i = 0; i < internshipCache.getCacheSize; i++) {
            if (this.searchInternshipForCity(internshipCache.internships[i], cities)) {
                sortedInternships.newInternship(internshipCache.internships[i].company,
                                                internshipCache.internships[i].logo,
                                                internshipCache.internships[i].position,
                                                internshipCache.internships[i].salary,
                                                internshipCache.internships[i].skills,
                                                internshipCache.internships[i].description,
                                                internshipCache.internships[i].link,
                                                internshipCache.internships[i].degree,
                                                internshipCache.internships[i].locations
                )
            }
        }
        return sortedInternships
    }
    
    //This function is used to filter an internship cache based on major(s)
    //
    //@param internshipCache - the InternshipCache object to search from
    //@param majors - an array of majors which are considered for internships
    //
    //@return An InternshipCache object of the sorted internships
    
    majorSearch(internshipCache, majors) {
        let sortedInternships = new InternshipCache()
        for (let i = 0; i < internshipCache.getCacheSize; i++) {
            if (this.searchInternshipForMajor(internshipCache.internships[i], majors)) {
                sortedInternships.newInternship(internshipCache.internships[i].company,
                                                internshipCache.internships[i].logo,
                                                internshipCache.internships[i].position,
                                                internshipCache.internships[i].salary,
                                                internshipCache.internships[i].skills,
                                                internshipCache.internships[i].description,
                                                internshipCache.internships[i].link,
                                                internshipCache.internships[i].degree,
                                                internshipCache.internships[i].locations
                )
            }
        }
        return sortedInternships
    }
    
    //This function is used to filter an internship cache based on skill(s)
    //
    //@param internshipCache - the InternshipCache object to search from
    //@param skills - an array of skills which are considered for internships
    //
    //@return An InternshipCache object of the sorted internships
    
    skillSearch(internshipCache, skills) {
        let sortedInternships = new InternshipCache()
        for (let i = 0; i < internshipCache.getCacheSize; i++) {
            if (this.searchInternshipForSkills(internshipCache.internships[i], skills)) {
                sortedInternships.newInternship(internshipCache.internships[i].company,
                                                internshipCache.internships[i].logo,
                                                internshipCache.internships[i].position,
                                                internshipCache.internships[i].salary,
                                                internshipCache.internships[i].skills,
                                                internshipCache.internships[i].description,
                                                internshipCache.internships[i].link,
                                                internshipCache.internships[i].degree,
                                                internshipCache.internships[i].locations
                )
            }
        }
        return sortedInternships
    }
}

//main for testing
let cache = new InternshipCache()
cache.newInternship("Apple", "logo","software eng", 2, ["living", "git", "Java"], "desc", "https://intern-ally.co/", ["compsci"], ["USA"])
cache.newInternship("Apple2", "logo","data scientist", 10000, ["dead"], "test", "https://intern-ally.co/", ["Data Science"], ["USA"])
internships = cache.getInternships()
console.log(cache.getCacheSize)
console.log(cache.internships)
let ft = new FilterTool()
searched = ft.searchBar(cache, "dead")
searched = ft.inSalaryRange(searched, 3, 5, 0)
searched = ft.citySearch(searched, ["usa"])
searched = ft.majorSearch(searched, ["Data Science"])
searched = ft.skillSearch(searched, ["dead"])
console.log("After Search")
console.log(searched)

