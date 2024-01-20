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
    return positon
  }

  //returns the entire current cache
  get getInternships() {
    return this.internships
  }

  //returns current size of cache
  get getCacheSize() {
    return this.internships.length
  }
}
