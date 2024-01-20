//one individual internship
class Internship {
  constructor(company, logo, position, salary, skills, description, link, degree, locations) {
    this.company = company
    this.logo = logo
    this.position = position
    this.salary = salary
    this.skills = skills
    this.description = description
    this.link = link
    this.degree = degree
    this.locations = locations
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
    //@param needle - the term to look for
    //@param haystack - the term to search from
    search(haystack, needle) {
        if (haystack.indexOf(needle) == -1) {
            return false
        }
        return true
    }
    
    //helper function for searchBar
    //searches one particular internship for 
    //@param internship - an internship object to look in
    //@param query - the term to look for
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
                if (this.search(internship.skills[j], individualWords[i])) {
                    return true
                }
            }
            for (let j = 0; j < internship.locations.length; j++) {
                if (this.search(internship.skills[j], individualWords[i])) {
                    return true
                }
            }
        }
        return false
    }
    
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
}

//main for testing
//let cache = new InternshipCache()
//cache.newInternship("Apple", "logo","software eng", "$2", ["living", "git", "Java"], "desc", "https://intern-ally.co/", ["compsci"], ["USA"])
//cache.newInternship("Apple2", "logo","data scientist", "$4", ["dead"], "test", "https://intern-ally.co/", ["Data Science"], ["USA"])
//internships = cache.getInternships()
//console.log(cache.getCacheSize)
//console.log(cache.internships)
//let ft = new FilterTool()
//searched = ft.searchBar(cache, "dead")
//console.log("After Search")
//console.log(searched)

