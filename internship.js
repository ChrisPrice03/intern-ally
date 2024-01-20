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
  }
  
  get companyName() {
      return this.company
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
    //
    //@return true or false depending if conditions are met
    
    searchInternshipForSalary(internship, minSalary, maxSalary) {
        if (internship.salary >= minSalary && internship.salary <= maxSalary) {
            return true
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
    //
    //@return An InternshipCache object of the sorted internships
    
    inSalaryRange(internshipCache, minSalary, maxSalary) {
        let sortedInternships = new InternshipCache()
        for (let i = 0; i < internshipCache.getCacheSize; i++) {
            if (this.searchInternshipForSalary(internshipCache.internships[i], minSalary, maxSalary)) {
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
}

//main for testing
// let cache = new InternshipCache()
// cache.newInternship("Apple", "logo","software eng", 2, ["living", "git", "Java"], "desc", "https://intern-ally.co/", ["compsci"], ["USA"])
// cache.newInternship("Apple2", "logo","data scientist", 4, ["dead"], "test", "https://intern-ally.co/", ["Data Science"], ["USA"])
// internships = cache.getInternships()
// console.log(cache.getCacheSize)
// console.log(cache.internships)
// let ft = new FilterTool()
// searched = ft.searchBar(cache, "dead")
// searched = ft.inSalaryRange(searched, 3, 5)
// searched = ft.citySearch(searched, ["usa"])
// console.log("After Search")
// console.log(searched)

