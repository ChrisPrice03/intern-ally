//one individual internship
class Internship {
  constructor(company, logo, positon, salary, skills, description, link, degree) {
    this.company = company
    this.logo = logo
    this.position = position
    this.salary = salary
    this.skills = skills
    this.description = description
    this.link = link
    this.degree = degree
  }
}

//a collection of Internships
class InternshipCache {

  //creates an internship cache object
  constructor() {
    this.internships = []
  }

  //creates a new internship and adds it to the cache
  newInternship(company, logo, positon, salary, skills, description, link, degree) {
    let position = new Internship(company, logo, positon, salary, skills, description, link, degree)
    this.internships.push(position)
    return positon
  }

  //returns the entire current cache
  get getInternships() {
    return this.internships
  }

  //returns current size of cache
  get getIntershipsSize() {
    return this.internships.length
  }
}
