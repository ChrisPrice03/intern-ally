//one individual internship
export class Internship {
  constructor(company, logo, position, salary, skills, description, link, degree, locations, schoolYears) {
    this.company = company                  //str - company name
    this.logo = logo                        //file or link - used to display the logo
    this.position = position                //str - the job position available (ie. software engineer)
    this.salary = salary                    //int - the salary available on the posted position
    this.skills = skills                    //str[] - the skills listed for the positon
    this.description = description          //str - the description of the job
    this.link = link                        //str - a link to the job posting
    this.degree = degree                    //str[] - listed or related degrees
    this.locations = locations              //str[] - location(s) this position is available
    this.schoolYears = schoolYears          //str[] - school year(s) required for this position
    
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
export class InternshipCache {

  //creates an internship cache object
  constructor() {
    this.internships = []
  }

  //checks if an internship is already in the cache
  checkIfNewInternship(position) {
    for(let i = 0; i < internships.length; i++) {
      if (internships[i].company == position.company && internships[i].position == position.position && internships[i].description == position.description && internships[i].locations == position.locations) {
        return false
      }
    }
    return true
  }

  //creates a new internship and adds it to the cache
  newInternship(company, logo, positon, salary, skills, description, link, degree, locations, schoolYears) {
    let position = new Internship(company, logo, positon, salary, skills, description, link, degree, locations, schoolYears)
    if (this.checkIfNewInternship()) {
      this.internships.push(position)
    }
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
export class InternshipLoader {
    
    //all of the skills which will be supported by the program
    let skillBank = ["Communication Skills", "Problem Solving", "Teamwork", "Time Management", "Adaptability", "Critical Thinking", "Leadership", "Creativity", "Decision Making", "Collaboration", "Analytical Skills", "Attention to Detail", "Project Management", "Customer Service", "Data Analysis", "Research", "Negotiation", "Emotional Intelligence", "Technical Proficiency", "Coding/Programming", "Digital Marketing", "Content Creation", "Social Media Management", "SEO (Search Engine Optimization)", "UX/UI Design", "Graphic Design", "Data Entry", "Financial Analysis", "Budgeting", "Sales", "Marketing Strategy", "Public Speaking", "Networking", "Decision Analysis", "Risk Management", "Quality Assurance", "Problem Identification", "Business Development", "Market Research", "Conflict Resolution", "Contract Negotiation", "Salesforce", "Cloud Computing", "DevOps", "Artificial Intelligence", "Machine Learning", "Cybersecurity", "IT Management", "Network Security", "Systems Analysis", "Database Management", "Mobile Development", "Web Development", "Software Development", "Agile Methodology", "Scrum", "Product Management", "Change Management", "Coaching", "Employee Training", "Human Resources", "Talent Acquisition", "Employee Relations", "Diversity and Inclusion", "Organizational Development", "Conflict Management", "Employee Engagement", "Compensation and Benefits", "Legal Knowledge", "Contract Law", "Intellectual Property", "Employment Law", "Regulatory Compliance", "Risk Assessment", "Environmental Sustainability", "Project Planning", "Supply Chain Management", "Logistics", "Procurement", "Inventory Management", "Lean Manufacturing", "Six Sigma", "Quality Management", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Structural Engineering", "Aerospace Engineering", "Chemical Engineering", "Biotechnology", "Pharmaceuticals", "Clinical Research", "Healthcare Management", "Nursing", "Medical Coding", "Public Health", "Nutrition", "Physical Therapy", "Occupational Therapy", "Psychology", "Foreign Language Proficiency", "Event Planning", "Market Analysis", "Problem Resolution", "Strategic Planning", "Data Management", "Software Testing", "Business Analysis", "Customer Relationship Management (CRM)", "Social Media Marketing", "User Experience (UX)", "R&D (Research and Development)", "Content Strategy", "Brand Management", "E-commerce", "Financial Planning", "Big Data Analytics", "System Integration", "Database Design", "Mobile App Design", "Search Engine Marketing (SEM)", "Public Relations", "International Business", "Public Policy", "Grant Writing", "Community Outreach", "Dispute Resolution", "Labor Relations", "International Relations", "Political Science", "Teaching", "Instructional Design", "Curriculum Development", "Educational Technology", "Learning Management Systems (LMS)", "Content Management Systems (CMS)", "Presentation Skills", "Executive Assistance", "Administrative Support", "Technical Support", "Customer Support", "Help Desk", "Troubleshooting", "Network Administration", "System Administration", "Hardware Troubleshooting", "Software Troubleshooting", "IT Support", "Desktop Support", "Technical Documentation", "Document Management", "Content Editing", "Copywriting", "Proofreading", "Translation", "Legal Research", "Intellectual Property Law", "Corporate Law", "Criminal Law", "Family Law", "Legal Writing", "Regulatory Affairs", "Privacy Compliance", "Quality Control", "Statistical Analysis", "Regression Analysis", "Predictive Modeling", "Financial Modeling", "Market Segmentation", "Brand Development", "Media Planning", "Video Production", "Audio Production", "Podcasting", "Event Photography", "Portrait Photography", "Photo Editing", "Video Editing", "3D Modeling", "Animation", "Game Design", "Virtual Reality (VR)", "Augmented Reality (AR)", "Quantitative Research", "Qualitative Research", "Survey Design", "Statistical Software", "Database Administration", "Data Warehousing", "Data Mining", "Scripting Languages", "Front-end Development", "Back-end Development", "Full Stack Development", "Web Design", "User Interface (UI) Design", "User Experience (UX) Design", "UI/UX Prototyping", "Wireframing", "Mobile App Development", "Cross-functional Collaboration", "Lean Six Sigma", "Process Improvement", "Continuous Improvement", "Product Design", "Product Lifecycle Management (PLM)", "Supply Chain Optimization", "Distribution Management", "Warehouse Management", "Logistics Management", "Global Sourcing", "Strategic Sourcing", "Supplier Relationship Management (SRM)", "Customer Relationship Management (CRM) Software", "Enterprise Resource Planning (ERP) Software", "Accounting Software", "Financial Management", "Financial Reporting", "Cost Accounting", "Auditing", "Internal Auditing", "External Auditing", "Tax Accounting", "Financial Forecasting", "Financial Planning and Analysis (FP&A)", "Investment Management", "Portfolio Management", "Equity Research", "Risk Analysis", "Credit Analysis", "Derivatives Trading", "Financial Markets", "Financial Compliance", "Financial Modeling", "Revenue Recognition", "Sales Forecasting", "Market Forecasting", "Market Trend Analysis", "Competitor Analysis", "Business Intelligence", "Data Warehousing", "ETL (Extract, Transform, Load)", "Data Visualization", "Dashboard Design", "Business Analytics", "Predictive Analytics", "Prescriptive Analytics", "Descriptive Analytics", "Data Governance", "Data Quality Management", "Data Security", "Business Process Automation", "Robotic Process Automation (RPA)", "Workflow Automation", "Business Rules Management", "Customer Experience (CX)", "Customer Journey Mapping", "Customer Satisfaction", "Customer Retention", "Net Promoter Score (NPS)", "Customer Feedback Analysis", "Brand Loyalty", "Customer Advocacy", "Influencer Marketing", "Brand Ambassadorship", "Corporate Social Responsibility (CSR)", "Ethical Decision Making", "Corporate Governance", "Sustainability", "Social Impact Assessment", "Community Development", "Crisis Management", "Reputation Management", "Stakeholder Engagement", "Corporate Communication", "Internal Communication", "Employee Advocacy", "Innovation Management", "Ideation", "Prototype Development", "Rapid Prototyping", "Product Launch", "New Product Development", "Market Entry Strategy", "Product Differentiation", "Competitive Advantage", "Agile Leadership", "Scrum Master", "Product Owner", "Agile Coach", "Change Leadership", "Change Facilitation", "Change Communication", "Organizational Culture", "Employee Development", "Career Development", "Leadership Development", "Executive Coaching", "Employee Onboarding", "Employee Recognition", "Performance Management", "Succession Planning", "Compensation Planning", "Benefits Administration", "HR Information Systems (HRIS)", "Recruitment Advertising", "Employer Branding", "Candidate Sourcing", "Interviewing", "Selection Criteria", "Job Descriptions", "Interview Coaching", "Workplace Diversity", "Inclusive Leadership", "Cultural Competence", "Unconscious Bias Training", "Workplace Wellness", "Employee Assistance Programs (EAP)", "Occupational Health and Safety (OHS)", "Wellness Programs", "Legal Compliance", "Ethics and Compliance", "Code of Conduct", "Corporate Ethics", "Legal Risk Management", "Contract Management", "Intellectual Property Management", "Trademark Law", "Copyright Law", "Patent Law", "Antitrust Law", "Securities Law", "Data Privacy", "GDPR Compliance", "HIPAA Compliance", "FDA Regulations", "Environmental Compliance", "Occupational Safety and Health Administration (OSHA)", "ISO Standards", "Quality Management Systems (QMS)", "Supply Chain Security", "Fraud Detection", "Fraud Prevention", "Cybersecurity Risk Management", "Incident Response", "Vulnerability Management", "Penetration Testing", "Security Awareness Training", "Security Policy Development", "Security Architecture", "Cloud Security", "Mobile Security", "Identity and Access Management (IAM)", "Security Information and Event Management (SIEM)", "IT Governance", "IT Strategy", "Enterprise Architecture", "IT Service Management (ITSM)", "ITIL Framework", "IT Operations", "Network Architecture", "Cloud Architecture", "Enterprise Systems Integration", "Middleware", "Web Services", "API Development", "Microservices Architecture", "Containerization", "Virtualization", "Blockchain Technology", "Smart Contracts", "Cryptocurrency", "Decentralized Finance (DeFi)", "Quantum Computing", "Edge Computing", "Robotics", "Robotic Process Automation (RPA)", "Drones", "Autonomous Vehicles", "Augmented Reality (AR)", "Virtual Reality (VR)", "Internet of Things (IoT)", "5G Technology", "Biometrics", "Natural Language Processing (NLP)", "Speech Recognition", "Computer Vision", "Chatbots", "Humanoid Robots", "Machine Vision", "Genetic Engineering", "Biomedical Engineering", "Bioinformatics", "CRISPR Technology", "Pharmacology", "Clinical Trials", "Medical Imaging", "Health Information Management", "Health Informatics", "Electronic Health Records (EHR)", "Telemedicine", "Telehealth", "Healthcare Analytics", "Healthcare Administration", "Healthcare Policy", "Healthcare Compliance", "Nursing Informatics", "Health Education", "Health Psychology", "Public Health Research", "Epidemiology", "Health Promotion", "Health Behavior Change", "Dietetics", "Sports Nutrition", "Exercise Physiology", "Physical Rehabilitation", "Rehabilitation Counseling", "Occupational Health", "Gerontology", "Social Work", "Counseling Psychology", "Clinical Psychology", "Industrial-Organizational Psychology", "Forensic Psychology", "Neuropsychology", "Psychometric Testing", "Artificial Intelligence in Education", "Gamification in Education", "Learning Analytics", "Instructional Technology", "Flipped Classroom", "Blended Learning", "Mobile Learning", "Virtual Classroom", "Online Education Platforms", "Course Design", "Educational Assessment", "Educational Leadership", "Educational Policy", "Education Technology Integration", "Educational Research", "STEM Education", "Early Childhood Education", "Elementary Education", "Secondary Education", "Higher Education Administration", "Student Affairs", "International Student Services", "College Admissions", "Academic Advising", "Alumni Relations", "Career Counseling", "Study Abroad Programs", "Special Education", "Speech-Language Pathology", "Occupational Therapy", "Physical Therapy", "Rehabilitation Engineering", "Behavioral Therapy", "Audiology", "Marriage and Family Therapy", "Clinical Social Work", "Crisis Intervention", "Substance Abuse Counseling", "Applied Behavior Analysis (ABA)", "Geriatric Counseling", "Play Therapy", "Art Therapy", "Music Therapy", "Dance/Movement Therapy", "Drama Therapy", "Animal-Assisted Therapy", "Reiki", "Massage Therapy", "Yoga Instruction", "Personal Training", "Fitness Instruction", "Group Fitness", "Nutrition Coaching", "Health Coaching", "Wellness Coaching", "Mindfulness", "Meditation", "Holistic Health", "Alternative Medicine", "Acupuncture", "Chiropractic Care", "Herbal Medicine", "Aromatherapy", "Homeopathy", "Ayurveda", "Traditional Chinese Medicine (TCM)", "Naturopathy", "Environmental Science", "Environmental Policy", "Environmental Law", "Sustainable Development", "Climate Change Adaptation", "Renewable Energy", "Energy Efficiency", "Water Resource Management", "Waste Management", "Conservation Biology", "Ecology", "Biodiversity Conservation", "Wildlife Biology", "Natural Resource Management", "Geographic Information Systems (GIS)", "Remote Sensing", "Urban Planning", "Transportation Planning", "Land Use Planning", "Architectural Design", "Landscape Architecture", "Interior Design", "Historic Preservation", "Construction Management", "Building Information Modeling (BIM)", "Facilities Management", "Real Estate Development", "Real Estate Investment", "Property Management", "Commercial Real Estate", "Residential Real Estate", "Real Estate Finance", "Real Estate Law", "Urban Design", "Public Space Planning", "Retail Design", "Industrial Design", "Product Prototyping", "User-Centered Design", "Human-Centered Design", "Design Thinking", "Inclusive Design", "Service Design", "Innovation Design", "Strategic Design", "Experience Design", "Design Research", "Design Strategy", "Design Management", "Corporate Design", "Brand Design", "Package Design", "Typography", "Print Design", "Digital Design", "Motion Graphics", "3D Animation", "Visual Effects", "Video Game Design", "User Research", "Usability Testing", "Accessibility Testing", "Information Architecture", "Content Strategy", "Interaction Design", "Human-Computer Interaction (HCI)", "User Interface (UI) Design", "User Experience (UX) Design", "Wireframing", "Prototyping", "Front-end Development", "Back-end Development", "Full Stack Development", "Web Development", "Mobile App Development", "Software Development", "Agile Methodology", "Scrum", "Kanban", "Lean Software Development", "DevOps", "Continuous Integration", "Continuous Delivery", "Continuous Deployment", "Automated Testing", "Test-Driven Development (TDD)", "Behavior-Driven Development (BDD)", "Code Review", "Pair Programming", "Version Control", "Git", "GitHub", "Bitbucket", "JIRA", "Confluence", "Code Collaboration", "Code Refactoring", "Code Optimization", "Code Documentation", "Code Quality Assurance", "API Development", "RESTful API", "GraphQL", "Microservices Architecture", "Serverless Architecture", "Cloud Computing", "AWS (Amazon Web Services)", "Microsoft Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Infrastructure as Code (IaC)", "Server Administration", "Linux Administration", "Windows Administration", "Network Administration", "Database Administration", "IT Support", "Help Desk Support", "Technical Troubleshooting", "Customer Support", "Desktop Support", "End-User Training", "Technical Documentation", "Knowledge Base Management", "Content Management Systems (CMS)", "Web Content Management", "Document Management", "Data Management", "Data Warehousing", "Data Modeling", "Data Governance", "Master Data Management (MDM)", "Data Integration", "Business Intelligence", "Data Analytics", "Data Visualization", "Dashboard Design", "Business Analytics", "Predictive Analytics"]
    
    getskillBank() {
        return this.skillBank
    }
    
    //all of the degrees which will be supported by the program
    let degreeBank = ["Accounting", "Aerospace Engineering", "African Studies", "Agricultural Economics", "Agricultural Education", "Agricultural Engineering", "Agricultural Science", "Agriculture", "American Studies", "Anatomy", "Animal Science", "Anthropology", "Applied Mathematics", "Aquatic Biology", "Arabic", "Archaeology", "Architectural Engineering", "Architecture", "Art", "Art History", "Asian Studies", "Astronomy", "Astrophysics", "Athletic Training", "Biochemistry", "Biology", "Biomedical Engineering", "Biomedical Science", "Biopsychology", "Botany", "Broadcast Journalism", "Business Administration", "Business Analytics", "Chemical Engineering", "Chemistry", "Child Development", "Chinese", "Civil Engineering", "Classical Studies", "Climatology", "Clinical Psychology", "Communication Studies", "Comparative Literature", "Computer Engineering", "Computer Information Systems", "Computer Science", "Criminal Justice", "Criminology", "Culinary Arts", "Dance", "Data Science", "Dental Hygiene", "Dentistry", "Diagnostic Medical Sonography", "Dietetics", "Digital Media", "Early Childhood Education", "Earth Science", "Ecology", "Economics", "Education", "Electrical Engineering", "Elementary Education", "Engineering Physics", "English", "Environmental Engineering", "Environmental Science", "Ethnic Studies", "Exercise Science", "Fashion Design", "Film Studies", "Finance", "Fine Arts", "Food Science", "Forensic Science", "French", "Genetics", "Geography", "Geology", "German", "Graphic Design", "Health Administration", "Health Education", "Health Science", "History", "Horticulture", "Hospitality Management", "Human Resources", "Human Services", "Illustration", "Industrial Engineering", "Information Systems", "Information Technology", "Interior Design", "International Business", "International Relations", "Italian", "Japanese", "Journalism", "Kinesiology", "Landscape Architecture", "Latin American Studies", "Law", "Linguistics", "Management", "Marketing", "Mass Communication", "Mathematics", "Mechanical Engineering", "Medical Laboratory Science", "Medicine", "Meteorology", "Microbiology", "Middle Eastern Studies", "Modern Languages", "Music", "Music Education", "Music Therapy", "Nursing", "Nutrition", "Occupational Therapy", "Oceanography", "Operations Management", "Optometry", "Organizational Psychology", "Painting", "Pharmacy", "Philosophy", "Photography", "Physical Education", "Physical Therapy", "Physics", "Physiology", "Political Science", "Pre-Law", "Pre-Medical", "Psychology", "Public Administration", "Public Health", "Public Relations", "Radiologic Technology", "Recreation Management", "Religious Studies", "Respiratory Therapy", "Russian", "Social Work", "Sociology", "Spanish", "Speech Pathology", "Sports Management", "Statistics", "Teaching English as a Second Language (TESL)", "Theatre", "Theology", "Tourism Management", "Urban Planning", "Veterinary Medicine", "Video Game Design", "Web Development", "Wildlife Biology", "Women's Studies", "Zoology"]
    
    getdegreeBank() {
        return this.degreeBank
    }
    
    //all of the locations which will be supported by the program
    let locationBank = [" AL ", " AK ", " AZ ", " AR ", " CA ", " CO ", " CT ", " DE ", " FL ", " GA ", " HI ", " ID ", " IL ", " IN ", " IA ", " KS ", " KY ", " LA ", " ME ", " MD ", " MA ", " MI ", " MN ", " MS ", " MO ", " MT" , " NE ", " NV ", " NH ", " NJ ", " NM ", " NY ", " NC ", " ND ", " OH ", " OK ", " OR ", " PA ", " RI ", " SC ", " SD ", " TN ", " TX ", " UT ", " VT ", " VA ", " WA ", " WV ", " WI ", " WY ", "New York City", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington, DC", "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta", "Kansas City", "Colorado Springs", "Omaha", "Raleigh", "Miami", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "Tampa", "New Orleans", "Wichita", "Bakersfield", "Cleveland", "Tampa", "Aurora", "Anaheim", "Honolulu", "Santa Ana", "Riverside", "Corpus Christi", "Lexington", "Stockton", "St. Louis", "St. Paul", "Henderson", "Pittsburgh", "Cincinnati", "Anchorage", "Greensboro", "Plano", "Newark", "Lincoln", "Toledo", "Orlando", "Chula Vista", "Irvine", "Fort Wayne", "Jersey City", "Durham", "St. Petersburg", "Laredo", "Buffalo", "Madison", "Lubbock", "Chandler", "Scottsdale", "Reno", "Glendale", "Norfolk", "Winston-Salem", "North Las Vegas", "Gilbert", "Chesapeake", "Irving", "Hialeah", "Garland", "Fremont", "Richmond", "Boise City", "Baton Rouge", "Des Moines", "Spokane", "San Bernardino", "Modesto", "Tacoma", "Fontana", "Santa Clarita", "Birmingham", "Oxnard", "Fayetteville", "Moreno Valley", "Rochester", "Glendale", "Hollywood", "Kansas City", "Escondido", "Clarksville", "Sunnyvale", "Macon", "Pembroke Pines", "Paterson", "Torrance", "Bridgeport", "Savannah", "Mesquite", "Syracuse", "Orange", "Pasadena", "Fullerton", "Killeen", "Dayton", "McAllen", "Bellevue", "Miramar", "Hampton", "West Valley City", "Warren", "Olathe", "Columbia", "Thornton", "New Haven", "Waco", "Charleston", "Thousand Oaks", "Visalia", "Cedar Rapids", "Elizabeth", "Roseville", "Gainesville", "Carrollton", "Stamford", "Denton", "Midland", "Coral Springs", "Concord", "Topeka", "Simi Valley", "Surprise", "Lafayette", "Kent", "Hartford", "Santa Clara", "Victorville", "Abilene", "Murfreesboro", "Evansville", "Vallejo", "Athens", "Allentown", "Berkeley", "Norman", "Ann Arbor", "Beaumont", "Independence", "El Monte", "Springfield", "Fargo", "Wilmington", "Arvada", "South Bend", "Peoria", "Lansing", "Odessa", "Richardson", "Fairfield", "Elgin", "Round Rock", "Clearwater", "Carlsbad", "Springfield", "West Jordan", "Costa Mesa", "Wichita Falls", "Miramar", "Charleston", "Syracuse", "Metairie", "Hialeah"]

    getlocationBank() {
        return this.locationBank
    }

    //all of the schoolYears which will be supported by the program
    let schoolYearBank = ["Freshman", "Sophmore", "Junior", "Senior", "Undergraduate", "Graduate", "PhD"]
    getschoolYearBank() {
        return this.schoolYearBank
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

    //this function will look for school years in the given schoolYearInfo
    // it uses the schoolYearBank array as the supported school years
    //
    //@param schoolYearInfo - the info to look for the school year in
    //
    //@return an array of school years which were found in the description of ["null"] if no school years were found
    locateSchoolYears(schoolYearInfo) {
        schoolYearInfo = description.schoolYearInfo()
        let schoolYearInfo = []
        schoolYears [0] = "null"
        let foundSchoolYears = 0
        for (let i = 0; i < schoolYearBank.length; i++) {
            if (schoolYear.indexOf(schoolYearBank[i].toLowerCase()) != -1) {
                schoolYears[foundSchoolYears++] = schoolYearBank[i]
            }
        }
        return schoolYears
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

            let schoolYears = ["null"]
            if (segments[4] != "aekjfo;i") {
                schoolYears = this.locateSchoolYears(segments[4])
            }

            cache.newInternship(company, logo, positon, salary, skills, description, link, degree, locations, schoolYears)
      }
      file.close()
     
      return cache
  }
  
    //this function will update the given cache with new information
    //it will read in data from the given file path
    //
    //@param filePath - the location of the file generated from webscraping
    //                  the file is in the following format:
    //                  company||logo||position||salary||description||link||location
    //@param internshipCache - the cache all of the new info will be added to
    //
    //@return an InternshipCache object containing all of the objects updated from the file
  
    updateCache(filePath, cache) {
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

            let schoolYears = ["null"]
            if (segments[4] != "aekjfo;i") {
                schoolYears = this.locateSchoolYears(segments[4])
            }

            cache.newInternship(company, logo, positon, salary, skills, description, link, degree, locations, schoolYears)
      }
      file.close()
     
      return cache
  }
}


//class containing filter funtions
export class FilterTool {
    
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
            for (let j = 0; j < internship.schoolYears.length; j++) {
                if (this.search(internship.schoolYears[j], individualWords[i])) {
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
    //@param timePeriod - an int representing either hourly (0) or salary (1)
    //
    //@return true or false depending if conditions are met
    
    searchInternshipForSalary(internship, minSalary, timePeriod) {
        maxSalary = MAX_VALUE
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
                                                internshipCache.internships[i].locations,
                                                internshipCache.internships[i].schoolYears
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
                                                internshipCache.internships[i].locations,
                                                internshipCache.internships[i].schoolYears
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
                                                internshipCache.internships[i].locations,
                                                internshipCache.internships[i].schoolYears
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
                                                internshipCache.internships[i].locations,
                                                internshipCache.internships[i].schoolYears
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
                                                internshipCache.internships[i].locations,
                                                internshipCache.internships[i].schoolYears
                )
            }
        }
        return sortedInternships
    }
}

//main for testing
// let cache = new InternshipCache()
// cache.newInternship("Apple", "logo","software eng", 2, ["living", "git", "Java"], "desc", "https://intern-ally.co/", ["compsci"], ["USA"])
// cache.newInternship("Apple2", "logo","data scientist", 10000, ["dead"], "test", "https://intern-ally.co/", ["Data Science"], ["USA"])
// internships = cache.getInternships()
// console.log(cache.getCacheSize)
// console.log(cache.internships)
// let ft = new FilterTool()
// searched = ft.searchBar(cache, "dead")
// searched = ft.inSalaryRange(searched, 3, 5, 0)
// searched = ft.citySearch(searched, ["usa"])
// searched = ft.majorSearch(searched, ["Data Science"])
// searched = ft.skillSearch(searched, ["dead"])
console.log("After Search")
console.log(searched)

